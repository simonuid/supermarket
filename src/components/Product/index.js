import React from 'react';
import PropTypes from 'prop-types';
import { useActions } from '../../features/basket';
import Styled from './styled';

const Product = ({ id, name, priceByItem, priceByWeight, unitPrice, url, promotion }) => {
  const { addItem, removeItem } = useActions();
  
  return (
    <Styled>
      <h4>
        {name}
      </h4>
      <img src={url} alt={name} />

      <div className='middle-div'>
        {promotion && (
          <p className='discount'>{promotion}</p>
        )}
      </div>
      
      {priceByItem && (
        <p className='unitPrice'>£{unitPrice}/each</p>
      )}

      {priceByWeight && (
        <p className='unitPrice'>£{unitPrice}/kg</p>
      )}

      <div className='bottom-div'>
        <button
          type="button"
          onClick={() => addItem(id, name, priceByItem, priceByWeight, unitPrice)}
        >
          +1
        </button>

        <button
          type="button"
          onClick={() => removeItem(id)}
        >
          -1
        </button>
      </div>
      
    </Styled>
  );
};

Product.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  priceByItem: PropTypes.bool,
  priceByWeight: PropTypes.bool,
  unitPrice: PropTypes.number,
  url: PropTypes.string,
  promotion: PropTypes.string,
};

Product.defaultProps = {
  id: '',
  name: '',
  priceByItem: false,
  priceByWeight: false,
  unitPrice: 0,
  url: '',
  promotion: null,
};

export default Product;