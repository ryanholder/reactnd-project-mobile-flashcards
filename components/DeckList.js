import React from 'react';
import PropTypes from 'prop-types';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { getDecks } from '../utils/api';
import { receiveDecks } from '../actions/decks';
import styles from '../utils/stylesheet';

class DeckList extends React.Component {
  state = {
    ready: false,
  }

  componentDidMount() {
    const { dispatch } = this.props;

    getDecks()
      .then(decks => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ ready: true })));
  }

  renderDeckList = ({ item }) => (
    <View>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  render() {
    const { ready } = this.state;
    const { decks, navigation } = this.props;
    const {
      item,
      noDataText,
    } = styles;

    if (ready === false) {
      return <AppLoading />;
    }

    return (
      <View>
        {(Object.keys(decks.items).length === 0 && <Text>Create your first deck!!</Text>) ||
        <ScrollView>
          {Object.keys(decks.items).map(deck => (
            <TouchableOpacity
              key={deck}
              onPress={() => {
                navigation.navigate('DeckListItem', {
                  title: decks.items[deck].title,
                });
              }}
            >
              <View style={item} key={deck}>
                <Text style={noDataText}>
                  {decks.items[deck].title}
                </Text>
                <Text style={noDataText}>
                  {decks.items[deck].cards.length} cards
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        }
      </View>
    );
  }
}

DeckList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  decks: PropTypes.shape({
    isFetching: PropTypes.bool,
    items: PropTypes.object,
  }).isRequired,
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    state: PropTypes.object,
  }).isRequired,
};

const mapStateToProps = (state) => {
  const { decks } = state;
  return {
    decks,
  };
};

export default connect(mapStateToProps)(DeckList);
