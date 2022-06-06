import CustomerApi from 'api/customerApi';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import AddCustomerForm from '../AddCustomerForm/AddCustomerForm';

AddCustomer.propTypes = {
  closeDialog: PropTypes.func,
};

function AddCustomer({ closeDialog }) {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      console.log(values);
      await CustomerApi.add(values);

      if (closeDialog) {
        closeDialog();
      }

      enqueueSnackbar('Create new Customer successfully.', {
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
      <AddCustomerForm onSubmit={handleSubmit} />
    </div>
  );
}

export default AddCustomer;
