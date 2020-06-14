import React from 'react';
import PropTypes from 'prop-types';
import {useActions} from '../../features/basket';
import Styled from './styled';

const Product = ({
  id,
  name,
  priceByItem,
  priceByWeight,
  unitPrice,
  weight,
  url,
  promotion,
}) => {
  const {addItem, removeItem} = useActions();

  return (
    <Styled>
      <h4>{name}</h4>
      <img src={url} alt={name} />

      <div className="middle-div">
        {promotion && (
          <p className="discount" data-testid="promotion">
            {promotion}
          </p>
        )}
      </div>

      {priceByItem && <p className="unitPrice">£{unitPrice.toFixed(2)}/each</p>}

      {priceByWeight && <p className="unitPrice">£{unitPrice.toFixed(2)}/kg</p>}

      <div className="bottom-div">
        <button
          data-testid="btn-add"
          type="button"
          onClick={() =>
            addItem(id, name, priceByItem, priceByWeight, unitPrice, promotion)
          }>
          +
        </button>

        <button
          data-testid="btn-remove"
          type="button"
          onClick={() => removeItem(id, priceByWeight, unitPrice)}>
          -
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
  weight: PropTypes.number,
};

Product.defaultProps = {
  id: '',
  name: '',
  priceByItem: false,
  priceByWeight: false,
  unitPrice: 0,
  url: '',
  promotion: null,
  weight: null,
};

export default Product;
