import { ADD_ITEM, REMOVE_ITEM } from './actionTypes';

const initialState = {
  basketItems: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return { 
        ...state,
        basketItems: action.payload
      };
    case REMOVE_ITEM:
      return { 
        basketItems: action.payload
      };
    default:
      return state;
  }
};
