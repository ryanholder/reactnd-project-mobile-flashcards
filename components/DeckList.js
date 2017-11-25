import React from 'react';
import PropTypes from 'prop-types';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { fetchDecks } from '../utils/api';
import { receiveDecks } from '../actions/decks';
import { white } from '../utils/colors';

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
    paddingTop: 20,
    paddingBottom: 20,
  },
});

class DeckList extends React.Component {
  state = {
    ready: false,
  }

  componentDidMount() {
    const { dispatch } = this.props;

    fetchDecks()
      .then(decks => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ ready: true })));
  }

  render() {
    const { ready } = this.state;
    const { decks } = this.props;

    if (ready === false) {
      return <AppLoading />;
    }

    return (
      <View>
        {Object.keys(decks.items).map(deck => (
          <View style={styles.item} key={deck}>
            <Text style={styles.noDataText}>
              {decks.items[deck].title}
            </Text>
            <Text style={styles.noDataText}>
              {decks.items[deck].cards.length }
            </Text>
          </View>
        ))}
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
};

const mapStateToProps = (state) => {
  const { decks } = state;
  return {
    decks,
  };
};

export default connect(mapStateToProps)(DeckList);
