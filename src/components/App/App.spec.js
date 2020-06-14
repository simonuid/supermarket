import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {render} from '@testing-library/react';
import App from './App';

describe('components > App', () => {
  const mockStore = configureStore([]);
  const store = mockStore({
    checkout: {
      showCheckout: false,
      total: {
        discount: null,
        totalBeforeDiscount: 0,
        totalFinal: 0,
      },
      basketItems: [
        {
          id: 'id-test',
          name: 'test',
        },
      ],
    },
  });

  it('renders without crashing', () => {
    const {asFragment} = render(<App />, {
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });

    /**
     * Basic snapshot test to make sure, that rendered component
     * matches expected footprint.
     */
    expect(asFragment()).toMatchSnapshot();
  });
});
