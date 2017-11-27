import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { addNewDeckToAsyncStorage } from '../utils/api';
import { white, purple } from '../utils/colors';
import { addNewDeck } from '../actions/decks';

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 40,
    backgroundColor: white,
  },
  label: {
    fontSize: 28,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    height: 44,
    marginTop: 10,
    padding: 8,
    width: '100%',
  },
  buttonSubmit: {
    alignItems: 'center',
    backgroundColor: purple,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
  },
  buttonTextSubmit: {
    fontSize: 20,
    color: white,
  },
});

class AddNewDeck extends React.Component {
  state = {
    title: '',
  }

  toHome = () => {
    const { navigation } = this.props;
    navigation.dispatch(NavigationActions.back({ key: 'AddNewDeck' }));
  }

  handleTitleChange = (title) => {
    this.setState({
      title,
    });
  }

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { title } = this.state;

    addNewDeckToAsyncStorage(title)
      .then(dispatch(addNewDeck(title)))
      .then(this.toHome())
      .then(() => this.setState(() => ({ title: '' })));
  }

  render() {
    const { title } = this.state;
    return (
      <View style={[styles.center, styles.container]}>
        <Text style={styles.label}>Enter a name for your new deck</Text>
        <TextInput
          value={title}
          style={styles.input}
          placeholder="Deck Title"
          onChangeText={this.handleTitleChange}
        />
        <TouchableOpacity style={styles.buttonSubmit} onPress={this.handleSubmit}>
          <Text style={styles.buttonTextSubmit}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

AddNewDeck.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    state: PropTypes.object,
  }).isRequired,
};

export default connect()(AddNewDeck);
