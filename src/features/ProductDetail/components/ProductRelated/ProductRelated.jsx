import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import queryString from 'query-string';
import { formatPrice } from 'utils';
import styles from './ProductRelated.module.css';
import { Link } from 'react-router-dom';
function ProductRelated(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const paramsString = {
      idProduct: props.proDetail[0],
      categoryName: props.proDetail[1],
    };
    debugger;
    if (
      localStorage.getItem('userid') !== undefined &&
      localStorage.getItem('userid') !== null
    ) {
      const getApi = `https://electronic-api.azurewebsites.net/Rating/${localStorage.getItem(
        'userid'
      )}`;
      axios.get(getApi).then((response) => {
        setProducts(response.data);
      });
    } else {
      const getApi = `https://electronic-api.azurewebsites.net/Rating/1`;
      axios.get(getApi).then((response) => {
        setProducts(response.data);
      });
    }
  }, [props.proDetail[0]]);

  return (
    <div className={styles}>
      <div className={styles.header}>Sản phẩm được đề xuất</div>
      <div className={styles.grid__column10}>
        <div className={styles.home__product}>
          <div className={styles.grid__row}>
            {products.map((item, index) => (
              <div className={styles.grid__column24} key={`item_${index}`}>
                <Link
                  to={`/productDetails/${item.id}`}
                  className={styles.home__productitems}
                >
                  <div
                    className={styles.home__productitemsimg}
                    style={{ backgroundImage: `url("${item.avt}")` }}
                  ></div>
                  <h4 className={styles.home__productitemsname}>{item.name}</h4>
                  <div className={styles.home__productprice}>
                    <span className={styles.home__productitemsprice}>
                      {formatPrice(item.product_Price)}
                    </span>
                    <div className={styles.btn_cart}>
                      <i className="fas fa-search"></i>
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
