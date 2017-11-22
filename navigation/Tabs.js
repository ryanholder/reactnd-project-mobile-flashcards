import React from 'react';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import DeckList from '../components/DeckList';
import AddNewDeck from '../components/AddNewDeck';
import { purple, white } from '../utils/colors';

const DecksTabBarIcon = ({ tintColor }) => (
  <Ionicons name="ios-albums-outline" size={30} color={tintColor} />
);

const NewDeckTabBarIcon = ({ tintColor }) => (
  <Ionicons name="ios-add-circle-outline" size={30} color={tintColor} />
);

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: DecksTabBarIcon,
    },
  },
  AddNewDeck: {
    screen: AddNewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: NewDeckTabBarIcon,
    },
  },
}, {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    },
  },
});

DecksTabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

NewDeckTabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default Tabs;
