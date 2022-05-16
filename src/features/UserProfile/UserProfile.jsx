import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
import styles from './UserProfile.module.css';
// import * as Yup from 'yup';
import NavBar from 'features/ProductDetail/components/Navbar/NavBar';
import Footer from 'features/Product/components/Footer/Footer';
import ClipLoader from 'react-spinners/ClipLoader';
import axios from 'axios';
import { Snackbar, TextField } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
function UserProfile(props) {
  const [user, setUser] = useState({});
  const [id, setId] = useState(0);
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [userName, setUserName] = useState();
  const [gender, setGender] = useState();
  const [dob, setDob] = useState();
  const [address, setAddress] = useState();
  const [imageFile, setImageFile] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mess, setMess] = useState(true);

  const options = [
    {
      label: 'Nam',
      value: 'Nam',
    },
    {
      label: 'Nu',
      value: 'Nu',
    },
    {
      label: 'Khac',
      value: 'Khac',
    },
  ];
  let messageError = 'Không cập nhập thành công';
  let messageSuccess = 'Cập nhập thông tin thành công';
  let formData = new FormData();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 6000);
  }, []);

  useEffect(() => {
    setId(localStorage.getItem('userid'));
    const getApi = `https://localhost:44306/User/${id}`;
    axios.get(getApi).then((response) => {
      setUser(response.data);
      setFullName(response.data.fullName);
      setEmail(response.data.email);
      setPhone(response.data.phone);
      setUserName(response.data.userName);
      setGender(response.data.gender);
      setDob(response.data.dob);
      setAddress(response.data.address);
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('userName', userName);
    formData.append('gender', gender);
    formData.append('dob', dob);
    formData.append('address', address);
    formData.append('imageFile', imageFile);

    const getApi = `https://localhost:44306/User/Update/${id}`;
    axios.put(getApi, formData).then((response) => {
      if (response.status === 200) {
        setMess(true);
        setOpen(true);
      } else {
        setMess(false);
        setOpen(true);
      }
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
  const handleChangeSelect = (e) => {
    setGender(e.target.value);
  };
  return (
    <React.Fragment>
      {loading ? (
        <div className={styles.sweet_loading}>
          <ClipLoader
            color={'#F5A623'}
            loading={loading}
            // css={override}
            size={40}
          />
          <span>Please Wait</span>
        </div>
      ) : (
        <React.Fragment>
          <NavBar />
          <div className={styles.container_productDetails}>
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
              <Alert
                onClose={handleClose}
                severity={mess ? 'success' : 'error'}
              >
                {mess ? messageSuccess : messageError}
              </Alert>
            </Snackbar>
            <div className={styles.grid__row}>
              <div className={styles.grid__column5}>
                <div className={styles.back_btn}>
                  <Link to={'/'} className={styles.btn_back}>
                    <i
                      className="fas fa-arrow-left"
                      style={{ 'padding-right': '5px' }}
                    ></i>
                    Back
                  </Link>
                </div>
                <div className={styles.row}>
                  <div className={styles.col_75}>
                    <div className={styles.container}>
                      <h2 style={{ 'margin-bottom': '20px' }}>
                        PROFILE SETTINGS
                      </h2>
                      <form
                        encType="multipart/form-data"
                        onSubmit={handleSubmit}
                        id="UserProfile"
                        name="UserProfile"
                      >
                        <div className={styles.row}>
                          <div className={styles.col_50}>
                            {/* <h3>Billing Address</h3> */}
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

                          <div className={styles.col_50}>
                            <img
                              className={styles.avt}
                              src={user.imagePath}
                              alt="avatar"
                            />
                            <br />
                            <input
                              type="file"
                              name="imageFile"
                              onChange={(e) => {
                                setImageFile(e.target.files[0]);
                              }}
                            />
                            <label
                              for="gender"
                              style={{ 'padding-top': '50px' }}
                            >
                              <i className="fa fa-transgender"></i> Gender
                            </label>
                            <select
                              id="gender"
                              name="gender"
                              value={gender}
                              onChange={handleChangeSelect}
                            >
                              {options.map((option) => (
                                <option value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>

                            <label for="dob" style={{ 'padding-top': '50px' }}>
                              <i className="fa fa-birthday-cake"></i> Day of
                              birth
                            </label>
                            <TextField
                              type="date"
                              id="gender"
                              name="gender"
                              value={dob}
                              placeholder="John M. Doe"
                              onChange={(e) => {
                                setDob(e.target.value.format);
                              }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </div>
                        </div>
                        <input
                          type="submit"
                          value="Update"
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
      )}
    </React.Fragment>
  );
}

export default UserProfile;
