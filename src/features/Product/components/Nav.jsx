// import React, { useState,useEffect } from 'react';
// import axios from 'axios'
// import {Link} from 'react-router-dom'
// import styles from '../product.module.css'
// import categoryApi from'api/categoryApi';
// import PropTypes from 'prop-types';
// // import styles from './slideBar.module.css'
// SliderBar.propTypes = {
//     onChange: PropTypes.func,
//   };
// function SliderBar({ onChange }) {
//     const [categoryList, setCategoryList] = useState([]);
//     useEffect(() => {
//       (async () => {
//         try {
//           const list = await categoryApi.getAll();
//           setCategoryList(
//             list.map((x) => ({
//               id: x.id,
//               name: x.categoryName,
//             }))
//           );
//         } catch (error) {
//           console.log('Failed to fetch category list', error);
//         }
//       })();
//     }, []);
//     const handleCategoryChange = (e) => {
//       if (onChange) {
//         onChange(e.target.value);
//       }
//     };
//     // useEffect(() => {
//     //   // const paramsString = queryString.stringify(filters);
//     //   const getApi = `https://api-mts.herokuapp.com/categories`;
//     //   axios.get(getApi).then((response) => {
//     //     setCategoryList(response.data);
//     //   });
//     // }, []);
    
//     return (
//             <div className={styles.grid__column2}>
//                        <nav className = {styles.category}>
//                          <h3 className={styles.category__heading}>
//                             <i className="fas fa-list category__heading-icon"></i>
//                             Danh mục
//                          </h3>
//                          <ul className={styles.category__list}>
//                           <li className={styles.category__items}>
//                               <Link to="#" className={styles.category__itemslink}>
//                                  <i className="fas fa-chevron-down"></i> 
//                                   Sản phẩm</Link>
//                           </li>
//                           {categoryList.map((item)=>(
//                                <li className={styles.category__items}>
//                                <Link  to="#" className={styles.category__itemslink}>
//                                <i  className = {item.categoryThumbnail}></i>
//                                {item.categoryName}
//                                </Link>
//                            </li>
//                           ))}    
//                       </ul>
//                        </nav>
//                    </div>
//     );
// }

// export default SliderBar;