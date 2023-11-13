import React from 'react';
import { Dialog, DialogContent, Paper, Table, TableContainer, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { DeleteForever, Visibility } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  tableContainer: {
    maxHeight: '100%',
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle className={classes.root} disableTypography {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const HistoryTable = withStyles(styles)((props) => {
  const { classes, qwixxHistory, onViewHistory, onDeleteHistory } = props;
  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table stickyHeader size="small" aria-label="history table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Score</TableCell>
            <TableCell align="right">Win?</TableCell>
            <TableCell align="right">View</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {qwixxHistory.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {new Date(row.date).toLocaleDateString()} {new Date(row.date).toLocaleTimeString()}
              </TableCell>
              <TableCell align="right">{row.score}</TableCell>
              <TableCell align="right">{row.won ? 'X' : ''}</TableCell>
              <TableCell align="right"><Visibility onClick={() => onViewHistory(i)} /></TableCell>
              <TableCell align="right"><DeleteForever onClick={() => onDeleteHistory(i)} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default function HistoryDialog(props) {
  const {
    open,
    onClose,
    onViewHistory,
    onDeleteHistory,
    qwixxHistory,
  } = props;
  const scores = qwixxHistory.map((item) => item.score);
  const wins = qwixxHistory.map((item) => item.won);
  const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const highScore = Math.max(...scores);
  const winRate = Math.round(100 * wins.reduce((a, b) => a + b, 0) / wins.length);

  return (
    <Dialog
      fullScreen={true}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title" onClose={onClose}>
        History (Avg: {averageScore} | High: {highScore} | %Win: {winRate})
      </DialogTitle>
      <DialogContent>
        <HistoryTable
          onViewHistory={onViewHistory}
          onDeleteHistory={onDeleteHistory}
          qwixxHistory={qwixxHistory}
        />
      </DialogContent>
    </Dialog>
  );
}