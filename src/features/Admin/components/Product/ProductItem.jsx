import { Dialog, DialogContent, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import UpdateProduct from 'features/CRUD/components/UpdateProduct/UpdateProduct';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { formatPrice } from 'utils';
import './ProductItem.scss';

ProductItem.propTypes = {
  product: PropTypes.object,
};

function ProductItem({ product }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e, reason) => {
    if (reason === 'backdropClick') return;

    setOpen(false);
  };
  return (
    <>
      <div className="product-item" onClick={handleClickOpen}>
        <div>
          <img
            className="product-item__thumbnail"
            src={product.productThumbnail}
            alt={product.productName}
            width="100%"
          />
        </div>

        <div className="product-item__name">
          <span>{product.productName}</span>
        </div>
        <div className="product-item__price">
          <span>{formatPrice(product.salePrice)}</span>
        </div>
      </div>
      <Dialog
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <IconButton className="dialog__close-button" onClick={handleClose}>
          <Close />
        </IconButton>
        <DialogContent>
          <UpdateProduct closeDialog={handleClose} product={product} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProductItem;
