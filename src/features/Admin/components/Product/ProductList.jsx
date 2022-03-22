import React from 'react';
import PropTypes from 'prop-types';
import ProductItem from './ProductItem';
import './ProductList.scss';

ProductList.propTypes = {
  data: PropTypes.array,
};

function ProductList({ data = [] }) {
  return (
    <div className="product-list">
      {data.map((product) => (
        <div key={product.id} className="product-list__item">
          <ProductItem product={product} />
        </div>
      ))}
    </div>
  );
}

export default ProductList;
