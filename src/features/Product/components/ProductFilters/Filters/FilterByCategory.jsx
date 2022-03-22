import categoryApi from'../../../../../api/categoryApi';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styles from '../ProductFilter.module.css'
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
            img:x.categoryThumbnail
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
    <div className={styles.filterproducts}>
      <select className={styles.filterproducts__box} onChange={handleCategoryChange}>
        <option hidden>Category Type</option>
        {categoryList.map((category) => (
          <option
            className={styles.filterproducts__options}
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
