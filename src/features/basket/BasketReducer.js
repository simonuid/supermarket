import { ADD_ITEM, GET_TOTAL, REMOVE_ITEM } from './actionTypes';

const initialState = {
  basketItems: [],
  total: {},
  showCheckout: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return { 
        ...state,
        basketItems: action.basketItems,
        showCheckout: action.showCheckout,
        total: {
          ...state.total,
          totalBeforeDiscount: action.totalBeforeDiscount,
        }
      };
    case REMOVE_ITEM:
      return {
        ...state,
        basketItems: action.basketItems,
        showCheckout: action.showCheckout,
        total: {
          ...state.total,
          totalBeforeDiscount: action.totalBeforeDiscount,
        }
      };
    case GET_TOTAL:
      return {
        ...state,
        total: action.payload,
        showCheckout: action.showCheckout,
      };
    default:
      return state;
  }
};
