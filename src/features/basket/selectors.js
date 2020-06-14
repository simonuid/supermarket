import { useSelector } from 'react-redux';

const useBasketValue = () => useSelector(state => state.checkout.basketItems);
const useTotalValue = () => useSelector(state => state.checkout.total);
const useShowCheckoutValue = () => useSelector(state => state.checkout.showCheckout);

export { useBasketValue, useTotalValue, useShowCheckoutValue };
