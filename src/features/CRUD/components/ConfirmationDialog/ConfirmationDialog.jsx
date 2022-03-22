import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { NotListedLocation } from '@material-ui/icons';
import React from 'react';

ConfirmationDialog.propTypes = {};

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
  },

  content: {
    textAlign: 'center',
  },

  action: {
    justifyContent: 'center',
  },

  titleIcon: {
    backgroundColor: '#f6a5c0',
    color: theme.palette.secondary.main,

    '&:hover': {
      backgroundColor: '#f6a5c0',
      cursor: 'default',
    },

    '& .MuiSvgIcon-root': {
      fontSize: '3rem',
    },
  },
}));

function ConfirmationDialog(props) {
  const classes = useStyles();
  const { confirmDialog, setConfirmDialog } = props;

  return (
    <Dialog open={confirmDialog.isOpened}>
      <DialogTitle className={classes.title}>
        <IconButton disableRipple className={classes.titleIcon}>
          <NotListedLocation />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.action}>
        <Button
          color="secondary"
          variant="contained"
          onClick={confirmDialog.onConfirm}
        >
          OK
        </Button>
        <Button
          color="default"
          variant="contained"
          onClick={() =>
            setConfirmDialog({ ...confirmDialog, isOpened: false })
          }
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
