import React from 'react';
import FilterByCategory from './Filters/FilterByCategory'
import SortByPrice from './Filters/SortByPrice'
import PropTypes from 'prop-types';
import SearchByName from './Filters/SearchByName'
import styles from './ProductFilter.module.css'
ProductFilters.propTypes = {
  onChange: PropTypes.func,
};

function ProductFilters({ onChange }) {
  const handleCategoryChange = (newCategoryId) => {
    if (!onChange) return;
    const newFilters = {
      'category.id': newCategoryId,
    };
    onChange(newFilters);
  };

  const handleSortChange = (newSort) => {
    if (!onChange) return;

    const newFilters = {
      _sort: newSort,
    };
    onChange(newFilters);
  };

  const handleSearch = (newSearch) => {
    if (!onChange) return;

    const newFilters = {
      productName_contains: newSearch,
    };
    onChange(newFilters);
  };

  return (
    <div className={styles.product_filters}>
      <FilterByCategory onChange={handleCategoryChange} />
      <SortByPrice onChange={handleSortChange} />
      <SearchByName onChange={handleSearch} />
    </div>
  );
}

export default ProductFilters;
