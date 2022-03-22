import React from 'react';
import PropTypes from 'prop-types';
import AddProductForm from '../AddProductForm/AddProductForm';
import { useSnackbar } from 'notistack';
import productApi from 'api/productApi';

AddProduct.propTypes = {
  closeDialog: PropTypes.func,
};

function AddProduct({ closeDialog }) {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const formValues = {
        ...values,
        salePrice: Number.parseInt(values.salePrice),
      };

      await productApi.add(formValues);

      if (closeDialog) {
        closeDialog();
      }

      enqueueSnackbar('Create new product successfully.', {
        variant: 'success',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top',
        },
      });
    } catch (error) {
      console.log('Failed to add: ', error);
      enqueueSnackbar(error.message, {
        variant: 'error',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top',
        },
      });
    }
  };

  return (
    <div>
      <AddProductForm onSubmit={handleSubmit} />
    </div>
  );
}

export default AddProduct;
