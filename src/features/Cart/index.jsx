import {
  Box,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, setQuantity } from './cartSlice';
import DetailCart from './components/DetailCart';
import ProductTotal from './components/ProductTotal';
import TotalCost from './components/TotalCost';
import NavBar from '../ProductDetail/components/Navbar/NavBar'
import styles from "./index.module.css"
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
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    const action = removeFromCart(productId);
    dispatch(action);
  };

  const handleChangeQuantity = (product) => {
    const action = setQuantity(product);
    dispatch(action);
  };

  return (
    <React.Fragment>
    <NavBar/>
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
              <TotalCost />
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </Box>
    </React.Fragment>
  );
}

export default CartFeature;
