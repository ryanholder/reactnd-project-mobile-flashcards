import {
  REQUEST_CARDS,
  RECEIVE_CARDS,
} from '../actions/types';

const decks = (state = {
  isFetching: false,
  items: [],
}, action) => {
  switch (action.type) {
    case REQUEST_CARDS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_CARDS:
      return {
        ...state,
        isFetching: false,
        items: action.categories,
        lastUpdated: action.receivedAt,
      };
    default:
      return state;
  }
};

export default decks;
