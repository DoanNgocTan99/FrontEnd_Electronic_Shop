import categoryApi from 'api/categoryApi';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import UpdateCategoryForm from '../UpdateCategoryForm/UpdateCategoryForm';

UpdateCategory.propTypes = {
  closeDialog: PropTypes.func,
  category: PropTypes.object,
};

function UpdateCategory({ closeDialog, category }) {
  const { enqueueSnackbar } = useSnackbar();

  const handleUpdate = async (values) => {
    try {
      const formValues = {
        ...values,
        id: category.id,
      };

      await categoryApi.update(formValues);

      if (closeDialog) {
        closeDialog();
      }

      enqueueSnackbar('Update category successfully.', {
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
      <UpdateCategoryForm onSubmit={handleUpdate} category={category} />
    </div>
  );
}

export default UpdateCategory;
