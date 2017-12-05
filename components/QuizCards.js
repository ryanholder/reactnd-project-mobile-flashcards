import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlipCard from 'react-native-flip-card';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import styles from '../utils/stylesheet';

import {
  clearLocalNotification,
  setLocalNotification,
} from '../utils/notifications';

class QuizCards extends React.Component {
  state = {
    counter: 0,
    lastCard: false,
    correctAnswers: 0,
    flip: false,
  }

  handleSubmit = (answer) => {
    this.setState((prevState) => {
      const { noCards } = this.props;

      return {
        counter: prevState.counter + 1,
        lastCard: prevState.counter + 1 === noCards,
        correctAnswers: answer ? prevState.correctAnswers + 1 : prevState.correctAnswers,
        flip: false,
      };
    });

    clearLocalNotification()
      .then(setLocalNotification);
  }

  handleRestart = () => {
    this.setState({
      counter: 0,
      lastCard: false,
      correctAnswers: 0,
      flip: false,
    });
  }

  render() {
    const {
      lastCard,
      correctAnswers,
      counter,
    } = this.state;
    const { deck, noCards, navigation } = this.props;
    const card = deck.cards[this.state.counter];
    const {
      quizCenter,
      quizItem,
      quizResults,
      label,
      buttonSubmit,
      buttonTextSubmit,
      face,
      back,
      cardCount,
      question,
      buttonFlip,
      flipText,
      buttonCorrect,
      buttonIncorrect,
    } = styles;

    return (
      <View style={quizCenter}>
        {lastCard ?
          <View style={[quizItem, quizResults]}>
            <Text style={label}>
              Quiz Completed!!
            </Text>
            <Text>{`You scored ${correctAnswers} out of ${noCards}`}</Text>
            <TouchableOpacity
              style={buttonSubmit}
              onPress={() => this.handleRestart()}
            >
              <Text style={buttonTextSubmit}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={buttonSubmit}
              onPress={() => navigation.goBack()}
            >
              <Text style={buttonTextSubmit}>Back to Deck</Text>
            </TouchableOpacity>
          </View> :
          <FlipCard
            style={quizItem}
            friction={6}
            perspective={1000}
            flipHorizontal
            flipVertical={false}
            flip={this.state.flip}
            clickable={false}
          >
            <View style={face}>
              <View style={cardCount}>
                <Text>{`Card ${counter + 1} of ${noCards}`}</Text>
              </View>
              <View style={question}>
                <Text style={label}>
                  {card.question}
                </Text>
                <TouchableOpacity
                  style={buttonFlip}
                  onPress={() => { this.setState({ flip: !this.state.flip }); }}
                >
                  <Text style={flipText}>Show Answer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={buttonCorrect}
                  onPress={() => this.handleSubmit(true)}
                >
                  <Text style={buttonTextSubmit}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={buttonIncorrect}
                  onPress={() => this.handleSubmit(false)}
                >
                  <Text style={buttonTextSubmit}>Incorrect</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={back}>
              <View style={cardCount}>
                <Text>{`Card ${counter + 1} of ${noCards}`}</Text>
              </View>
              <View style={question}>
                <Text style={label}>
                  {card.answer}
                </Text>
                <TouchableOpacity
                  style={buttonFlip}
                  onPress={() => { this.setState({ flip: !this.state.flip }); }}
                >
                  <Text style={flipText}>Show Question</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={buttonCorrect}
                  onPress={() => this.handleSubmit(true)}
                >
                  <Text style={buttonTextSubmit}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={buttonIncorrect}
                  onPress={() => this.handleSubmit(false)}
                >
                  <Text style={buttonTextSubmit}>Incorrect</Text>
                </TouchableOpacity>
              </View>
            </View>
          </FlipCard>
        }
      </View>
    );
  }
}

QuizCards.propTypes = {
  deck: PropTypes.shape({
    title: PropTypes.string,
    cards: PropTypes.array,
  }).isRequired,
  noCards: PropTypes.number.isRequired,
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    state: PropTypes.object,
  }).isRequired,
};

const mapStateToProps = (state, { navigation }) => {
  const { deck } = navigation.state.params;
  const noCards = deck.cards.length;
  return {
    deck,
    noCards,
  };
};

export default connect(mapStateToProps)(QuizCards);
