import {
  Box,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, setQuantity } from './cartSlice';
import DetailCart from './components/DetailCart';
import ProductTotal from './components/ProductTotal';
import TotalCost from './components/TotalCost';
import NavBar from '../ProductDetail/components/Navbar/NavBar';
import styles from './index.module.css';
import axios from 'axios';
CartFeature.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(3),
  },
  left: {
    width: '920px',
    paddingRight: theme.spacing(1.5),
  },
  right: {
    width: '310px',
    padding: theme.spacing(1.5),
  },
}));

function CartFeature() {
  const [count, setCount] = useState();
  const [userId, setUserId] = useState();
  const [products, setProducts] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    setUserId(localStorage.getItem('userid'));
    var getApi = '';
    if (
      localStorage.getItem('userid') !== undefined &&
      localStorage.getItem('userid') !== null
    ) {
      getApi = `https://electronic-api.azurewebsites.net/Cart/GetCountProductByIdUser/${userId}`;
    } else {
      getApi = `https://electronic-api.azurewebsites.net/Cart/GetCountProductByIdUser/-1`;
    }
    axios.get(getApi).then((response) => {
      setCount(response.data);
    });
  }, [userId]);
  const handleRemoveFromCart = (productId) => {
    const action = removeFromCart(productId);
    dispatch(action);
  };

  const handleChangeQuantity = (products) => {
    setProducts(products);
  };

  return (
    <React.Fragment>
      <NavBar count={count} />
      <Box className={styles.box}>
        <Container>
          <Typography
            component="h1"
            variant="h5"
            style={{ marginBottom: '12px' }}
          >
            GIỎ HÀNG
          </Typography>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductTotal />
              <DetailCart
                onRemove={handleRemoveFromCart}
                onChange={handleChangeQuantity}
              />
            </Grid>
            <Paper elevation={0}>
              <Grid item className={classes.right}>
                <TotalCost products={products} />
              </Grid>
            </Paper>
          </Grid>
        </Container>
      </Box>
    </React.Fragment>
  );
}

export default CartFeature;
