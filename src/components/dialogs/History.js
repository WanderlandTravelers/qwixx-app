import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableContainer, TableHead, TableRow, TableBody, TableCell } from '@mui/material';
import { DeleteForever, Visibility } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => {
  return ({
    table: {},
  });
});

export default function HistoryDialog(props) {
  const {
    open,
    onClose,
    onViewHistory,
    onDeleteHistory,
    qwixxHistory,
  } = props;
  const classes = useStyles();

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
      <DialogTitle id="responsive-dialog-title">
        History (Avg: {averageScore} | High: {highScore} | %Win: {winRate})
      </DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
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
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}