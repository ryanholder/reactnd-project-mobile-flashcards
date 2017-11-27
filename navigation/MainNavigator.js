import { StackNavigator } from 'react-navigation';
import Tabs from './Tabs';
import DeckListItem from '../components/DeckListItem';
import AddNewCard from '../components/AddNewCard';
import { purple, white } from '../utils/colors';

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckListItem: {
    screen: DeckListItem,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    },
  },
  AddNewCard: {
    screen: AddNewCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    },
  },
});

export default MainNavigator;
