import { useSelector } from 'react-redux';

const useCountValue = () => useSelector(state => state.checkout.basketItems);

export default useCountValue;
