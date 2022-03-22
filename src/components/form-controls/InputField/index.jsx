import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

function InputField(props) {
  const { form, name, label } = props;
  const {
    formState: { errors },
  } = form;
  const hasError = errors[name];

  return (
    <div className="container">
      <Controller
        name={name}
        control={form.control}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <TextField
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            label={label}
            fullWidth
            variant="outlined"
            margin="normal"
            error={!!hasError}
            helperText={errors[name]?.message}
          />
        )}
      />
    </div>
  );
}

export default InputField;
