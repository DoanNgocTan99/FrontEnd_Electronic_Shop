import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
// import categoryApi from 'api/categoryApi';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

SelectFieldBrand.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

function SelectFieldBrand(props) {
  const { form, name, label } = props;
  const {
    formState: { errors },
  } = form;
  const hasError = errors[name];

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const getApi = `https://localhost:44306/Brand`;
        axios.get(getApi).then((response) => {
          setCategoryList(
            response.data.map((x) => ({
              id: x.id,
              name: x.name,
            }))
          );
        });
        // const list = await categoryApi.getAll();
        
      } catch (error) {
        console.log('Failed to fetch category list', error);
      }
    })();
  }, []);

  return (
    <FormControl fullWidth margin="normal" variant="outlined" error={hasError}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Controller
        name={name}
        control={form.control}
        render={({ field: { onChange, value, name } }) => (
          <Select
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            id={name}
            label={label}
          >
            {categoryList.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

export default SelectFieldBrand;
