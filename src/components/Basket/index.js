import React from 'react';
import { useActions, useBasketValue } from '../../features/basket';
import Styled from './styled';

const Basket = () => {
  const basketItems = useBasketValue();

  return (
    <Styled>
      <h2>Basket</h2>
      <ul>
        {basketItems && basketItems.map(i => (
          <li>{i.name}</li>
        ))}
      </ul>
      {console.log(basketItems, ">>basketItemss")}
    </Styled>
  );
};

export default Basket;
