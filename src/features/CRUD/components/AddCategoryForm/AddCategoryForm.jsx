import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, makeStyles } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import InputField from 'components/form-controls/InputField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

AddCategoryForm.propTypes = {
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

function AddCategoryForm({ onSubmit }) {
  const classes = useStyles();
  const schema = yup.object().shape({
    categoryName: yup.string().required('Please enter category name.'),

    categoryThumbnail: yup
      .string()
      .required('Please enter class of category thumbnail.'),
  });

  const form = useForm({
    defaultValues: {
      categoryName: '',
      categoryThumbnail: '',
    },
    resolver: yupResolver(schema),
  });

  const handleAddCategory = async (values) => {
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

      <h3 className={classes.title}>Add New Category</h3>

      <form onSubmit={form.handleSubmit(handleAddCategory)}>
        <InputField name="categoryName" label="Name" form={form} />
        <InputField name="categoryThumbnail" label="Class" form={form} />
        <Button
          className={classes.submit}
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          fullWidth
          size="large"
        >
          Create Category
        </Button>
      </form>
    </div>
  );
}

export default AddCategoryForm;
