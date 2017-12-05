import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView, Text, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';

import { saveDeckTitle } from '../utils/api';
import { addNewDeck } from '../actions/decks';
import styles from '../utils/stylesheet';

class AddNewDeck extends React.Component {
  state = {
    title: '',
  }

  toDeckListItem = (title) => {
    const { navigation } = this.props;
    navigation.navigate('DeckListItem', {
      title,
    });
  }

  handleTitleChange = (title) => {
    this.setState({
      title,
    });
  }

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { title } = this.state;

    saveDeckTitle(title)
      .then(dispatch(addNewDeck(title)))
      .then(this.toDeckListItem(title))
      .then(() => this.setState(() => ({ title: '' })));
  }

  render() {
    const { title } = this.state;
    return (
      <KeyboardAvoidingView
        style={[styles.center, styles.container]}
        behavior="padding"
      >
        <Text style={styles.label}>Enter a name for your new deck</Text>
        <TextInput
          value={title}
          style={styles.input}
          placeholder="Deck Title"
          onChangeText={this.handleTitleChange}
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity style={styles.buttonSubmit} onPress={this.handleSubmit}>
          <Text style={styles.buttonTextSubmit}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
