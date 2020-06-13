import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useBasketValue from './selectors';
import { REMOVE_ITEM, ADD_ITEM } from './actionTypes';

const useActions = () => {
  const dispatch = useDispatch();
  const basketItems = useBasketValue();

  const getIndex = id => basketItems
    .map(i => i)
    .findIndex((f => f.id === id));

  // Add item action
  const addItem = useCallback((id, name, priceByItem, priceByWeight, unitPrice, promotion) => {
    const index = getIndex(id);
    // If basket has this item and it's priceByWeight, increase the weight by 0.2kg
    if (priceByWeight && index > -1) {
      const item = basketItems[index];
      basketItems.splice(index, 1);
      dispatch({
        type: ADD_ITEM,
        payload: [
          ...basketItems,
          {
            ...item,
            weight: item.weight += 0.2
          }
        ]
      });
    } else {
      dispatch({
        type: ADD_ITEM,
        payload: [
          ...basketItems,
          {
            id,
            name,
            priceByItem,
            priceByWeight,
            unitPrice,
            promotion,
            weight: priceByWeight ? 0.2 : null,
          }
        ]
      });
    }
  }, [basketItems, dispatch]);

  // Remove item action
  const removeItem = useCallback((id, priceByWeight) => {
    const index = getIndex(id);
    // If basket has this item and it's priceByWeight, decrease the weight by 0.2kg
    if (priceByWeight && index > -1) {
      const item = basketItems[index];
      basketItems.splice(index, 1);
      dispatch({
        type: REMOVE_ITEM,
        payload:  [
          ...basketItems,
          {
            ...item,
            weight: item.weight -= 0.2
          }
        ]
      });
    } else {
      if (index > -1) {
        basketItems.splice(index, 1);
      }
  
      dispatch({
        type: REMOVE_ITEM,
        payload: basketItems,
      });
    }   
  }, [basketItems, dispatch]);

  return { addItem, removeItem };
};

export default useActions;
