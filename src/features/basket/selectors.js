import { useSelector } from 'react-redux';

const useTotalValue = () => useSelector(state => state.checkout.total);
const useShowCheckoutValue = () => useSelector(state => state.checkout.showCheckout);
const useBasketValue = () => useSelector(state => state.checkout.basketItems);

export { useBasketValue, useTotalValue, useShowCheckoutValue };
