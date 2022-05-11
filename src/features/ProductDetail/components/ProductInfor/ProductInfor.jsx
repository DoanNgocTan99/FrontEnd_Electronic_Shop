import styles from '../../ProductDetail.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { formatPrice } from 'utils';
import { useParams } from 'react-router-dom';
import AddToCartForm from '../AddToCartForm/AddToCartForm';
import { useDispatch } from 'react-redux';
import { addToCart } from 'features/Cart/cartSlice';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

function ProductInfor(props) {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (id) {
      const getApi = `https://localhost:44306/Product/${id}`;
      axios.get(getApi).then((response) => {
        setProduct(response.data);
      });
    }
  }, [id]);
  const handleAddToCartForm = ({ quantity }) => {
    const action = addToCart({
      id: product.id,
      product,
      quantity,
    });
    dispatch(action);

    setOpen(true);
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleClose} severity="success">
          Thêm vào giỏ hàng thành công
        </Alert>
      </Snackbar>
      <h4 className={styles.ProductName}>{product?.name}</h4>
      <h5 className={styles.ProductBand}>{product?.brand}</h5>
      <p className={styles.ProductDescription}>{product?.description}</p>
      <div className={styles.ProductTable}>
        <div className={styles.ProductTableRow}>
          <span className={styles.ProductItem}>Brand</span>
          <span className={styles.ProductItem}>{product?.brand}</span>
        </div>
        <div className={styles.ProductTableRow}>
          <span className={styles.ProductItem}>Loại</span>
          <span className={styles.ProductItem}>{product?.categoryName}</span>
        </div>
        <div className={styles.ProductTableRow}>
          <span className={styles.ProductItem}>Nước</span>
          <span className={styles.ProductItem}>{product?.origin}</span>
        </div>
        <div className={styles.ProductTableRow}>
          <span className={styles.ProductItem}>Số lượng mua</span>
          <span className={styles.ProductItem}>{product?.views}</span>
        </div>
      </div>
      <div className={styles.ProductCartWapper}>
        <div className={styles.ProductPriceWapper}>
          {formatPrice(product?.product_Price)}
        </div>
        <AddToCartForm onSubmit={handleAddToCartForm} />
      </div>
    </div>
  );
}

export default ProductInfor;
