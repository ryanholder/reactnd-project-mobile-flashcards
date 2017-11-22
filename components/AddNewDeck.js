import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';

import * as API from '../utils/api';
import { white, gray, black, purple } from '../utils/colors';
// import { saveDeckTitle } from '../actions';

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

  handleTitleChange = (title) => {
    this.setState({
      title,
    });
  }

  handleSubmit = () => {
    const { saveDeckTitle, navigation } = this.props
    const { title } = this.state

    // API.saveDeckTitle({title})
    //   .then(() => {
    //     saveDeckTitle({title})

    //     navigation.navigate(
    //       'DeckDetail',
    //       {
    //         title
    //       }
    //     )

    //     this.setState({
    //       title: ''
    //     })
    //   })
  }

  render() {
    const { title } = this.state;
    return (
      <View style={[styles.center, styles.container]}>
        <Text style={styles.label}>Enter a name for your new deck.</Text>
        <TextInput
          value={title}
          style={styles.input}
          placeholder="Deck Title"
          onChangeText={this.handleTitleChange}
        />
        <TouchableOpacity style={styles.buttonSubmit}>
          <Text style={styles.buttonTextSubmit}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// <TouchableOpacity style={styles.buttonSubmit} onPress={this.handleSubmit}>
// <Text style={styles.buttonTextSubmit}>Submit</Text>
// </TouchableOpacity>


// function mapStateToProps (state, { navigation }) {
//   return {}
// }

// function mapDispatchToProps (dispatch, { navigation }) {
//   return {
//     saveDeckTitle: (data) => dispatch(saveDeckTitle(data))
//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(AddNewDeck)

export default AddNewDeck;
