import paymentApi from 'api/paymentApi';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import UpdatePaymentForm from '../UpdatePaymentForm/UpdatePaymentForm';

UpdatePayment.propTypes = {
  closeDialog: PropTypes.func,
  payment: PropTypes.object,
};

function UpdatePayment({ closeDialog, payment }) {
  const { enqueueSnackbar } = useSnackbar();

  const handleUpdate = async (values) => {
    try {
      const formValues = {
        ...values,
        id: payment.id,
      };

      await paymentApi.update(formValues);

      if (closeDialog) {
        closeDialog();
      }

      enqueueSnackbar('Update payment successfully.', {
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

  return (
    <div>
      <UpdatePaymentForm onSubmit={handleUpdate} payment={payment} />
    </div>
  );
}

export default UpdatePayment;
