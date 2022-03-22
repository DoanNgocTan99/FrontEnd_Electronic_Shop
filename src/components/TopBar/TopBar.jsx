import { IconButton, Menu, MenuItem } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Close } from '@material-ui/icons';
import { logout } from 'features/Auth/authSlice';
import AddProduct from 'features/CRUD/components/AddProduct/AddProduct';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './TopBar.scss';

TopBar.propTypes = {};

function TopBar(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e, reason) => {
    if (reason === 'backdropClick') return;

    setOpen(false);
  };

  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
    setAnchorEl(null);
    history.push('/login');
  };

  return (
    <div className="top-bar">
      <div className="top-bar__wrapper">
        <div className="top-bar__left">
          <Link to="/admin" className="top-bar__logo">
            <span>PickBazar</span>
          </Link>
        </div>
        <div className="top-bar__right">
          <button className="top-bar__button" onClick={handleClickOpen}>
            Add Products
          </button>
          <div className="top-bar__icons">
            <i className="far fa-bell"></i>
            <span className="top-bar__icon-badge">1</span>
          </div>

          <img
            className="top-bar__avatar"
            src="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1670746276469971&height=50&width=50&ext=1630640379&hash=AeQRqhF_z5JMdTp8T4Q"
            alt="avatar"
            onClick={handleUserClick}
          />
        </div>
      </div>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>

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
          <AddProduct closeDialog={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TopBar;
