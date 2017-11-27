import { AsyncStorage } from 'react-native';
import { DECKS_STORAGE_KEY } from './_decks';

export const fetchDecksFromAsyncStorage = async () => {
  try {
    const data = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    const decks = data === null ? {} : JSON.parse(data);
    return decks;
  } catch (error) {
    return {};
  }
};

export const addNewDeckToAsyncStorage = title =>
  AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      cards: [],
    },
  }));
