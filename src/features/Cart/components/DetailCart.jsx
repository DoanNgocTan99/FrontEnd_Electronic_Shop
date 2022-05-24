import {
  Box,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatPrice } from 'utils';
import ProductQuantity from './ProductQuantity';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
DetailCart.propTypes = {
  onRemove: PropTypes.func,
  onChange: PropTypes.func,
};
const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const useStyles = makeStyles((theme) => ({
  root: {
    listStyleType: 'none',
    fontSize: '14px',
    marginTop: '10px',
    paddingTop: theme.spacing(1.5),
    paddingLeft: theme.spacing(2),
    marginBottom: 0,

    '&>li': {
      paddingBottom: theme.spacing(1.5),
    },
  },

  thumbnail: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
  },

  name: {
    paddingLeft: theme.spacing(2.5),
    fontSize: '14px',
    padding: '0px 10px',
    lineHeight: '1.8rem',
    height: '3.6rem',
    overflow: 'hidden',
    fontWeight: '400',
    display: '-webkit-box',
    webkitBoxOrient: 'vertical',
    webkitLineClamp: '2',
  },

  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '15px',
  },

  salePrice: {
    fontWeight: 'bold',
  },
}));
function DetailCart({ onRemove = null, onChange = null }) {
  const [id, setId] = useState(localStorage.getItem('userid'));
  const [cartItems, setCartItems] = useState([]);
  const [checkCart, setCheckCart] = useState(false);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    const getApi = `https://localhost:44306/Cart/GetListCartByIdUser/${id}`;
    axios.get(getApi).then((response) => {
      setCartItems(response.data);
      onChange(response.data);
    });
  }, []);

  const handleRemoveItem = (productId) => {
    const getApi = `https://localhost:44306/Cart/Delete?id=${productId}`;
    axios.delete(getApi).then((response) => {
      setOpen(true);
    });
  };

  const handleChangeQuantity = (product) => {
    if (!onChange) return;
    const newCartItem = cartItems.map(item => {
      if (item.id === product.id) {
        item.count = product.count
      }
      return item
    })
    setCartItems(newCartItem);
    onChange(newCartItem)
  };

  return (
    <Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleClose} severity="success">
          Đã xóa sản phẩm khỏi giỏ hàng thành công
        </Alert>
      </Snackbar>
      <Paper elevation={0}>
        <ul className={classes.root}>
          {cartItems.map((item) => (
            <li key={item.id}>
              <Grid container>
                <Grid item lg={5} className={classes.thumbnail}>
                  <img src={item.avt} alt={item.name} width="75px" />

                  <Typography className={classes.name}>{item.name}</Typography>
                </Grid>
                <Grid item lg={2} className={classes.center}>
                  <Box component="span" className={classes.salePrice}>
                    {formatPrice(item.product_Price)}
                  </Box>
                </Grid>
                <Grid item lg={2} className={classes.center}>
                  <ProductQuantity
                    item={item}
                    onChange={handleChangeQuantity}
                  />
                </Grid>
                <Grid item lg={2} className={classes.center}>
                  {!isNaN(item.count)
                    ? formatPrice(item.product_Price * item.count)
                    : formatPrice(0)}
                </Grid>
                <Grid item lg={1} className={classes.center}>
                  <IconButton onClick={() => handleRemoveItem(item.id)}>
                    <DeleteOutlined />
                  </IconButton>
                </Grid>
              </Grid>
            </li>
          ))}
        </ul>
      </Paper>
    </Box>
  );
}

export default DetailCart;
