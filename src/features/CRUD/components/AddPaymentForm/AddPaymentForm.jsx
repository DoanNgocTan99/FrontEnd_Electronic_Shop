import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, makeStyles } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import InputField from 'components/form-controls/InputField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

AddPaymentForm.propTypes = {
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

function AddPaymentForm({ onSubmit }) {
  const classes = useStyles();
  const schema = yup.object().shape({
    name: yup.string().required('Please enter payment name.'),

    type: yup
      .string()
      .required('Please enter class of payment type.'),
  });

  const form = useForm({
    defaultValues: {
      name: '',
      type: '',
    },
    resolver: yupResolver(schema),
  });

  const handleAddpayment = async (values) => {
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

      <h3 className={classes.title}>Add New payment</h3>

      <form onSubmit={form.handleSubmit(handleAddpayment)}>
        <InputField name="name" label="Name" form={form} />
        <InputField name="type" label="Type" form={form} />
        <Button
          className={classes.submit}
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          fullWidth
          size="large"
        >
          Create payment
        </Button>
      </form>
    </div>
  );
}

export default AddPaymentForm;
