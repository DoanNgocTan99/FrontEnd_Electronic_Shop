import React from 'react';
import PropTypes from 'prop-types';

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
    <div className="filter-products">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          className="filter-products__input"
          name="productName_contains"
          placeholder="Search By Name"
        />
      </form>
    </div>
  );
}

export default SearchByName;
