import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView, Text, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';

import { addCardToDeck } from '../utils/api';
import { addNewCard } from '../actions/decks';
import styles from '../utils/stylesheet';

class AddNewCard extends React.Component {
  state = {
    question: '',
    answer: '',
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
    const { dispatch, title, navigation } = this.props;
    const { question, answer } = this.state;

    addCardToDeck(title, question, answer)
      .then(dispatch(addNewCard(title, question, answer)))
      .then(navigation.goBack())
      .then(() => this.setState(() => ({
        question: '',
        answer: '',
      })));
  }

  render() {
    const { question, answer } = this.state;
    const {
      center,
      container,
      label,
      input,
      buttonSubmit,
      buttonTextSubmit,
    } = styles;
    return (
      <KeyboardAvoidingView
        style={[center, container]}
        behavior="padding"
      >
        <Text style={label}>Question</Text>
        <TextInput
          value={question}
          style={input}
          placeholder="Question"
          onChangeText={this.handleQuestionChange}
        />
        <Text style={label}>Answer</Text>
        <TextInput
          value={answer}
          style={input}
          placeholder="Answer"
          onChangeText={this.handleAnswerChange}
        />
        <TouchableOpacity style={buttonSubmit} onPress={this.handleSubmit}>
          <Text style={buttonTextSubmit}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

AddNewCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    state: PropTypes.object,
  }).isRequired,
};

const mapStateToProps = (state, { navigation }) => {
  const { decks } = state;
  const { title } = navigation.state.params;
  return {
    decks,
    title,
  };
};

export default connect(mapStateToProps)(AddNewCard);
