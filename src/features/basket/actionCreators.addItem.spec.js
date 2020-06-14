import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { renderHook } from '@testing-library/react-hooks';
import { ADD_ITEM } from './actionTypes';
import useActions from './actionCreators';

describe('features > basket > addItem action', () => {
  /** Create mock store with the count value */
  const mockStore = configureStore([]);
  const store = mockStore({
    checkout: {
      showCheckout: false,
      total: {
        discount: null,
        totalBeforeDiscount: 0,
        totalFinal: 0,
      },
      basketItems: [],
    }
  });

  const priceByItem = {
    id: 'id_byItem',
    name: 'byItem',
    priceByItem: true,
    priceByWeight: false,
    unitPrice: 0.9,
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
    weight: 0.2,
  };

  /**
   * Add spy to watch for store.dispatch method.
   */
  jest.spyOn(store, 'dispatch');

  /**
   * Jest hook which runs before each test,
   */
  beforeEach(() => {
    /**
     * Clear any saved mock data from previous tests,
     * because jest saves calls data for spies and mocks.
     */
    store.dispatch.mockClear();
  });

  it('returns function', () => {
    const { result } = renderHook(() => useActions(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.addItem).toBeInstanceOf(Function);
  });

  describe('addItem', () => {
    it('adds a priceByItem item to basket', () => {
      const { result } = renderHook(() => useActions(), {
        wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
      });

      result.current.addItem(
        priceByItem.id,
        priceByItem.name,
        priceByItem.priceByItem,
        priceByItem.priceByWeight,
        priceByItem.unitPrice,
        priceByItem.promotion,
      );

      /** store.dispatch should be run once */
      expect(store.dispatch).toHaveBeenCalledTimes(1);

      /** store.dispatch should be run with proper action */
      expect(store.dispatch).toHaveBeenCalledWith({
        type: ADD_ITEM,
        totalBeforeDiscount: priceByItem.unitPrice,
        showCheckout: false,
        basketItems: [priceByItem],
      });
    });

    it('adds a priceByWeight item to basket', () => {
      const { result } = renderHook(() => useActions(), {
        wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
      });

      result.current.addItem(
        priceByWeight.id,
        priceByWeight.name,
        priceByWeight.priceByItem,
        priceByWeight.priceByWeight,
        priceByWeight.unitPrice,
        priceByWeight.promotion
      );

      /** store.dispatch should be run once */
      expect(store.dispatch).toHaveBeenCalledTimes(1);

      /** store.dispatch should be run with proper action */
      expect(store.dispatch).toHaveBeenCalledWith({
        type: ADD_ITEM,
        totalBeforeDiscount: priceByWeight.unitPrice * 0.2,
        showCheckout: false,
        basketItems: [priceByWeight],
      });
    });
  });
});