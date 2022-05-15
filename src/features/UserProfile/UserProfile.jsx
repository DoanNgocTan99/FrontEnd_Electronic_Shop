import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './UserProfile.module.css';
import * as Yup from 'yup';
import NavBar from 'features/ProductDetail/components/Navbar/NavBar';
import Footer from 'features/Product/components/Footer/Footer';
import ClipLoader from 'react-spinners/ClipLoader';
import axios from 'axios';
function UserProfile(props) {
  // const validationSchema = Yup.object().shape({
  //   fullName: Yup.string().required('Title is required'),
  //   address: Yup.string().required('First Name is required'),
  //   lastName: Yup.string().required('Last Name is required'),
  //   email: Yup.string().email('Email is invalid').required('Email is required'),
  // });

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   setValue,
  //   getValues,
  //   errors,
  //   formState,
  // } = useForm({
  //   resolver: yupResolver(validationSchema),
  // });
  const [user, setUser] = useState({});
  const [id, setId] = useState(0);
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [userName, setUserName] = useState();
  const [gender, setGender] = useState();
  const [dob, setDob] = useState();
  const [address, setAddress] = useState();

  const [loading, setLoading] = useState(false);
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
    console.log('UPDATEEE');
    const value = {
      FullName: fullName,
      UserName: userName,
      Email: email,
      Phone: phone,
      Gender: gender,
      Dob: dob,
      Address: address,
      modifiedBy: localStorage.getItem('user-infor'),
      modifiedDate: Date.now,
      // imagePath: 'string',
    };
    console.log(value);
    const getApi = `https://localhost:44306/User/Update/${id}`;
    axios.put(getApi, value).then((response) => {
      // setUser(response.data);
      console.log(response.data);
    });
    e.preventDefault();
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
                      <form onSubmit={handleSubmit}>
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
                              <i className="fa fa-envelope"></i> User Name
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
                            <label for="email">
                              <i className="fa fa-address-card-o"></i> Email
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
                              <i className="fa fa-institution"></i> Phone
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
                            <label for="gender">
                              <i className="fa fa-user"></i> Gender
                            </label>
                            <select
                              id="gender"
                              name="gender"
                              // value={user.gender}
                            >
                              <option value="nam">Nam</option>
                              <option value="nữ">Nữ</option>
                              <option value="khác">Khác</option>
                            </select>

                            <label for="dob">
                              <i className="fa fa-user"></i> Day of birth
                            </label>
                            <input
                              type="date"
                              id="gender"
                              name="gender"
                              value={dob}
                              placeholder="John M. Doe"
                              onChange={(e) => {
                                setGender(e.target.value);
                              }}
                            />
                            <label
                              style={{ 'margin-top': '40px' }}
                              for="address"
                            >
                              <i className="fa fa-user"></i> Address
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
