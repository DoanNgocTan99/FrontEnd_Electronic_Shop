import categoryApi from 'api/categoryApi';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import './Filters.scss';

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

function FilterByCategory({ onChange }) {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        setCategoryList(
          list.map((x) => ({
            id: x.id,
            name: x.categoryName,
          }))
        );
      } catch (error) {
        console.log('Failed to fetch category list', error);
      }
    })();
  }, []);
  const handleCategoryChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  return (
    <div className="filter-products">
      <select className="filter-products__box" onChange={handleCategoryChange}>
        <option hidden>Category Type</option>
        {categoryList.map((category) => (
          <option
            className="filter-products__options"
            key={category.id}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterByCategory;
