import paymentApi from 'api/paymentApi';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import AddPaymentForm from '../AddPaymentForm/AddPaymentForm';

AddPayment.propTypes = {
  closeDialog: PropTypes.func,
};

function AddPayment({ closeDialog }) {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      await paymentApi.add(values);

      if (closeDialog) {
        closeDialog();
      }

      enqueueSnackbar('Create new payment successfully.', {
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
      <AddPaymentForm onSubmit={handleSubmit} />
    </div>
  );
}

export default AddPayment;
