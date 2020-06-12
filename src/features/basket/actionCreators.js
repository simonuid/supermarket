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
    const newData = basketItems.filter(i => {
      console.log(i, 'iiiii')
      return i.id === id
    });

    const test = basketItems.find(i => {
      // console.log(i, 'iiiii')
      return i.id === id
    });

    console.log(typeof basketItems, 'basketItems')
    console.log(test, 'test')
    console.log(id, 'id')

    dispatch({
      type: REMOVE_ITEM,
      payload: newData,
    });
  }, [basketItems, dispatch]);

  return { addItem, removeItem };
};

export default useActions;
