import { Box, Button, Grid, makeStyles } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatPrice } from 'utils';
import { cartTotalSelector } from '../selectors';
import Confirm from '../../../components/Confirm';
import s from './style.module.scss';
import axios from 'axios';
import { removeAllCart } from '../cartSlice';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

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

function TotalCost(props) {
  const classes = useStyles();
  const cartTotal = useSelector(cartTotalSelector);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [deleteAll, setDeleteAll] = useState(false);
  const [listPaymentName, setListPaymentName] = useState();
  const listIdCart = [];
  const listPayment = [];
  const [namePayment, setNamePayment] = useState('');
  useEffect(() => {
    (async () => {
      const getApi = `https://electronicshop-tandn.azurewebsites.net/Payment`;
      axios.get(getApi).then((response) => {
        response.data.map((e) => listPayment.push(e.name));
      });
      setListPaymentName(listPayment);
    })();
  }, []);

  function showBox() {
    props.products.map((e) => listIdCart.push(e.id));
    const data = {
      listId: listIdCart,
      userId: props.products[0]?.userId,
      total: total,
      payment: namePayment,
    };
    const getApi = `https://electronicshop-tandn.azurewebsites.net/Orders`;
    axios.post(getApi, data).then((response) => {
      if (response.data === 'Đặt thành công sản phẩm') {
        const getApiDel = `https://electronicshop-tandn.azurewebsites.net/Cart/Delete?id=${props.products[0]?.userId}`;
        axios.delete(getApiDel, data).then((response) => {
          console.log(response.data);
        });
      }
    });
    setDeleteAll(true);
  }

  const total = props.products.reduce(
    (prevValue, currentValue, _) =>
      prevValue + currentValue.product_Price * currentValue.count,
    0
  );
  const SetValuePayment = (e) => {
    setNamePayment(e.target.innerText);
  };
  return (
    <Box>
      <Grid container className={classes.box}>
        <div container className={classes.root}>
          Thành tiền:{' '}
        </div>
        <div container className={classes.root}>
          {' '}
          {!isNaN(total) ? formatPrice(total) : formatPrice(0)}{' '}
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
      <Autocomplete
        onChange={SetValuePayment}
        options={listPaymentName}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Payments" variant="outlined" />
        )}
      />
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
          <Confirm />
        </div>
      )}
    </Box>
  );
}

export default TotalCost;
