import React from 'react';
import FilterByCategory from './Filters/FilterByCategory';
import SearchByName from './Filters/SearchByName';
import SortByPrice from './Filters/SortByPrice';
import './ProductFilters.scss';
import PropTypes from 'prop-types';

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
    <div className="product-filters">
      <h1 className="product-filters__title">Products</h1>
      <div className="product-filters__box">
      <FilterByCategory onChange={handleCategoryChange} />
      <SortByPrice onChange={handleSortChange} />
      <SearchByName onChange={handleSearch} />
      </div>
    </div>
  );
}

export default ProductFilters;
