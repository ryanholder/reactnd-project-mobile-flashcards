import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../utils/stylesheet';

class DeckListItem extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
  });

  render() {
    const { deck, navigation } = this.props;
    const {
      center,
      container,
      label,
      buttonSubmit,
      buttonTextSubmit,
    } = styles;

    return (
      <View style={[center, container]}>
        <Text style={label}>{deck.title}</Text>
        <Text style={label}>{deck.cards.length} Cards</Text>
        <TouchableOpacity
          style={buttonSubmit}
          onPress={() => navigation.navigate('AddNewCard', { title: deck.title })}
        >
          <Text style={buttonTextSubmit}>Add Card</Text>
        </TouchableOpacity>
        {deck.cards.length > 0 &&
        <TouchableOpacity
          style={buttonSubmit}
          onPress={() => navigation.navigate('QuizCards', { deck })}
        >
          <Text style={buttonTextSubmit}>Start Quiz</Text>
        </TouchableOpacity>}
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
