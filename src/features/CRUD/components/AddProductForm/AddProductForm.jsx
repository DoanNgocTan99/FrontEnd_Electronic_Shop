import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, makeStyles } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import InputField from 'components/form-controls/InputField';
import SelectField from 'components/form-controls/SelectField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

AddProductForm.propTypes = {
  onSubmit: PropTypes.func,
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
    color: 'white',
    backgroundColor: '#349eff',

    '&:hover': {
      backgroundColor: '#62b4ff',
    },
  },

  progress: {
    position: 'absolute',
    top: theme.spacing(1),
    right: 0,
    left: 0,
  },
}));

function AddProductForm({ onSubmit }) {
  const classes = useStyles();
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
      productName: '',
      productThumbnail: '',
      productDescription: '',
      brand: '',
      salePrice: '',
      'category.id': '',
    },
    resolver: yupResolver(schema),
  });

  const handleAddProduct = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}

      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>

      <h3 className={classes.title}>Add New Product</h3>

      <form onSubmit={form.handleSubmit(handleAddProduct)}>
        <InputField name="productName" label="Name" form={form} />
        <InputField name="productThumbnail" label="Thumbnail URL" form={form} />
        <InputField name="productDescription" label="Description" form={form} />
        <InputField name="brand" label="Brand" form={form} />
        <InputField name="salePrice" label="Price" form={form} />
        <SelectField name="category.id" label="Category Type" form={form} />
        <Button
          className={classes.submit}
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          fullWidth
          size="large"
        >
          Create Product
        </Button>
      </form>
    </div>
  );
}

export default AddProductForm;
