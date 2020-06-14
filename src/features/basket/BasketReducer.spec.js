import {ADD_ITEM, REMOVE_ITEM} from './actionTypes';
import BasketReducer from './BasketReducer';

describe('features > basket > BasketReducer', () => {
  /**
   * All test cases are very simple, since Redux reducers are pure functions
   */
  it('returns initial state, if non matched action is dispatched', () => {
    const initialState = {
      basketItems: [],
      total: {},
      showCheckout: false,
    };
    const action = {
      type: 'FOO',
    };
    expect(BasketReducer(initialState, action)).toBe(initialState);
  });

  it(`returns state with incremented value, if ${ADD_ITEM} action is dispatched`, () => {
    const initialState = {
      basketItems: [],
      total: {
        totalBeforeDiscount: 0,
      },
      showCheckout: false,
    };

    /** State we expect after action dispatched */
    const expectedState = {
      basketItems: [
        {
          id: 'id_byItem',
          name: 'byItem',
          priceByItem: true,
          priceByWeight: false,
          unitPrice: 0.9,
          promotion: true,
          weight: null,
        },
      ],
      showCheckout: false,
      total: {
        totalBeforeDiscount: 0.9,
      },
    };

    const action = {
      type: ADD_ITEM,
      basketItems: expectedState.basketItems,
      showCheckout: expectedState.showCheckout,
      totalBeforeDiscount: expectedState.basketItems[0].unitPrice,
    };

    expect(BasketReducer(initialState, action)).toEqual(expectedState);
  });

  it(`returns state with decremented value, if ${REMOVE_ITEM} action is dispatched`, () => {
    const initialState = {
      basketItems: [
        {
          id: 'id_byItem',
          name: 'byItem',
          priceByItem: true,
          priceByWeight: false,
          unitPrice: 0.9,
          promotion: true,
          weight: null,
        },
      ],
      showCheckout: false,
      total: {
        totalBeforeDiscount: 0.9,
      },
    };

    /** State we expect after action dispatched */
    const expectedState = {
      basketItems: [],
      total: {
        totalBeforeDiscount: 0,
      },
      showCheckout: false,
    };

    const action = {
      type: REMOVE_ITEM,
      basketItems: expectedState.basketItems,
      showCheckout: expectedState.showCheckout,
      totalBeforeDiscount:
        initialState.total.totalBeforeDiscount -
        initialState.basketItems[0].unitPrice,
    };

    expect(BasketReducer(initialState, action)).toEqual(expectedState);
  });
});
