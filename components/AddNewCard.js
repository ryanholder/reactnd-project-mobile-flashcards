import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { addNewCardToAsyncStorage } from '../utils/api';
import { white, purple } from '../utils/colors';
import { addNewCard } from '../actions/decks';

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

class AddNewCard extends React.Component {
  state = {
    question: '',
    answer: '',
  }

  toDeckListItem = () => {
    const { navigation } = this.props;
    navigation.dispatch(NavigationActions.back({ key: 'AddNewCard' }));
  }

  handleQuestionChange = (question) => {
    this.setState({
      question,
    });
  }

  handleAnswerChange = (answer) => {
    this.setState({
      answer,
    });
  }

  handleSubmit = () => {
    const { dispatch, title } = this.props;
    const { question, answer } = this.state;

    addNewCardToAsyncStorage(title, question, answer)
      .then(dispatch(addNewCard(title, question, answer)))
      .then(this.toDeckListItem())
      .then(() => this.setState(() => ({
        question: '',
        answer: '',
      })));
  }

  render() {
    const { question, answer } = this.state;
    return (
      <View style={[styles.center, styles.container]}>
        <Text style={styles.label}>Question</Text>
        <TextInput
          value={question}
          style={styles.input}
          placeholder="Question"
          onChangeText={this.handleQuestionChange}
        />
        <Text style={styles.label}>Answer</Text>
        <TextInput
          value={answer}
          style={styles.input}
          placeholder="Answer"
          onChangeText={this.handleAnswerChange}
        />
        <TouchableOpacity style={styles.buttonSubmit} onPress={this.handleSubmit}>
          <Text style={styles.buttonTextSubmit}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

AddNewCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    state: PropTypes.object,
  }).isRequired,
  title: PropTypes.string.isRequired,
};

const mapStateToProps = (state, { navigation }) => {
  const { decks } = state;
  return {
    decks,
    title: navigation.state.params.title,
  };
};

export default connect(mapStateToProps)(AddNewCard);