import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { white, purple } from '../utils/colors';

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

class DeckListItem extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
  });

  render() {
    const { deck, navigation } = this.props;

    return (
      <View style={[styles.center, styles.container]}>
        <Text style={styles.label}>{navigation.state.params.title}</Text>
        <Text style={styles.label}>{navigation.state.params.noCards} Cards</Text>
        <TouchableOpacity
          style={styles.buttonSubmit}
          onPress={() => navigation.navigate('AddNewCard', { title: deck.title })}
        >
          <Text style={styles.buttonTextSubmit}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSubmit}
          onPress={() => navigation.navigate('QuizCards', { deck })}
        >
          <Text style={styles.buttonTextSubmit}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

DeckListItem.propTypes = {
  deck: PropTypes.shape({
    title: PropTypes.string,
    cards: PropTypes.array,
  }).isRequired,
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
  return {
    deck: decks.items[navigation.state.params.title],
  };
};

export default connect(mapStateToProps)(DeckListItem);
