import { Box, IconButton, makeStyles } from '@material-ui/core';
import { AddSharp, RemoveSharp } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
  },

  button: {
    padding: 0,
  },

  input: {
    textAlign: 'center',
    width: theme.spacing(3.5),

    padding: 0,
    border: '1px solid #ccc',
    borderRadius: theme.spacing(0.25),
  },
}));

ProductQuantity.propTypes = {
  item: PropTypes.object,
  onChange: PropTypes.func,
};

function ProductQuantity({ item = {}, onChange = null }) {
  const classes = useStyles();
  const [quantityTerm, setQuantityTerm] = useState(item.quantity);
  const typingTimeoutRef = useRef();

  const handleQuantity = (value) => {
    if (!onChange) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValue = {
        ...item,
        quantity: parseInt(value),
      };

      onChange(formValue);
    }, 100);
  };

  const handleChangeQuantityInput = (e) => {
    const value = e.target.value;
    if (isNaN(value) && parseInt(value) < 1) return;
    setQuantityTerm(value);
    handleQuantity(value);
  };

  const handleRemoveClick = () => {
    const value = parseInt(quantityTerm) - 1;
    if (value < 1) return;
    setQuantityTerm(`${value}`);
    handleQuantity(value);
  };

  const handleAddClick = () => {
    const value = parseInt(quantityTerm) + 1;
    setQuantityTerm(`${value}`);
    handleQuantity(value);
  };

  return (
    <Box className={classes.root}>
      <IconButton className={classes.button} onClick={handleRemoveClick}>
        <RemoveSharp />
      </IconButton>

      <input
        type="tel"
        value={quantityTerm}
        onChange={handleChangeQuantityInput}
        className={classes.input}
      />

      <IconButton className={classes.button} onClick={handleAddClick}>
        <AddSharp />
      </IconButton>
    </Box>
  );
}

export default ProductQuantity;
