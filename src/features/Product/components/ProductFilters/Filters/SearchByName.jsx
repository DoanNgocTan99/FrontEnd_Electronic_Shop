import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchByName.module.css'

SearchByName.propTypes = {
  onChange: PropTypes.func,
};

function SearchByName({ onChange }) {
  const handleSearch = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div  className={styles.lform}>
      <form className={styles.filter_products} onSubmit={handleSearch}>
        <div className={styles.formdiv}>
        <input
          type="text"
          className={styles.filterproducts__input}
          name="productName_contains"
          placeholder=""
        />
        <label className={styles.form_label}>Search</label>
          {/* <button type="submit" className={styles.btn_find}>
            <i class="fas fa-search"></i>
          </button>   */}
        </div>
      </form>
    </div>
  );
}

export default SearchByName;
