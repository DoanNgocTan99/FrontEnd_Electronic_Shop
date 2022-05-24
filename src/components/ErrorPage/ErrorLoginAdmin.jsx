import React from 'react';
import styles from './ErrorPage.module.css'
import { Link } from 'react-router-dom';
function ErrorLoginAdmin(props) {
  return (
    <div className={styles.ErrorPage}>
      <div className={styles.heading}>OOPS!</div>
      <div className={styles.title}>404 -Can't Login Page Admin</div>
      <Link to="/" className={styles.btn_homepage}>
        GO TO HOME PAGE
      </Link>
    </div>
  );
}

export default ErrorLoginAdmin;