import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { formatPrice } from 'utils';
import styles from './ProductRelated.module.css';
import { Link } from 'react-router-dom';
function ProductRelated(props) {
  const [products, setProducts] = useState([]);
  const filters = {
    _limit: 5,
    _start: 10,
  };
  useEffect(() => {
    const paramsString = queryString.stringify(filters);
    // const getApi = `https://api-mts.herokuapp.com/products?${paramsString}`;
    const getApi = `https://localhost:44306/Product/roductRelated`;
    axios.get(getApi).then((response) => {
      setProducts(response.data);
    });
  });
  return (
    <div className={styles}>
      <div className={styles.header}>Sản phẩm liên quan</div>
      <div className={styles.grid__column10}>
        <div className={styles.home__product}>
          <div className={styles.grid__row}>
            {products.map((item) => (
              <div className={styles.grid__column24}>
                <Link
                  to={`/productDetails/${item.id}`}
                  className={styles.home__productitems}
                >
                  <div
                    className={styles.home__productitemsimg}
                    style={{ backgroundImage: `url(${item.path})` }}
                  ></div>
                  <h4 className={styles.home__productitemsname}>
                    {item.name}
                  </h4>
                  <div className={styles.home__productprice}>
                    <span className={styles.home__productitemsprice}>
                      {formatPrice(item.product_Price)}
                    </span>
                    <div className={styles.btn_cart}>
                      <i class="fas fa-search"></i>
                      Details
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductRelated;
