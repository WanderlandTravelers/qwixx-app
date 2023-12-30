import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export default function EndGameDialog(props) {
  const { open, onClose, onLoss, onWin, score } = props;

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
          Your score: {score}<br/>Did you win?
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