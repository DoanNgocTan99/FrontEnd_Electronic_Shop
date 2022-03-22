import {
  Box,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { formatPrice } from 'utils';
import ProductQuantity from './ProductQuantity';

DetailCart.propTypes = {
  onRemove: PropTypes.func,
  onChange: PropTypes.func,
};

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
  const cartItems = useSelector((state) => state.cart.cartItems);
  const classes = useStyles();

  const handleRemoveItem = (productId) => {
    if (!onRemove) return;
    onRemove(productId);
  };

  const handleChangeQuantity = (product) => {
    if (!onChange) return;
    onChange(product);
  };
  return (
    <Box>
      <Paper elevation={0}>
        <ul className={classes.root}>
          {cartItems.map((item) => (
            <li key={item.id}>
              <Grid container>
                <Grid item lg={5} className={classes.thumbnail}>
                  <img
                    src={item.product.productThumbnail}
                    alt={item.product.productName}
                    width="75px"
                  />

                  <Typography className={classes.name}>
                    {item.product.productName}
                  </Typography>
                </Grid>
                <Grid item lg={2} className={classes.center}>
                  <Box component="span" className={classes.salePrice}>
                    {formatPrice(item.product.salePrice)}
                  </Box>
                </Grid>
                <Grid item lg={2} className={classes.center}>
                  <ProductQuantity
                    item={item}
                    onChange={handleChangeQuantity}
                  />
                </Grid>
                <Grid item lg={2} className={classes.center}>
                  {!isNaN(item.quantity)
                    ? formatPrice(item.product.salePrice * item.quantity)
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
