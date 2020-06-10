import React from 'react';
import {useCountValue, useActions} from '../../features/counter';
import Styled from './styled';

const Basket = () => {
  /**
   *  Get count value from Redux store. We defined selector
   *  (state => state.counter.value) inside counter feature folder,
   *  to make component global state agnostic
   */
  const count = useCountValue();

  /** Create incrementCounter action, using custom hook from feature */
  const {incrementCounter} = useActions();

  return (
    <Styled>
      <h2>Basket</h2>
      <ul>
        <li>bananas</li>
      </ul>
      {/* <button
        className={classes.button}
        type="button"
        onClick={incrementCounter}>
        Increment by one
      </button>
      <div>
        Total value: <strong>{count}</strong>
      </div> */}
    </Styled>
  );
};

export default Basket;
