import { useSelector } from 'react-redux';

const useBasketValue = () => useSelector(state => state.checkout.basketItems);

export default useBasketValue;
