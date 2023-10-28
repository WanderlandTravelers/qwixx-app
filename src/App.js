import React, { Component } from 'react';
import cloneDeep from 'lodash.clonedeep';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, useMediaQuery, Table, TableContainer, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';
import { DeleteForever, Visibility } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';
import ColorRow from './components/ColorRow';
import StrikesRow from './components/StrikesRow';

const scoring = [0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78];
const styles = (theme) => ({
  cardSubTitle: {
    color: theme.palette.grey.main,
    display: 'inline-block',
    fontWeight: 'bold',
    flexGrow: 1,
  },
  disclaimer: {
    textAlign: 'center',
    margin: `${theme.spacing(2)} auto`,
    fontSize: 14,
  },
  fiveXTop: {
    border: '1px solid',
    borderBottom: 0,
    borderTopLeftRadius: theme.spacing(2),
    borderTopRightRadius: theme.spacing(2),
    display: 'inline-block',
    float: 'right',
    fontSize: 14,
    marginRight: theme.spacing(0.75),
    textAlign: 'center',
    width: 130,
  },
  fiveXBottom: {
    border: '1px solid',
    borderBottomLeftRadius: theme.spacing(4),
    borderBottomRightRadius: theme.spacing(4),
    borderTop: 0,
    display: 'inline-block',
    float: 'right',
    height: theme.spacing(),
    marginBottom: theme.spacing(),
    marginRight: theme.spacing(0.75),
    marginTop: -theme.spacing(2),
    width: 130,
  },
  game: {
    backgroundColor: '#282c34',
    height: '100%',
    paddingBottom: `env(safe-area-inset-bottom)`,
  },
});

const diceIndex = { red: 2, yellow: 3, green: 4, blue: 5 };
const blankState = {
  moves: [],
  blue: [
    new Array(12).fill(false),
    [false, false, false, false, false, false, false, false, false, false, true, false]
  ],
  blueScore: 0,
  disabledDice: new Array(6).fill(false),
  endGameDialogOpen: false,
  historyDialogOpen: false,
  green: [
    new Array(12).fill(false),
    [false, false, false, false, false, false, false, false, false, false, true, false]
  ],
  greenScore: 0,
  red: [
    new Array(12).fill(false),
    [false, false, false, false, false, false, false, false, false, false, true, false]
  ],
  redScore: 0,
  showBlue: true, 
  showFinal: true,
  showGreen: true, 
  showRed: true, 
  showStrikes: true,
  showYellow: true,
  strikes: new Array(4).fill(false),
  strikesScore: 0,
  yellow: [
    new Array(12).fill(false),
    [false, false, false, false, false, false, false, false, false, false, true, false]
  ],
  yellowScore: 0,
}

class QuixxScoreCard extends Component {
  state = cloneDeep(blankState);

  componentDidMount() {
    // if there is a saved state, reload it
    let savedState = localStorage.getItem('QwixxState');
    if (savedState) {
      savedState = JSON.parse(savedState);
      localStorage.removeItem('QwixxState');
      this.setState(savedState);
    }
    
    // save the state if the user navagates away or refreshes
    window.addEventListener('pagehide', () => {
      console.log('saving state');
      localStorage.setItem('QwixxState', JSON.stringify(this.state));
    });
  }
  
  /**
   * Handles clicks for the colored number rows
   * @param {String} color The color of the row
   * @param {Number} index The index of the clicked square
   * @param {Boolean} isLock Whether or not the square clicked is a lock
  */
  handleClick = (color, index, isLock) => {
    const { disabledDice, moves } = this.state;
    let [marks, disabled] = this.state[color];

    // if disabled do nothing
    if (disabled[index]) {
      return;
    }

    if (!isLock)
    {
      if (moves.length > 0 && moves[0][0] === color && moves[0][1] === index) {
        moves.shift();
      } else {
        moves.unshift([color, index]);
      }
    }

    // Disable a dice if a lock is marked
    // really means toggle the state of both lock and dice when they are in the state
    // this must be done before marks is modified
    if (isLock && (
      (!marks[index] && !disabledDice[diceIndex[color]]) ||
      (marks[index] && disabledDice[diceIndex[color]])
    )) {
      this.toggleDisabled(color);
    }

    // mark the square
    marks[index] = !marks[index];

    // calculate new score
    const numMarks = marks.filter(value => value).length - (marks[11] && !marks[10] ? 1 : 0);
    const score = scoring[numMarks];

    // disable all before the index and enable all after
    disabled = disabled.map((element, i) => {
      // Check lock section first, then check the rest
      return (i === marks.length - 2 && numMarks < 5) || i < marks.lastIndexOf(true);
    });

    this.setState({
      moves: moves,
      [color]: [marks, disabled],
      [`${color}Score`]: score,
    });
  }

  handleClickUndo = () => {
    const moves = this.state.moves;
    this.handleClick(moves[0][0], moves[0][1], false);
  }

  /**
   * Handles clicks for the strike row 
   * @param {Number} index The index of the Strike that was clicked
   */
  handleClickStrikes = (index) => {
    const marks = this.state.strikes;

    // mark the square
    marks[index] = !marks[index];

    // calculate new score
    const score = marks.filter(value => value).length * 5;

    this.setState({
      strikes: marks,
      strikesScore: score,
    });
  }

  handleReset = (e, skipConfirm) => {
    // TODO: Use proper dialog
    if (skipConfirm || window.confirm('Are you sure you want to reset the card?'))
    {
      this.setState(cloneDeep(blankState));
    }
  }

  handleDelete = (e, i) => {
    // TODO: Use proper dialog
    if (window.confirm('Are you sure you want to delete the record?'))
    {
      var history = JSON.parse(localStorage.getItem("QuixxHistory"));
      history.splice(i, 1);
      localStorage.setItem("QuixxHistory", JSON.stringify(history));
      // Cause the dialog to refresh
      this.setState({historyDialogOpen: true});
    }
  }

  handleView = (e, i) => {
    // TODO: Show the game state from the history
    window.alert("Stay tuned for this feature!");
  }

  toggleDisabled = (color) => {
    const { disabledDice } = this.state;
    let [marks, disabled] = this.state[color];
    const index = diceIndex[color];

    // toggle the specified dice
    disabledDice[index] = !disabledDice[index];

    // disable or enable the entries of a row
    if (disabledDice[index]) {
      disabled = disabled.map(() => true);

      // don't disable the lock if it is marked
      if (marks[marks.length - 1]) {
        disabled[disabled.length - 1] = false;
      }
    } else {
      const numMarks = marks.filter(value => value).length;
      disabled = disabled.map((element, i) => {
        // Check lock section first, then check the rest
        return (i >= marks.length - 2 && numMarks < 5) || i < marks.lastIndexOf(true);
      });
    }

    this.setState({ 
      disabledDice,
      [color]: [marks, disabled],
    });
  }

  render() {
    const { classes } = this.props;
    // const theme = useTheme();
    // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const {
      red,
      yellow,
      green,
      blue,
      blueScore = 0,
      greenScore = 0,
      redScore = 0,
      showBlue,
      showGreen,
      showRed,
      showYellow,
      showFinal,
      showStrikes,
      moves,
      strikes,
      strikesScore = 0,
      yellowScore = 0,
      endGameDialogOpen,
      historyDialogOpen,
    } = this.state;

    const qwixxHistory = JSON.parse(localStorage.getItem('QuixxHistory') || '[]');
    const scores = qwixxHistory.map((item) => item.score);
    const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const highScore = Math.max(...scores);
    const winRate = 100 * qwixxHistory.map((item) => item.won).reduce((a, b) => a + b, 0) / qwixxHistory.length;

    const getTotalScore = () => redScore + yellowScore + greenScore + blueScore - strikesScore;
  
    const handleLoss = (e) => handleRecordScore(e, false);
    const handleWin = (e) => handleRecordScore(e, true);

    const handleEndGame = () => {
      this.setState({endGameDialogOpen: true});
    };
    
    const handleRecordScore = (e, won) => {
      this.setState({endGameDialogOpen: false});
      const scores = JSON.parse(localStorage.getItem("QuixxHistory") || '[]');
      scores.push({
        'date': (new Date()).toISOString(),
        'score': getTotalScore(),
        'won': won,
        'state': cloneDeep(this.state),
      });
      localStorage.setItem('QuixxHistory', JSON.stringify(scores));
      this.handleReset(e, true);
    };

    return (
      <Grid
        className={classes.game}
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <ColorRow
          onClick={this.handleClick}
          showScore={showRed}
          score={redScore}
          color='red'
          row={red}
          revealScore={(score) => this.setState({ [score]: !this.state[score] })}
        />
        <ColorRow
          onClick={this.handleClick}
          showScore={showYellow}
          score={yellowScore}
          color='yellow'
          row={yellow}
          revealScore={(score) => this.setState({ [score]: !this.state[score] })}
        />
        <ColorRow
          onClick={this.handleClick}
          showScore={showGreen}
          score={greenScore}
          color='green'
          reverse
          row={green}
          revealScore={(score) => this.setState({ [score]: !this.state[score] })}
        />
        <ColorRow
          onClick={this.handleClick}
          showScore={showBlue}
          score={blueScore}
          color='blue'
          reverse
          row={blue}
          revealScore={(score) => this.setState({ [score]: !this.state[score] })}
        />
        <StrikesRow
          moves={moves}
          strikes={strikes}
          onClickUndo={this.handleClickUndo}
          onEndGame={handleEndGame}
          onReset={this.handleReset}
          onHistory={() => this.setState({historyDialogOpen: true})}
          onClick={(i) => this.handleClickStrikes(i)}
          showFinal={showFinal}
          showStrikes={showStrikes}
          totalScore={getTotalScore()}
          strikesScore={-strikesScore}
          revealScore={(score) => this.setState({ [score]: !this.state[score] })}
        />

        <Dialog
          fullScreen={true}
          open={endGameDialogOpen}
          onClose={() => this.setState({endGameDialogOpen: false})}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Game Over</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you win?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({endGameDialogOpen: false})} color="primary">
              Close
            </Button>
            <Button onClick={handleLoss} color="primary">
              No
            </Button>
            <Button onClick={handleWin} color="primary" autoFocus>
              Yes!
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullScreen={true}
          open={historyDialogOpen}
          onClose={() => this.setState({historyDialogOpen: false})}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            History (Avg: {averageScore} | High: {highScore} | %Win: {winRate})
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
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
                        <TableCell align="right"><Visibility onClick={(e) => this.handleView(e, i)} /></TableCell>
                        <TableCell align="right"><DeleteForever onClick={(e) => this.handleDelete(e, i)} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => this.setState({historyDialogOpen: false})} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  }
}

export default withStyles(styles)(React.memo(QuixxScoreCard));
