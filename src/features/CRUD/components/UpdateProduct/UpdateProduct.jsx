import productApi from 'api/productApi';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import UpdateProductForm from '../UpdateProductForm/UpdateProductForm';

UpdateProduct.propTypes = {
  closeDialog: PropTypes.func,
  product: PropTypes.object,
};

function UpdateProduct({ closeDialog, product }) {
  const { enqueueSnackbar } = useSnackbar();

  const handleUpdate = async (values) => {
    try {
      const formValues = {
        ...values,
        salePrice: Number.parseInt(values.salePrice),
        id: product.id,
      };

      await productApi.update(formValues);

      if (closeDialog) {
        closeDialog();
      }

      enqueueSnackbar('Update product successfully.', {
        variant: 'success',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top',
        },
      });
    } catch (error) {
      console.log('Failed to update: ', error);
      enqueueSnackbar(error.message, {
        variant: 'error',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top',
        },
      });
    }
  };

  const handleRemove = async () => {
    try {
      await productApi.remove(product.id);

      if (closeDialog) {
        closeDialog();
      }

      enqueueSnackbar('Delete product successfully.', {
        variant: 'success',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top',
        },
      });
    } catch (error) {
      console.log('Failed to delete: ', error);
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
      <UpdateProductForm
        onSubmit={handleUpdate}
        onRemove={handleRemove}
        product={product}
      />
    </div>
  );
}

export default UpdateProduct;
