// import SearchForm from 'components/Header/components/SearchForm';
import React, { useState, useEffect } from 'react';
import styles from './NavBar.module.css';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from 'features/Auth/authSlice';
// import { useSelector } from 'react-redux';
// import { cartItemsCountSelector } from 'features/Cart/selectors';
import axios from 'axios';
function NavBar(props) {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState();
  const [avt, setAvt] = useState();

  const history = useHistory();
  const [isLogin, setIsLogin] = useState(false);
  // const cartItemsCount = useSelector(cartItemsCountSelector);
  const [cartItemsCount, setCartItemsCount] = useState([]);
  const CheckLogin = () => {
    if (localStorage.getItem('token') === null) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  };
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
  // useEffect(() => {
  //   setUserId(localStorage.getItem('userid'));
  //   setAvt(localStorage.getItem('avarta'));
  //   var getApi = '';
  //   if (userId !== undefined) {
  //     getApi = `https://electronicshop-tandn.azurewebsites.net/Cart/GetCountProductByIdUser/${userId}`;
  //   } else {
  //     getApi = `https://electronicshop-tandn.azurewebsites.net/Cart/GetCountProductByIdUser/-1`;
  //   }
  //   axios.get(getApi).then((response) => {
  //     CheckLogin();
  //   });
  // });

  useEffect(() => {
    setUserId(localStorage.getItem('userid'));
    setAvt(localStorage.getItem('avarta'));
    CheckLogin();
    if (props.count === undefined) {
      if (userId === undefined) {
        var getApi = '';
        getApi = `https://electronicshop-tandn.azurewebsites.net/Cart/GetCountProductByIdUser/${userId}`;
      } else {
        console.log('response.data');
        getApi = `https://electronicshop-tandn.azurewebsites.net/Cart/GetCountProductByIdUser/-1`;
      }
      axios.get(getApi).then((response) => {
        setCartItemsCount(response.data);
      });
    } else {
      setCartItemsCount(props.count);
    }
  }, [props.count]);
  return (
    <div className={styles.navBar}>
      <Link to={'/'} className={styles.header}>
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
            alt=""
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
