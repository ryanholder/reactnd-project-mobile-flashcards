import * as types from './types';

export const requestDecks = () => ({
  type: types.REQUEST_DECKS,
});

export const receiveDecks = decks => ({
  type: types.RECEIVE_DECKS,
  decks,
});

// export function addNewDeck(deck) {
//   return {
//     type: types.ADD_NEW_DECK,
//     deck,
//   };
// }

// export function addDeckToStorage(deckName) {
//   return (dispatch) => {
//     saveDeckTitle(deckName)
//       .then(() => dispatch(addNewDeck(deckName)))
//       .catch(() => {
//         alert('error');
//         dispatch();
//       });
//   };
// }

// export function addNewCard(card) {
//   return {
//     type: types.ADD_NEW_CARD,
//     card,
//   };
// }

// export function addCardToStorage(card) {
//   return (dispatch) => {
//     addCardToDeck(card.deckName, { question: card.question, answer: card.answer })
//       .then(() => dispatch(addNewCard(card)))
//       .catch(() => {
//         alert('error');
//         dispatch();
//       });
//   };
// }
