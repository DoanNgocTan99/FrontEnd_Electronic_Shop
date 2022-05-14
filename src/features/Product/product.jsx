import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import styles from './product.module.css';
import SliderBar from './components/Nav';
import ProductList from './components/ProductList';
import NavBar from 'components/Header';
import Slider from './components/Slider/Slider';
import Coupon from './components/Coupon/Coupon';
import Footer from './components/Footer/Footer';
import { Pagination } from '@material-ui/lab';
import productApi from 'api/productApi';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import ProductFilters from './components/ProductFilters/ProductFilter';
import ClipLoader from 'react-spinners/ClipLoader';
import ProductSkeletonList from './ProductSkeletonList';
import StorageUser from 'constants/storage-user';
import { Provider } from 'react-redux';

const limit = 15;

function Product(props) {
  const [productList, setProductList] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [productFilter, setProductFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const pageCount = Math.ceil(productFilter.length / limit);
  // function compare(a, b) {
  //   if (a.last_nom < b.last_nom) {
  //     return -1;
  //   }
  //   if (a.last_nom > b.last_nom) {
  //     return 1;
  //   }
  //   return 0;
  // }

  // objs.sort(compare);
  useEffect(() => {
    const getApi = 'https://localhost:44306/Product';
    axios.get(getApi).then((response) => {
      setProduct(response.data);
      setProductFilter(response.data);
    });
  }, []);

  const handleChange = useCallback(
    (_, value) => {
      const newProductList = productFilter.slice(
        (value - 1) * limit,
        (value - 1) * limit + limit
      );
      setProductList(newProductList);
      setCurrentPage(value);
    },
    [productFilter]
  );

  useEffect(() => {
    handleChange(null, 1);
  }, [productFilter, handleChange]);

  const handleFiltersChange = (newFilters) => {
    if (typeof newFilters === 'object') {
      console.log(newFilters.productName_contains);
      if (newFilters._sort === 'salePrice:ASC') {
        const productAfterFilter1 = [...productFilter].sort((a, b) => {
          return a.product_Price - b.product_Price;
        });
        setProductFilter(productAfterFilter1);
      } else if (newFilters._sort === 'salePrice:DESC') {
        const productAfterFilter2 = [...productFilter].sort((a, b) => {
          return b.product_Price - a.product_Price;
        });
        setProductFilter(productAfterFilter2);
      } else if (newFilters.productName_contains === '') {
        setProductFilter(product);
      } else {
        const productAfterFilter3 = productFilter.filter((prd) => {
          return prd.name.includes(newFilters.productName_contains);
        });
        setProductFilter(productAfterFilter3);
      }
    } else {
      const productAfterFilter = product.filter((prd) => {
        return prd.categoryId === newFilters;
      });
      setProductFilter(productAfterFilter);
    }
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
          <Slider />
          <Coupon />
          <ProductFilters onChange={handleFiltersChange} />
          <div className={styles.container}>
            <div className={styles.grid}>
              <div className={styles.grid__row}>
                {/* <SliderBar /> */}
                {loading ? (
                  <ProductSkeletonList length={12} />
                ) : (
                  <ProductList data={productList} />
                )}
              </div>
              <div className="product__pagination">
                {/* {pageCount > 0  && (
                  <Pagination
                    color="primary"
                    count={Math.ceil(productFilter.length / limit)}
                    page={currentPage}
                    onChange={handleChange}
                  />
                )} */}
                {pageCount > 0 ? (
                  <Pagination
                    color="primary"
                    count={Math.ceil(productFilter.length / limit)}
                    page={currentPage}
                    onChange={handleChange}
                  />
                ) : (
                  'Chưa có sản phẩm nào!!!'
                )}
              </div>
            </div>
          </div>
          <Footer />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Product;
