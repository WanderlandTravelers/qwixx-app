import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

export default function EndGameDialog(props) {
  const { open, onClose, onLoss, onWin } = props;

  return (
    <Dialog
      fullScreen={false}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Game Over</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Did you win?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={onLoss} color="primary">
          No
        </Button>
        <Button onClick={onWin} color="primary" autoFocus>
          Yes!
        </Button>
      </DialogActions>
    </Dialog>
  );
}