import { Pagination } from '@material-ui/lab';
// import productApi from 'api/productApi';
// import queryString from 'query-string';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import { useHistory, useLocation } from 'react-router-dom';
import './Product.scss';
import ProductFilters from './ProductFilters';
import ProductList from './ProductList';
import ProductSkeletonList from './ProductSkeletonList';
import axios from 'axios';

const limit = 15;

function Product(props) {
  const [productList, setProductList] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [productFilter, setProductFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const pageCount = Math.ceil(productFilter.length / limit);

  useEffect(() => {
    const getApi = 'http://tandn97-001-site1.itempurl.com/Product';
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
    <div className="product">
      <ProductFilters onChange={handleFiltersChange} />
      {loading ? (
        <ProductSkeletonList length={12} />
      ) : (
        <ProductList data={productList} />
      )}
      <div className="product__pagination">
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
  );
}

export default Product;
