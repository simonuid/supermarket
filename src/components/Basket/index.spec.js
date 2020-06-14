import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { GET_TOTAL } from 'features/basket/actionTypes';
import Basket from './index';

describe('components > Basket', () => {
  /** Create mock store with the count value */
  const mockStore = configureStore([]);
  const store = mockStore({
    checkout: {
      total: {
        discount: [{
          name: 'Get 2 for 1!',
          saved: 0.7
        },{
          name: 'Get 3 for 2!',
          saved: 0.5
        }],
        totalBeforeDiscount: 3.69,
        totalFinal: "2.50"
      },
      basketItems: [
        {
          id: 'item_beans',
          name: 'Beans',
          promotion: 'Get 3 for 2!',
          unitPrice: 0.5,
          priceByItem: true
        },
        {
          id: 'item_beans',
          name: 'Beans',
          promotion: 'Get 3 for 2!',
          unitPrice: 0.5,
          priceByItem: true
        },
        {
          id: 'item_beans',
          name: 'Beans',
          promotion: 'Get 3 for 2!',
          unitPrice: 0.5,
          priceByItem: true
        },
        {
          id: 'item_coke',
          name: 'Coke',
          promotion: 'Get 2 for 1!',
          unitPrice: 0.7,
          priceByItem: true
        },
        {
          id: 'item_coke',
          name: 'Coke',
          promotion: 'Get 2 for 1!',
          unitPrice: 0.7,
          priceByItem: true
        },
        {
          id: 'item_orange',
          name: 'Oranges',
          unitPrice: 1.99,
          priceByWeight: true,
          weight: 0.4
        }
      ],
    },
  });

  jest.spyOn(store, 'dispatch');

  beforeEach(() => {
    store.dispatch.mockClear();
  });

  it('renders without crashing', () => {
    const { asFragment, getByTestId } = render(<Basket />, {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(asFragment()).toMatchSnapshot();

    expect(getByTestId('sub-total').textContent).toBe('Sub total£3.69');
  });

  it('dispatches an action on button click', () => {
    const { getByTestId } = render(<Basket />, {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    fireEvent.click(getByTestId('checkout'));

    /** Check if store.dispatch method was run */
    expect(store.dispatch).toHaveBeenCalledTimes(1);

    /** Check if store.dispatch was run with correct action */
    expect(store.dispatch).toHaveBeenCalledWith({
      type: GET_TOTAL,
      payload: {
        discount: [{
          name: 'Get 2 for 1!',
          saved: 0.7
        },{
          name: 'Get 3 for 2!',
          saved: 0.5
        }],
        totalBeforeDiscount: 3.6960000000000006,
        totalFinal: "2.50",
      },
      showCheckout: true,
    });
  });
});
