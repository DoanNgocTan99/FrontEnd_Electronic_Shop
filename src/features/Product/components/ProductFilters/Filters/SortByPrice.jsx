import React from 'react';
import PropTypes from 'prop-types';
import styles from '../ProductFilter.module.css'
SortByPrice.propTypes = {
  onChange: PropTypes.func,
};

function SortByPrice({ onChange }) {
  const handleSortChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="filter-products">
      <select className={styles.filterproducts__box} onChange={handleSortChange}>
        <option hidden>Price</option>
        <option className={styles.filterproducts__options} value="salePrice:ASC">
          Lowest to Highest
        </option>
        <option className={styles.filterproducts__options} value="salePrice:DESC">
          Highest to Lowest
        </option>
      </select>
    </div>
  );
}

export default SortByPrice;
