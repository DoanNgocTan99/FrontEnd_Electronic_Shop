import React, { useEffect, useState } from 'react';
import styles from './Register.module.css';
import Footer from 'features/Product/components/Footer/Footer';
import ClipLoader from 'react-spinners/ClipLoader';
import axios from 'axios';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Link, useHistory } from 'react-router-dom';
function Register(props) {
  const [userName, setUserName] = useState();
  const history = useHistory();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [fullName, setFullName] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mess, setMess] = useState(true);

  let messageError = 'Đăng kí tài khoản không thành công';
  let messageSuccess = 'Đăng kí tài khoản thành công';

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = {
      password: password,
      email: email,
      userName: userName,
      address: address,
      phone: phone,
      fullName: fullName,
    };

    const getApi = `https://electronic-api.azurewebsites.net/Accounts/register`;
    axios.post(getApi, value).then((response) => {
      console.log(response);
      if (response.status === 200) {
        setMess(true);
        setOpen(true);
        history.push('/login1');
      } else {
        setMess(false);
        setOpen(true);
      }
      window.location.reload();
    });
  };
  const Alert = (props) => (
    <MuiAlert elevation={6} variant="filled" {...props} />
  );
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  // const handleChangeSelect = (e) => {
  //   setGender(e.target.value);
  // };
  return (
    <React.Fragment>
      <title>Register</title>
      <React.Fragment>
        <div className={styles.container_productDetails}>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <Alert onClose={handleClose} severity={mess ? 'success' : 'error'}>
              {mess ? messageSuccess : messageError}
            </Alert>
          </Snackbar>
          <div className={styles.grid__row}>
            <div className={styles.grid__column5}>
              <div className={styles.row}>
                <div className={styles.col_75}>
                  <div className={styles.container}>
                    <h2 style={{ 'margin-bottom': '50px' }}>REGISTER</h2>
                    <form
                      encType="multipart/form-data"
                      onSubmit={handleSubmit}
                      id="Register"
                      name="Register"
                    >
                      <div className={styles.row}>
                        <div className={styles.col_50}>
                          <label for="fullName">
                            <i className="fa fa-user"></i> Full Name
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="John M. Doe"
                            value={fullName}
                            onChange={(e) => {
                              setFullName(e.target.value);
                            }}
                          />
                          <label for="passwork">
                            <i className="fa fa-user"></i> Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="*******"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                          <label for="userName">
                            <i className="fa fa-user"></i> User Name
                          </label>
                          <input
                            type="text"
                            id="userName"
                            name="userName"
                            placeholder="Your userName"
                            value={userName}
                            onChange={(e) => {
                              setUserName(e.target.value);
                            }}
                          />
                          <label for="address">
                            <i className="fa fa-address-card"></i> Address
                          </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="John M. Doe"
                            value={address}
                            onChange={(e) => {
                              setAddress(e.target.value);
                            }}
                          />
                          <label for="email">
                            <i className="fa fa-envelope"></i> Email
                          </label>
                          <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="username@gmail.com.vn"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                          <label for="phone">
                            <i className="fa fa-phone"></i> Phone
                          </label>
                          <input
                            type="text"
                            id="phone"
                            name="phone"
                            placeholder="079-960-0969"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <input
                        type="submit"
                        value="Create"
                        className={styles.btn}
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    </React.Fragment>
  );
}

export default Register;
