import React from 'react';
import {Provider} from 'react-redux';
import {render, fireEvent} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {REMOVE_ITEM, ADD_ITEM} from 'features/basket/actionTypes';
import Product from './index';

const mockStore = configureStore([]);

describe('components > Product', () => {
  const store = mockStore({
    checkout: {
      basketItems: [],
    },
  });

  jest.spyOn(store, 'dispatch');

  beforeEach(() => {
    store.dispatch.mockClear();
  });

  it('renders without crashing', () => {
    const {asFragment, getByTestId} = render(
      <Product
        id="item_test"
        name="test"
        promotion="Get 3 for 2!"
        unitPrice={0.5}
        priceByItem
      />,
      {
        wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
      }
    );

    expect(asFragment()).toMatchSnapshot();

    expect(getByTestId('promotion').textContent).toBe('Get 3 for 2!');
  });

  it('dispatches an action on add item button click', () => {
    const {getByTestId} = render(
      <Product
        id="item_test"
        name="test"
        promotion="Get 3 for 2!"
        unitPrice={0.5}
        priceByItem
      />,
      {
        wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
      }
    );
    fireEvent.click(getByTestId('btn-add'));

    expect(store.dispatch).toHaveBeenCalledTimes(1);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: ADD_ITEM,
      basketItems: [
        {
          id: 'item_test',
          name: 'test',
          promotion: 'Get 3 for 2!',
          unitPrice: 0.5,
          priceByItem: true,
          priceByWeight: false,
          weight: null,
        },
      ],
      showCheckout: false,
      totalBeforeDiscount: 0.5,
    });
  });

  it('dispatches an action on remove item button click', () => {
    const {getByTestId} = render(
      <Product
        id="item_test"
        name="test"
        promotion="Get 3 for 2!"
        unitPrice={0.5}
        priceByItem
      />,
      {
        wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
      }
    );
    fireEvent.click(getByTestId('btn-remove'));

    expect(store.dispatch).toHaveBeenCalledTimes(1);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: REMOVE_ITEM,
      basketItems: [],
      showCheckout: false,
      totalBeforeDiscount: 0,
    });
  });
});
