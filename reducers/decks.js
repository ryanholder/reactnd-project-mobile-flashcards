import {
  REQUEST_DECKS,
  RECEIVE_DECKS,
  ADD_NEW_DECK,
  ADD_NEW_CARD,
} from '../actions/types';

const decks = (state = {
  isFetching: false,
  items: {},
}, action) => {
  switch (action.type) {
    case REQUEST_DECKS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_DECKS:
      return {
        ...state,
        isFetching: false,
        items: action.decks,
      };
    case ADD_NEW_DECK:
      return {
        ...state,
        isFetching: false,
        items: {
          ...state.items,
          [action.deck]: {
            title: action.deck,
            cards: [],
          },
        },
      };
    case ADD_NEW_CARD:
      return {
        ...state,
        isFetching: false,
        items: {
          ...state.items,
          [action.deck]: {
            title: action.deck,
            cards: [
              ...state.items[action.deck].cards,
              {
                question: action.question,
                answer: action.answer,
              },
            ],
          },
        },
      };
    default:
      return state;
  }
};

export default decks;
