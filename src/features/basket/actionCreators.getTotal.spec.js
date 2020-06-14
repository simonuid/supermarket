import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { renderHook } from '@testing-library/react-hooks';
import { GET_TOTAL } from './actionTypes';
import useActions from './actionCreators';

const priceByItem = {
  id: 'item_coke',
  name: 'Coke',
  priceByItem: true,
  priceByWeight: false,
  unitPrice: 0.7,
  promotion: true,
  weight: null,
};

const priceByWeight = {
  id: 'id_byWeight',
  name: 'byWeight',
  priceByItem: false,
  priceByWeight: true,
  unitPrice: 3.99,
  promotion: false,
  weight: 0.4,
};

const mockStore = configureStore([]);

describe('features > basket > getTotal action', () => {
  const store = mockStore({
    checkout: {
      showCheckout: false,
      total: {
        discount: null,
        totalBeforeDiscount: 0,
        totalFinal: 0,
      },
      basketItems: [priceByItem, priceByItem, priceByWeight],
    }
  });

  jest.spyOn(store, 'dispatch');

  beforeEach(() => {
    store.dispatch.mockClear();
  });

  it('returns function', () => {
    const { result } = renderHook(() => useActions(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.getTotal).toBeInstanceOf(Function);
  });

  describe('getTotal', () => {
    it('calculate total with discount', () => {
      const { result } = renderHook(() => useActions(), {
        wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
      });

      result.current.getTotal();

      expect(store.dispatch).toHaveBeenCalledTimes(1);

      const totalBeforeDiscount = (priceByItem.unitPrice * 2) + (priceByWeight.unitPrice * priceByWeight.weight);

      expect(store.dispatch).toHaveBeenCalledWith({
        type: GET_TOTAL,
        payload: {
          discount: [{
            name: true,
            saved: priceByItem.unitPrice,
          }],
          totalBeforeDiscount,
          totalFinal: (totalBeforeDiscount - 0.7).toFixed(2),
        },
        showCheckout: true,
      });
    });
  });
});