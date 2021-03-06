import productApi from 'api/productApi';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import UpdateProductForm from '../UpdateProductForm/UpdateProductForm';
import axios from 'axios';

UpdateProduct.propTypes = {
  closeDialog: PropTypes.func,
  product: PropTypes.object,
};

function UpdateProduct({ closeDialog, product }) {
  const { enqueueSnackbar } = useSnackbar();

  const handleUpdate = async (values) => {
    try {
      // const formValues = {
      //   ...values,
      //   product_Price: Number.parseInt(values.product_Price),
      //   id: product.id,
      // };
      console.log(values);
      const getApi = `https://electronicshop-tandn.azurewebsites.net/Product/Update/${product.id}`;
      axios.put(getApi, values).then((response) => {});

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
      // await productApi.remove(product.id);
      const getApi = `https://electronicshop-tandn.azurewebsites.net/Product/${product.id}`;
      axios.delete(getApi).then((response) => {});
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
