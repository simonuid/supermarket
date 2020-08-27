import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import { useBasketValue } from './selectors';
import { REMOVE_ITEM, ADD_ITEM, GET_TOTAL } from './actionTypes';

const useActions = () => {
  const dispatch = useDispatch();
  const basketItems = useBasketValue();

  const getIndex = useCallback(
    id => basketItems.map(i => i).findIndex(f => f.id === id),
    [basketItems]
  );

  const subTotal = basketItems
    .map(i => {
      if (i.priceByWeight) {
        return i.unitPrice * i.weight;
      }
      return i.unitPrice;
    })
    .reduce((ac, c) => ac + c, 0);

  /** Add item action */
  const addItem = useCallback(
    (id, name, priceByItem, priceByWeight, unitPrice, promotion) => {
      const index = getIndex(id);
      /** If basket has this item and it's priceByWeight, increase the weight by 0.2kg */
      if (priceByWeight && index > -1) {
        const item = basketItems[index];
        const newItems = basketItems.filter((b, i) => i !== index);
        dispatch({
          type: ADD_ITEM,
          totalBeforeDiscount: subTotal + unitPrice * 0.2,
          showCheckout: false,
          basketItems: [
            ...newItems,
            {
              ...item,
              weight: item.weight + 0.2,
            },
          ],
        });
      } else {
        dispatch({
          type: ADD_ITEM,
          totalBeforeDiscount: priceByWeight
            ? subTotal + unitPrice * 0.2
            : subTotal + unitPrice,
          showCheckout: false,
          basketItems: [
            ...basketItems,
            {
              id,
              name,
              priceByItem,
              priceByWeight,
              unitPrice,
              promotion,
              weight: priceByWeight ? 0.2 : null,
            },
          ],
        });
      }
    },
    [basketItems, dispatch, getIndex, subTotal]
  );

  /** Remove item action */
  const removeItem = useCallback(
    (id, priceByWeight, unitPrice) => {
      const index = getIndex(id);
      const newItems = basketItems.filter((b, i) => i !== index);
      /** If basket has this item and it's priceByWeight, decrease the weight by 0.2kg */
      if (priceByWeight && index > -1) {
        const item = basketItems[index];
        const lastByWeightItem = item.weight.toFixed(2) <= 0.2;
        
        dispatch({
          type: REMOVE_ITEM,
          totalBeforeDiscount: lastByWeightItem
            ? subTotal
            : subTotal - unitPrice * 0.2,
          showCheckout: false,
          basketItems: [
            ...newItems,
            {
              ...item,
              weight: lastByWeightItem ? 0 : item.weight - 0.2,
            },
          ],
        });
      } else {
        const item = basketItems[index];
        const hasPriceByItem = item ? subTotal - item.unitPrice : 0
        const hasPriceByWeight = item ? subTotal - item.unitPrice * 0.2 : 0;
      
        dispatch({
          type: REMOVE_ITEM,
          showCheckout: false,
          totalBeforeDiscount: priceByWeight ? hasPriceByWeight : hasPriceByItem,
          basketItems: index > -1 ? [...newItems] : [...basketItems],
        });
      }
    },
    [basketItems, dispatch, getIndex, subTotal]
  );

  /** Calculate total */
  const getTotal = useCallback(() => {
    const getSavings = () => {
      const counts = basketItems
        .map(item => item)
        .reduce(
          (acc, value) => ({
            ...acc,
            [value.id]: (acc[value.id] || 0) + 1,
          }),
          {}
        );

      /**
       * If there are more items using the same type of discount, we can use an api to store
       * and calculate the discount amount; here I just hardcode item_coke and item_beans as
       * these are what we need in this task.
       */
      const cokeSaved = counts.item_coke >= 2 ? counts.item_coke / 2 : 0;
      const itemCoke = basketItems[getIndex('item_coke')];
      const discountCoke =
        cokeSaved > 0
          ? {
              name: itemCoke && itemCoke.promotion,
              saved: itemCoke && itemCoke.unitPrice * Math.floor(cokeSaved),
            }
          : null;

      const beansSaved = counts.item_beans >= 3 ? counts.item_beans / 3 : 0;
      const itemBeans = basketItems[getIndex('item_beans')];
      const discountBeans =
        beansSaved > 0
          ? {
              name: itemBeans && itemBeans.promotion,
              saved: itemBeans && itemBeans.unitPrice * Math.floor(beansSaved),
            }
          : null;

      const discountItems = [discountCoke, discountBeans].filter(i => i);

      return discountItems;
    };

    const totalSaved = getSavings()
      .map(s => s.saved)
      .reduce((ac, c) => ac + c, 0);

    dispatch({
      type: GET_TOTAL,
      payload: {
        discount: getSavings(),
        totalBeforeDiscount: subTotal,
        totalFinal: (subTotal - totalSaved).toFixed(2),
      },
      showCheckout: true,
    });
  }, [basketItems, dispatch, getIndex, subTotal]);

  return {addItem, removeItem, getTotal};
};

export default useActions;
