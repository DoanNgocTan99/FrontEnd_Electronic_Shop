import { Box, Button, Grid, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatPrice } from 'utils';
import { cartTotalSelector } from '../selectors';
import Confirm from '../../../components/Confirm';
import s from './style.module.scss';
import { removeAllCart } from '../cartSlice';

TotalCost.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
    fontSize: '16px',
    fontWeight: '400',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
  },
  total: {
    marginBottom: theme.spacing(3),
    fontSize: '18px',
    fontWeight: '600',
    marginTop: theme.spacing(3),
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxtotal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: '1px solid #c3c3c3',
  },
}));

function TotalCost() {
  const classes = useStyles();
  const cartTotal = useSelector(cartTotalSelector);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [deleteAll, setDeleteAll] = useState(false);

  function showBox() {
    setDeleteAll(true);
    dispatch(removeAllCart());
  }

  // function closeBox() {
  //   setDeleteAll(false);
  // }

  // function deleteAllCart() {
  //   setDeleteAll(false);
  // }

  return (
    <Box>
      <Grid container className={classes.box}>
        <div container className={classes.root}>
          Thành tiền:{' '}
        </div>
        <div container className={classes.root}>
          {' '}
          {!isNaN(cartTotal) ? formatPrice(cartTotal) : formatPrice(0)}{' '}
        </div>
      </Grid>
      <Grid container className={classes.box}>
        <div container className={classes.root}>
          Mã giảm giá:{' '}
        </div>
        <div container className={classes.root}>
          Không
        </div>
      </Grid>
      <Grid container className={classes.boxtotal}>
        <div container className={classes.total}>
          Tổng cộng:{' '}
        </div>
        <div container className={classes.total}>
          {' '}
          {!isNaN(cartTotal) ? formatPrice(cartTotal) : formatPrice(0)}{' '}
        </div>
      </Grid>
      <Button
        onClick={() => showBox()}
        variant="contained"
        color="secondary"
        size="large"
        fullWidth
      >
        Thanh toán
      </Button>
      {deleteAll && (
        <div className={s.center}>
          <Confirm
          />
        </div>
      )}
    </Box>
  );
}

export default TotalCost;
