import {
  REQUEST_DECKS,
  RECEIVE_DECKS,
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
    default:
      return state;
  }
};

export default decks;
