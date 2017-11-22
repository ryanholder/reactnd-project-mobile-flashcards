import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { purple } from './utils/colors';
import configureStore from './configureStore';
import MainNavigator from './navigation/MainNavigator';
import FlashcardsStatusBar from './components/FlashcardsStatusBar';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <View style={{ flex: 1 }}>
      <FlashcardsStatusBar backgroundColor={purple} barStyle="light-content" />
      <MainNavigator />
    </View>
  </Provider>
);

export default App;
