import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlipCard from 'react-native-flip-card';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Platform,
} from 'react-native';

import { white, green, red } from '../utils/colors';
import {
  clearLocalNotification,
  setLocalNotification,
} from '../utils/notifications';

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    margin: 20,
    borderWidth: 0,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    flex: 1,
    alignItems: 'stretch',
  },
  center: {
    flex: 1,
  },
  question: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 30,
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
  buttonCorrect: {
    alignItems: 'center',
    backgroundColor: green,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    justifyContent: 'center',
  },
  buttonIncorrect: {
    alignItems: 'center',
    backgroundColor: red,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    justifyContent: 'center',
  },
  buttonTextSubmit: {
    fontSize: 20,
    color: white,
  },
  toggleQuestionAnswer: {
    color: red,
  },
  cardCount: {
    alignSelf: 'flex-start',
  },
  face: {
    alignItems: 'center',
    flex: 1,
  },
  back: {
    alignItems: 'center',
    flex: 1,
  },
  quizResults: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

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
      };
    });

    clearLocalNotification()
      .then(setLocalNotification);
  }

  render() {
    const {
      lastCard,
      correctAnswers,
      counter,
    } = this.state;
    const { deck, noCards } = this.props;
    const card = deck.cards[this.state.counter];

    return (
      <View style={styles.center}>
        {lastCard ?
          <View style={[styles.item, styles.quizResults]}>
            <Text style={styles.label}>
              Quiz Completed!!
            </Text>
            <Text>{`You scored ${correctAnswers} out of ${noCards}`}</Text>
          </View> :
          <FlipCard
            style={[styles.card, styles.item]}
            friction={6}
            perspective={1000}
            flipHorizontal
            flipVertical={false}
            flip={this.state.flip}
            clickable={false}
          >
            <View style={styles.face}>
              <View style={styles.cardCount}>
                <Text>{`Card ${counter + 1} of ${noCards}`}</Text>
              </View>
              <View style={styles.question}>
                <Text style={styles.label}>
                  {card.question}
                </Text>
                <Button
                  color={red}
                  onPress={() => { this.setState({ flip: !this.state.flip }); }}
                  title="Answer"
                />
                <TouchableOpacity
                  style={styles.buttonCorrect}
                  onPress={() => this.handleSubmit(true)}
                >
                  <Text style={styles.buttonTextSubmit}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonIncorrect}
                  onPress={() => this.handleSubmit(false)}
                >
                  <Text style={styles.buttonTextSubmit}>Incorrect</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.back}>
              <View style={styles.cardCount}>
                <Text>{`Card ${counter + 1} of ${noCards}`}</Text>
              </View>
              <View style={styles.question}>
                <Text style={styles.label}>
                  {card.answer}
                </Text>
                <Button
                  color={red}
                  onPress={() => { this.setState({ flip: !this.state.flip }); }}
                  title="Question"
                />
                <TouchableOpacity
                  style={styles.buttonCorrect}
                  onPress={() => this.handleSubmit(true)}
                >
                  <Text style={styles.buttonTextSubmit}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonIncorrect}
                  onPress={() => this.handleSubmit(false)}
                >
                  <Text style={styles.buttonTextSubmit}>Incorrect</Text>
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
