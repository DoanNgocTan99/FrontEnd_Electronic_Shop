import React, { useEffect, useState } from 'react';
import ProductInfor from './components/ProductInfor/ProductInfor';
import { Link } from 'react-router-dom';
import ProductRelated from './components/ProductRelated/ProductRelated';
import styles from './ProductDetail.module.css';
import NavBar from './components/Navbar/NavBar';
import Footer from 'features/Product/components/Footer/Footer';
import ClipLoader from 'react-spinners/ClipLoader';
import { useParams } from 'react-router-dom';
import axios from 'axios';
function ProductDetail(props) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const [product, setproduct] = useState(null);
  const { id } = useParams();
  const [count, setCount] = useState();
  useEffect(() => {
    var getApii = '';
    if (id) {
      const getApi = `https://electronic-api.azurewebsites.net/Product/${id}`;
      axios.get(getApi).then((response) => {
        setproduct(response.data);
      });
      if (
        localStorage.getItem('userid') !== undefined ||
        localStorage.getItem('userid') !== null
      ) {
        const userId = localStorage.getItem('userid');
        getApii = `https://electronic-api.azurewebsites.net/Cart/GetCountProductByIdUser/${localStorage.getItem(
          'userid'
        )}`;
        axios.get(getApii).then((response) => {
          setCount(response.data);
        });
      } else {
        getApii = `https://electronic-api.azurewebsites.net/Cart/GetCountProductByIdUser/-1`;
        axios.get(getApii).then((response) => {
          setCount(response.data);
        });
      }
    }
  }, [id]);

  const changeCountHandler = (quantity) => {
    setCount((prev) => prev + quantity);
  };

  return (
    <React.Fragment>
      <title>Detail Product</title>

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
          <NavBar count={count} />
          <div className={styles.container_productDetails}>
            <div className={styles.grid__row}>
              <div className={styles.grid__column5}>
                <div className={styles.back_btn}>
                  <Link to={'/'} className={styles.btn_back}>
                    <i className="fas fa-arrow-left"></i>
                    Back
                  </Link>
                </div>
                <img src={product?.avt} alt="" className={styles.product_img} />
              </div>
              <div className={styles.grid__column5}>
                <ProductInfor changeCount={changeCountHandler} />
              </div>
              <div className={styles.RelatedWapper}>
                <ProductRelated
                  proDetail={[product?.id, product?.categoryName]}
                />
              </div>
            </div>
          </div>
          <Footer />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default ProductDetail;
