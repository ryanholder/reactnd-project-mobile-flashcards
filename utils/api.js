import { AsyncStorage } from 'react-native';

const DECKS_STORAGE_KEY = 'MobileFlashcards:decks';

export const getDecks = async () => {
  try {
    const data = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    const decks = data === null ? {} : JSON.parse(data);
    return decks;
  } catch (error) {
    return {};
  }
};

export const getDeck = title =>
  getDecks().then(decks => decks[title]);

export const saveDeckTitle = title =>
  AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      cards: [],
    },
  }));

export const addCardToDeck = (title, question, answer) =>
  getDeck(title).then((deck) => {
    deck.cards.push({
      question,
      answer,
    });
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      [title]: deck,
    }));
  });
