import {
  REQUEST_DECKS,
  RECEIVE_DECKS,
  ADD_NEW_DECK,
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
    default:
      return state;
  }
};

export default decks;
