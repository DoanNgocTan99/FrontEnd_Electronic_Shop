import React from 'react';
import styles from './ErrorPage.module.css'
import { Link } from 'react-router-dom';
function ErrorPage(props) {
    return (
        <div className={styles.ErrorPage}>
            <div className={styles.heading}>
                OOPS!
            </div>
            <div className={styles.title}>
                404 -PAGE NOT FOUND
            </div>
            <Link to="/" className={styles.btn_homepage}>
              GO TO HOME PAGE
            </Link>
        </div>
    );
}

export default ErrorPage;