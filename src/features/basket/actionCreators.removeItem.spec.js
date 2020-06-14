import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {renderHook} from '@testing-library/react-hooks';
import {REMOVE_ITEM} from './actionTypes';
import useActions from './actionCreators';

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

const mockStore = configureStore([]);

describe('features > basket > removeItem priceByItem action', () => {
  /** Create mock store with the count value */
  const store = mockStore({
    checkout: {
      showCheckout: false,
      total: {
        discount: null,
        totalBeforeDiscount: 1.698,
        totalFinal: 0,
      },
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
        {
          id: 'id_byWeight',
          name: 'byWeight',
          priceByItem: false,
          priceByWeight: true,
          unitPrice: 3.99,
          promotion: false,
          weight: 0.2,
        },
      ],
    },
  });

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
    const {result} = renderHook(() => useActions(), {
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.removeItem).toBeInstanceOf(Function);
  });

  describe('removeItem', () => {
    it('removes a priceByItem item from basket', () => {
      const {result} = renderHook(() => useActions(), {
        wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
      });

      result.current.removeItem(
        priceByItem.id,
        priceByItem.priceByWeight,
        priceByItem.unitPrice
      );

      /** store.dispatch should be run once */
      expect(store.dispatch).toHaveBeenCalledTimes(1);

      /** store.dispatch should be run with proper action */
      expect(store.dispatch).toHaveBeenCalledWith({
        type: REMOVE_ITEM,
        totalBeforeDiscount: 0.7979999999999999,
        showCheckout: false,
        basketItems: [priceByWeight],
      });
    });
  });
});

describe('features > basket > removeItem priceByWeight action', () => {
  const store = mockStore({
    checkout: {
      showCheckout: false,
      total: {
        discount: null,
        totalBeforeDiscount: 1.698,
        totalFinal: 0,
      },
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
        {
          id: 'id_byWeight',
          name: 'byWeight',
          priceByItem: false,
          priceByWeight: true,
          unitPrice: 3.99,
          promotion: false,
          weight: 0.2,
        },
      ],
    },
  });

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

  describe('removeItem', () => {
    it('removes a priceByWeight item from basket', () => {
      const {result} = renderHook(() => useActions(), {
        wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
      });

      result.current.removeItem(
        priceByWeight.id,
        priceByWeight.priceByWeight,
        priceByWeight.unitPrice
      );

      /** store.dispatch should be run once */
      expect(store.dispatch).toHaveBeenCalledTimes(1);

      /** store.dispatch should be run with proper action */
      expect(store.dispatch).toHaveBeenCalledWith({
        type: REMOVE_ITEM,
        totalBeforeDiscount: 0.8999999999999999,
        showCheckout: false,
        basketItems: [
          priceByItem,
          {
            id: 'id_byWeight',
            name: 'byWeight',
            priceByItem: false,
            priceByWeight: true,
            unitPrice: 3.99,
            promotion: false,
            weight: 0,
          },
        ],
      });
    });
  });
});
