import React from 'react';
import { sumBy } from 'lodash';
import { useActions, useBasketValue } from '../../features/basket';
import Styled from './styled';

const Basket = () => {
  const basketItems = useBasketValue();

  const subTotal = basketItems.map(i => {
    if (i.priceByWeight) {
      return (i.unitPrice * i.weight);
    }
    return i.unitPrice;
  }).reduce((ac, c) => ac + c, 0);

  const getIndex = id => basketItems
    .map(i => i)
    .findIndex((f => f.id === id));

  const getSavings = () => {

    const counts = basketItems.map(item => item).reduce((acc, value) => ({
      ...acc,
      [value.id]: (acc[value.id] || 0) + 1
    }), {});

    const cokeSaved = counts.item_coke >= 2 ? (counts.item_coke / 2) : 0;
    const itemCoke = basketItems[getIndex('item_coke')];
    const discountCoke = [{
      name: itemCoke && itemCoke.promotion,
      saved: itemCoke && (itemCoke.unitPrice * Math.floor(cokeSaved))
    }];

    const beansSaved = counts.item_beans >= 3 ? (counts.item_beans / 3) : 0;
    const itemBeans = basketItems[getIndex('item_beans')];
    const discountBeans = [{
      name: itemBeans && itemBeans.name,
      saved: itemBeans && (itemBeans.unitPrice * Math.floor(beansSaved))
    }];

    return discountCoke.concat(discountBeans);
  }

  return (
    <Styled>
      <h2>Basket</h2>
      <ul className='list'>
        {basketItems.map(i => {
          if (i.priceByWeight) {
            return (
              <li>
                <span className='item-total weight'>
                  <span>
                    {i.weight.toFixed(2)}kg @ £{i.unitPrice}/kg
                  </span>
                  <span className='item-price'>
                    {`£${i.weight.toFixed(2) * i.unitPrice}`}
                  </span>
                </span>
              </li>
            )}
          return (
            <li>
              <span className='item-total'>
                <span>{i.name}</span>
                <span className='item-price'>{`£${i.unitPrice}`}</span>
              </span>
            </li>  
          )
       })}
      </ul>
      {basketItems.length > 0 && (
        <>
          <hr/ >
          <p className='sub-total'>
            <span>Sub-total</span>
            <span>{`£${subTotal.toFixed(2)}`}</span>
          </p>
          {getSavings().length > 0 && (
            <ul className="savings">
              <li>Savings</li>
              {getSavings().map(m => (
                <>
                  <li>{m.name}</li>
                  <li>{m.saved}</li>
                </>
              ))}
            </ul>
          )}
          
        </>
      )}

      {console.log(getSavings(), ">>getSavings")}
    </Styled>
  );
};

export default Basket;
