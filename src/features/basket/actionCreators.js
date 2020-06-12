import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useCountValue from './selectors';
import { REMOVE_ITEM, ADD_ITEM } from './actionTypes';

const useActions = () => {
  const dispatch = useDispatch();
  const basketItems = useCountValue();

  const addItem = useCallback((id, name, priceByItem, priceByWeight, unitPrice) => {
    dispatch({
      type: ADD_ITEM,
      item: {
        id,
        name,
        priceByItem,
        priceByWeight,
        unitPrice,
      },
    });
  }, [basketItems, dispatch]);

  const removeItem = useCallback((id) => {
    const index = basketItems
      .map(i => i.item)
      .findIndex((f => f.id === id));

    if (index > -1) {
      basketItems.splice(index, 1);
    }

    dispatch({
      type: REMOVE_ITEM,
      payload: basketItems,
    });
  }, [basketItems, dispatch]);

  return { addItem, removeItem };
};

export default useActions;
