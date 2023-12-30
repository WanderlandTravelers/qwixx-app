import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export default function ResetDialog(props) {
  const { open, onClose, onReset } = props;

  return (
    <Dialog
      fullScreen={false}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Reset</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to reset the card?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          No
        </Button>
        <Button onClick={onReset} color="primary">
          Yes!
        </Button>
      </DialogActions>
    </Dialog>
  );
}