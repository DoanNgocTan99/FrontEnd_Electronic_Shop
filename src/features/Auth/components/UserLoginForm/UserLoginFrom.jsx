import { yupResolver } from '@hookform/resolvers/yup';
import { Button, makeStyles } from '@material-ui/core';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import StorageUser from 'constants/storage-user';
import { setAvatar } from 'features/Auth/authSlice';
import PropTypes from 'prop-types';
import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import styles from './UserLoginForm.module.css';
UserLoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },

  submit: {
    marginTop: theme.spacing(2),
    backgroundColor: '#00C58D',
    '&:hover': {
      backgroundColor: '#161F6A',
    },
  },

  title: {
    color: '#161F6A',
    marginTop: theme.spacing(2),
  },
}));

function UserLoginForm({ onSubmit = null }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    identifier: yup
      .string()
      .required('Please enter your email.')
      .email('Please enter a valid email address.'),
    password: yup.string().required('Please enter your password.'),
  });

  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const responseFacebook = (response) => {
    if (response.status !== 'unknown') {
      dispatch(setAvatar(response.picture.data.url));

      localStorage.setItem(StorageUser.TOKEN, response.accessToken);
      localStorage.setItem(StorageUser.USER, response.name);

      history.push('/');
    }
  };

  const { isSubmitting } = form.formState;
  return (
    <div className={styles.loginForm}>
      <form
        className={styles.filter_products}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className={styles.form_inner}>
          <h2 className={styles.title}>Login</h2>
          <InputField name="identifier" label="Email" form={form} />
          <PasswordField name="password" label="Password" form={form} />
          <Button
            className={classes.submit}
            disabled={isSubmitting}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
          >
            Sign In
          </Button>
        </div>
        <div className={styles.text_center}>
          <span>Or Sign Up Using</span>
        </div>
        <div className={styles.icon}>
          <div className={styles.social_media}>
            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_APP_ID}
              autoLoad={true}
              fields="name,picture"
              callback={responseFacebook}
              icon="fab fa-facebook-f"
              cssClass={styles.fb_btn}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserLoginForm;
