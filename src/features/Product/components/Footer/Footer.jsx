import React from 'react';
import styles from './Footer.module.css'
import {Link} from 'react-router-dom'
function Footer(props) {
    return (
            <footer className={styles.footer}>
            <div className={styles.grid}>
                <div className={styles.grid__row}>
                    <div className={styles.grid__column24}>
                        <h3 className={styles.footer__heading}>Chăm sóc khách hàng</h3>
                        <ul className={styles.footer__list}>
                            <li className={styles.footer__items}>
                                <Link to ="" className={styles.footer__link}>Trung tâm trợ giúp</Link>
                            </li>
                            <li className={styles.footer__items}>
                                <Link to ="" className={styles.footer__link}>Multishop</Link>
                            </li>
                            <li className={styles.footer__items}>    
                                <Link to ="" className={styles.footer__link}>Hướng dẫn mua hàng</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.grid__column24}>
                        <h3 className={styles.footer__heading}>Giới thiệu</h3>
                        <ul className={styles.footer__list}>
                            <li className={styles.footer__items}>
                                <Link to ="" className={styles.footer__link}>Giới thiệu</Link>
                            </li>
                            <li className={styles.footer__items}>    
                                <Link to ="" className={styles.footer__link}>Tuyển dụng</Link>
                            </li>
                            <li className={styles.footer__items}>    
                                <Link to ="" className={styles.footer__link}>Điều khoản</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.grid__column24}>
                        
                    </div>
                    <div className={styles.grid__column24}>
                        <h3 className={styles.footer__heading}>Theo dõi chúng tôi trên</h3>
                        <ul className={styles.footer__list}>
                            <li className={styles.footer__items}>
                                <Link to ="" className={styles.footer__link}>
                                    <i className="fab fa-facebook"></i>
                                    Facebook</Link>
                            </li>
                            <li className={styles.footer__items}>                                 
                                <Link to ="" className={styles.footer__link}>
                                    <i className="fab fa-instagram"></i>
                                    Insta</Link>
                            </li>
                            <li className={styles.footer__items}>        
                                <Link to ="" className={styles.footer__link}>
                                    <i className="fab fa-google"></i>
                                    Google</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.grid__column24}>
                        <h3 className={styles.footer__heading}>Vào cửa hàng trên ứng dụng</h3>
                        <div className={styles.footer__img}>
                            <img src="/assets/img/qr-code.png" className={styles.footer__imgqr} alt=""/>
                            <div className={styles.footer__imgapp}>
                                <Link to ="" className={styles.footer__imgapplink }>
                                    <img src="/assets/img/app-store.png " className={styles.footer__imgstore} alt=""/>
                                </Link>
                                <Link to ="" className={styles.footer__imgapplink}> 
                                    <img src="/assets/img/googleplay.png " className={styles.footer__imgggplay} alt=""/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;