import AddPayment from 'features/CRUD/components/AddPayment/AddPayment';
import ConfirmationDialog from 'features/CRUD/components/ConfirmationDialog/ConfirmationDialog';
import UpdatePayment from 'features/CRUD/components/UpdatePayment/UpdatePayment';

import DialogContent from '@material-ui/core/DialogContent';
import { Close } from '@material-ui/icons';
import { Dialog, Grid, IconButton } from '@material-ui/core';
import 'features/Admin/components/Category/Category.scss';
import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import paymentApi from 'api/paymentApi';
import Table from 'components/Table/Table';
const MODE = {
  CREATE: 'create',
  UPDATE: 'update',
};

function Payments(props) {
  const [paymentList, setPaymentList] = useState();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.CREATE);
  const [payment, setPayment] = useState();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpened: false,
    title: '',
    subTitle: '',
  });
  const { enqueueSnackbar } = useSnackbar();

  const paymentHead = ['ID', 'Name', 'type'];

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.thumbnail}</td>
      <td className="category__actions">
        <button
          className="category__edit-button"
          onClick={() => handleUpdateOpen(item)}
        >
          Edit
        </button>
        <i
          className="far fa-trash-alt category__delete-icon"
          onClick={() => {
            setConfirmDialog({
              isOpened: true,
              title: 'Are you sure to delete this payment?',
              subTitle: "You can't undo this operation",
              onConfirm: () => {
                handleRemovepayment(item);
              },
            });
          }}
        ></i>
      </td>
    </tr>
  );

  const handleAddOpen = () => {
    setMode(MODE.CREATE);
    setOpen(true);
  };

  const handleUpdateOpen = (item) => {
    setPayment(item);
    setMode(MODE.UPDATE);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemovepayment = async (item) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpened: false,
    });
    try {
      await paymentApi.remove(item.id);

      handleClose();

      enqueueSnackbar('Delete payment successfully.', {
        variant: 'success',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top',
        },
      });
    } catch (error) {
      console.log('Failed to delete: ', error);
      enqueueSnackbar(error.message, {
        variant: 'error',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top',
        },
      });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const list = await paymentApi.getAll();
        setPaymentList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
            type: x.type,
          }))
        );
      } catch (error) {
        console.log('Failed to fetch payment list', error);
      }
    })();
  }, []);

  return (
    <div className="category">
      <h3 className="category__header">Payments</h3>
      <Grid container>
        <Grid item lg={12} xs={12}>
          <div className="category__card">
            <div className="category__card__body">
              <Table
                headData={paymentHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={paymentList}
                renderBody={(item, index) => renderBody(item, index)}
              />
              <div className="category__add">
                <button
                  className="category__add-button"
                  onClick={handleAddOpen}
                >
                  <i className="fas fa-plus category__add-icon"></i>
                  <span className="category__add-button__title">
                    Add New payment
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
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
          {mode === MODE.CREATE && <AddPayment closeDialog={handleClose} />}

          {mode === MODE.UPDATE && (
            <UpdatePayment closeDialog={handleClose} payment={payment} />
          )}
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
}

export default Payments;
