import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, makeStyles } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import InputField from 'components/form-controls/InputField';
import SelectField from 'components/form-controls/SelectField';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';

UpdateProductForm.propTypes = {
  onSubmit: PropTypes.func,
  onRemove: PropTypes.func,
  product: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(4),
    width: '500px',
  },

  avatar: {
    margin: '0 auto',
    backgroundColor: '#ff4a6b',
  },

  title: {
    margin: theme.spacing(2, 0, 3, 0),
    textAlign: 'center',
  },

  submit: {
    margin: theme.spacing(3, 0, 2, 0),
    display: 'flex',
    justifyContent: 'space-between',

    '& > button': {
      width: '240px',
    },
  },

  progress: {
    position: 'absolute',
    top: theme.spacing(1),
    right: 0,
    left: 0,
  },
}));

function UpdateProductForm({ onSubmit, onRemove, product }) {
  const classes = useStyles();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpened: false,
    title: '',
    subTitle: '',
  });

  const schema = yup.object().shape({
    productName: yup.string().required('Please enter product name.'),

    productThumbnail: yup
      .string()
      .required('Please enter url of product thumbnail.'),

    productDescription: yup
      .string()
      .required('Please enter product description.'),

    brand: yup.string().required('PLease enter product brand'),

    salePrice: yup.string().required('Please enter product price.'),
  });

  const form = useForm({
    defaultValues: {
      productName: product.productName,
      productThumbnail: product.productThumbnail,
      productDescription: product.productDescription,
      brand: product.brand,
      salePrice: product.salePrice,
      'category.id': product.category.id,
    },
    resolver: yupResolver(schema),
  });

  const handleUpdateProduct = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const handleRemoveProduct = async () => {
    if (onRemove) {
      setConfirmDialog({
        ...confirmDialog,
        isOpened: false,
      });
      await onRemove();
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}

      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>

      <h3 className={classes.title}>Update Product</h3>

      <form onSubmit={form.handleSubmit(handleUpdateProduct)}>
        <InputField name="productName" label="Name" form={form} />
        <InputField name="productThumbnail" label="Thumbnail URL" form={form} />
        <InputField name="productDescription" label="Description" form={form} />
        <InputField name="brand" label="Brand" form={form} />
        <InputField name="salePrice" label="Price" form={form} />
        <SelectField name="category.id" label="Category Type" form={form} />
        <div className={classes.submit}>
          <Button
            disabled={isSubmitting}
            type="button"
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => {
              setConfirmDialog({
                isOpened: true,
                title: 'Are you sure to delete this product?',
                subTitle: "You can't undo this operation",
                onConfirm: () => {
                  handleRemoveProduct();
                },
              });
            }}
          >
            Delete
          </Button>
          <Button
            disabled={isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Update
          </Button>
        </div>
      </form>
      <ConfirmationDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
}

export default UpdateProductForm;
