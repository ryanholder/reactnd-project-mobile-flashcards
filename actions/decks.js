import * as types from './types';

export const requestDecks = () => ({
  type: types.REQUEST_DECKS,
});

export const receiveDecks = decks => ({
  type: types.RECEIVE_DECKS,
  decks,
});

export function addNewDeck(deck) {
  return {
    type: types.ADD_NEW_DECK,
    deck,
  };
}
