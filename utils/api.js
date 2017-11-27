import { AsyncStorage } from 'react-native';

const DECKS_STORAGE_KEY = 'MobileFlashcards:decks';

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

export const addNewCardToAsyncStorage = (title, question, answer) =>
  AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      cards: [
        {
          question,
          answer,
        },
      ],
    },
  }));
