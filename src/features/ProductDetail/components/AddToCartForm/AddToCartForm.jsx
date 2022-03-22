import { yupResolver } from '@hookform/resolvers/yup';
import QuantityField from 'components/form-controls/QuantityField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import styles from './AddToCartForm.module.css';

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCartForm({ onSubmit = null }) {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required('Please enter quantity')
      .min(1, 'Minimum value is 1')
      .typeError('Please enter a number'),
  });

  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className={styles.title}>Số lượng</div>
      <QuantityField name="quantity" form={form} />
      <button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        className={styles.btn_cart}
      >
        <i class="fas fa-shopping-cart"></i>
        Add to Cart
      </button>
    </form>
  );
}

export default AddToCartForm;
