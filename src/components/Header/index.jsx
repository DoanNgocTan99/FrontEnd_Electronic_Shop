import React, { useState, useEffect } from 'react';
import './index.css';
import { Link, useHistory } from 'react-router-dom';
import styles from './Cart.module.css';
import { useDispatch } from 'react-redux';
import { logoutUser } from 'features/Auth/authSlice';
import { useSelector } from 'react-redux';
import { cartItemsCountSelector } from 'features/Cart/selectors';
import axios from 'axios';

function NavBar() {
  const dispatch = useDispatch();
  const [navBar, setNavBar] = useState(false);
  const history = useHistory();
  const [cartItemsCount, setCartItemsCount] = useState([]);
  const [userId, setUserId] = useState();
  const [avt, setAvt] = useState();
  // const cartItemsCount = useSelector(cartItemsCountSelector);
  const avatarUrl = useSelector((state) => state.admin.avatarUrl);
  // const isLogin =
  //   useSelector((state) => state.admin.current) === null ? false : true;
  const [isLogin, setIsLogin] = useState(false);
  const CheckLogin = () => {
    if (localStorage.getItem('token') === null) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  };
  const changeBackgroundColor = () => {
    if (window.scrollY >= 400) {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  };
  useEffect(() => {
    debugger;
    setAvt(localStorage.getItem('avarta'));
    var getApi = '';
    if (
      localStorage.getItem('userid') !== undefined &&
      localStorage.getItem('userid') !== null
    ) {
      setUserId(localStorage.getItem('userid'));
      getApi = `https://electronic-api.azurewebsites.net/Cart/GetCountProductByIdUser/${userId}`;
    } else {
      getApi = `https://electronic-api.azurewebsites.net/Cart/GetCountProductByIdUser/-1`;
    }
    axios.get(getApi).then((response) => {
      setCartItemsCount(response.data);
    });
    CheckLogin();
  }, []);
  const handleLogout = () => {
    setIsLogin(false);
    const action = logoutUser();
    dispatch(action);
    history.push('/');
  };
  const handleLogin = () => {
    history.push('/login1');
    setIsLogin(true);
  };
  const handleUserProfile = () => {
    history.push('/userProfile');
  };
  window.addEventListener('scroll', changeBackgroundColor);

  return (
    <div className={navBar ? 'navBar active ' : 'navBar '}>
      <Link to={'/'} className="header">
        Electronic Shop
      </Link>
      <div className={styles.navbar_right}>
        <Link to="/cart">
          <div className={styles.navbar__cart}>
            <i className={`${styles.cart__image} fas fa-shopping-cart`}></i>
            <div className={styles.cart__counter}>
              {userId ? cartItemsCount : 0}
            </div>
          </div>
        </Link>
        <li className={styles.nav__itemsaccount}>
          <img
            src={
              avt ||
              'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg'
            }
            alt="Ảnh đại diện"
            className={styles.img}
          />
          <ul className={styles.nav__itemsmenu}>
            {isLogin && (
              <>
                <li className={styles.nav__menuitems}>
                  <div onClick={handleUserProfile} href="">
                    Tài khoản của tôi
                  </div>
                </li>
                <li className={styles.nav__menuitems}>
                  <div href="">Đơn mua</div>
                </li>
              </>
            )}
            <li className={styles.nav__menuitems}>
              {isLogin ? (
                <>
                  <div onClick={handleLogout}>Đăng xuất</div>
                </>
              ) : (
                <>
                  <div onClick={handleLogin}>Đăng nhập</div>
                </>
              )}
            </li>
          </ul>
        </li>
      </div>
    </div>
  );
}

export default NavBar;
