import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {renderHook} from '@testing-library/react-hooks';
import {useBasketValue, useTotalValue, useShowCheckoutValue} from './selectors';

describe('features > basket > useBasketValue', () => {
  const mockStore = configureStore([]);
  const value = [{id: 'id_test'}];
  const store = mockStore({
    checkout: {
      basketItems: [
        {
          id: 'id_test',
        },
      ],
    },
  });

  it('returns basket value', () => {
    const {result} = renderHook(() => useBasketValue(), {
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toEqual(value);
  });
});

describe('features > basket > useTotalValue', () => {
  const mockStore = configureStore([]);
  const value = {totalBeforeDiscount: 2.99};
  const store = mockStore({
    checkout: {
      total: {
        totalBeforeDiscount: 2.99,
      },
    },
  });

  it('returns totalBeforeDiscount value', () => {
    const {result} = renderHook(() => useTotalValue(), {
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toEqual(value);
  });
});

describe('features > basket > useShowCheckoutValue', () => {
  const mockStore = configureStore([]);
  const value = true;
  const store = mockStore({
    checkout: {
      showCheckout: true,
    },
  });

  it('returns basket value', () => {
    const {result} = renderHook(() => useShowCheckoutValue(), {
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toEqual(value);
  });
});
