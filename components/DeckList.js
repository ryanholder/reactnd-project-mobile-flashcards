import React from 'react';
import PropTypes from 'prop-types';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { getDecks } from '../utils/api';
import { receiveDecks } from '../actions/decks';
import { white, black } from '../utils/colors';

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  noDataText: {
    fontSize: 20,
  },
  list: {
    flex: 1,
    alignSelf: 'stretch',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: black,
  },
});

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
              style={styles.deck}
              onPress={() => {
                navigation.navigate('DeckListItem', {
                  title: decks.items[deck].title,
                });
              }}
            >
              <View style={styles.item} key={deck}>
                <Text style={styles.noDataText}>
                  {decks.items[deck].title}
                </Text>
                <Text style={styles.noDataText}>
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
