import categoryApi from 'api/categoryApi';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import AddCategoryForm from '../AddCategoryForm/AddCategoryForm';

AddCategory.propTypes = {
  closeDialog: PropTypes.func,
};

function AddCategory({ closeDialog }) {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      await categoryApi.add(values);

      if (closeDialog) {
        closeDialog();
      }

      enqueueSnackbar('Create new category successfully.', {
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
      <AddCategoryForm onSubmit={handleSubmit} />
    </div>
  );
}

export default AddCategory;
