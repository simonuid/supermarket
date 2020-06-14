import React, { useState, useCallback }  from 'react';
import { uniqueId } from 'lodash';
import { useActions, useTotalValue, useBasketValue, useShowCheckoutValue } from '../../features/basket';
import Styled from './styled';

const Basket = () => {
  const total = useTotalValue();
  const basketItems = useBasketValue();
  const showTotal = useShowCheckoutValue();
  const { getTotal } = useActions();
  const hasDiscount = total.discount && total.discount.length > 0;
  
  const subTotal = total.totalBeforeDiscount ? total.totalBeforeDiscount.toFixed(2) : '0.00';

  const totalSavings =
    total.discount && total.discount.length > 0 && total.discount.map(d => d.saved).reduce((ac, c) => ac + c, 0);

  const getPriceByWeightIndex = () => basketItems
    .map(i => i)
    .findIndex((f => f.priceByWeight === true));

  const hasWeightItem = basketItems[getPriceByWeightIndex()] ? basketItems[getPriceByWeightIndex()].weight > 0 : null;

  return (
    <Styled>
      <h2>Basket</h2>
      <ul className='list'>
        {basketItems.map(i => {
          if (i.priceByWeight) {
            return !!hasWeightItem && (
              <li key={uniqueId()}>
                <span className='item-total weight'>
                  <span>
                    {i.name} - <span className='byWeight'>{i.weight.toFixed(2)}kg @ £{i.unitPrice}/kg</span>
                  </span>
                  <span className='item-price'>
                    {`£${(i.weight * i.unitPrice).toFixed(2)}`}
                  </span>
                </span>
              </li>
            )}
          return (
            <li key={uniqueId()}>
              <span className='item-total'>
                <span>{i.name}</span>
                <span className='item-price'>{`£${i.unitPrice ? i.unitPrice.toFixed(2) : '0.00'}`}</span>
              </span>
            </li>  
          )
       })}
      </ul>

      <hr/ >
      <p className='sub-total'>
        <span>Sub total</span>
        <span>{`£${subTotal}`}</span>
      </p>

      <button
        type="button"
        onClick={getTotal}
        className='btn-checkout'
      >
        Checkout
      </button>

      {basketItems.length > 0 && (
        <>
          <ul className="total">
            {showTotal && (
              <>
                {hasDiscount && (
                  <>
                    <hr />
                    <li className='title'>Savings</li>
                  </>
                )}
                {total.discount.map(m => (
                  <li key={uniqueId()}>
                    <span className='item-total'>
                      <span>{m.name}</span>
                      <span className='item-price'>-£{m.saved}</span>
                    </span>
                  </li>
                ))}
                {hasDiscount && (
                  <>
                  <hr className='savings-bottom' />
                  <li>
                    <span className='item-total'>
                      <span>Total savings</span>
                      <span className='item-price'>
                        -£{totalSavings}
                      </span>
                    </span>
                  </li>
                  <hr className='total-top' />
                  </>
                )}
                <li>
                  <span className='item-total'>
                    <span>Total to Pay</span>
                    <span className='item-price'>
                      £{total.totalFinal}
                    </span>
                  </span>
                </li>
              </>
            )}
          </ul>
        </>
      )}
    </Styled>
  );
};

export default Basket;
