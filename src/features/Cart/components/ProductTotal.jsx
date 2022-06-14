import { Box, Grid, IconButton, makeStyles, Paper } from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { cartItemsCountSelector } from '../selectors';

ProductTotal.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: theme.spacing(2),
    fontSize: '16px',
    fontWeight: '500',
  },

  center: {
    textAlign: 'center',
  },
}));

function ProductTotal() {
  // const cartItemsCount = useSelector(cartItemsCountSelector);
  const [id, setId] = useState(localStorage.getItem('userid'));
  const [cartItemsCount, setCartItemsCount] = useState();
  const classes = useStyles();

  useEffect(() => {
    const getApi = `http://tandn97-001-site1.itempurl.com/Cart/CountProductInCart/${id}`;
    axios.get(getApi).then((response) => {
      setCartItemsCount(response.data);
    });
  }, []);

  return (
    <Box>
      <Paper elevation={0}>
        <Grid container className={classes.root}>
          <Grid item lg={5}>
            {`Tất cả ${!isNaN(cartItemsCount) ? cartItemsCount : 0} sản phẩm`}
          </Grid>
          <Grid item lg={2} className={classes.center}>
            Đơn giá
          </Grid>
          <Grid item lg={2} className={classes.center}>
            Số lượng
          </Grid>
          <Grid item lg={2} className={classes.center}>
            Thành tiền
          </Grid>
          <Grid item lg={1} className={classes.center}>
            <IconButton>
              <DeleteOutlined />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default ProductTotal;
