import React, { Component } from 'react';
import { Paper, Grid, Button } from '@mui/material';
import { withStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { One, Two, Three, Four, Five, Six } from './DiceFaces';
import Die from './Die';

const diceFaces = [One, Two, Three, Four, Five, Six];

const styles = (theme) => ({
  paper: {
    marginBottom: theme.spacing(2),
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: `${theme.spacing(1)} ${theme.spacing(1.5)}`,
    width: 'fit-content',
  },
  button: {
    backgroundColor: theme.palette.blue.main,
    color: 'white',
    fontSize: 18,
    marginRight: theme.spacing(2),
    '&:hover': {
      backgroundColor: theme.palette.blue.main,
    }
  },
  diceRow: {
    lineHeight: 0,
    fontSize: 64,
    paddingLeft: theme.spacing(),
    paddingRight: theme.spacing(),
  },
  leftIcon: {
    marginRight: theme.spacing(2),
  },
  whiteDice: {
    color: 'black',
    backgroundColor: 'white',
  },
  redDice: {
    backgroundColor: theme.palette.red.main,
    color: 'white',
  },
  yellowDice: {
    backgroundColor: theme.palette.yellow.main,
    color: 'white',
  },
  greenDice: {
    backgroundColor: theme.palette.green.main,
    color: 'white',
  },
  blueDice: {
    backgroundColor: theme.palette.blue.main,
    color: 'white',
  },
});

class DiceRow extends Component {
  state = {
    dice: [5, 5, 5, 5, 5, 5],
    rolling: false,
  }

  componentDidUpdate() {
    if (this.state.rolling) {
      setTimeout(() => this.setState({ rolling: false }), 500);
    }
  }

  handleRoll = () => {
    const dice = this.state.dice.map((number, i) => {
      // never change a disabled die's number
      // it wouldn't change if it was sitting out of the game on the table
      // would it?
      if (this.props.disabledDice[i]) {
        return number;
      }

      return Math.floor(Math.random() * 6);
    });

    this.setState({
      dice,
      rolling: true,
    });
  }

  render() {
    const { classes,  disabledDice, toggleDisabled } = this.props;
    const { dice, rolling } = this.state;
    const [white, white2, red, yellow, green, blue] = dice;
    const White = diceFaces[white];
    const White2 = diceFaces[white2];
    const Red = diceFaces[red];
    const Yellow = diceFaces[yellow];
    const Green = diceFaces[green];
    const Blue = diceFaces[blue];

    return (
      <Paper className={classes.paper}>
        <Grid
          className={classes.diceRow}
          container
          spacing={1}
          jusitfy='space-around'
          alignItems='center'
          wrap='nowrap'
        >
          <Grid item>
            <Button
              className={classes.button}
              disabled={rolling}
              variant='contained'
              onClick={this.handleRoll}
            >
              <FontAwesomeIcon icon={faDice} className={classes.leftIcon} size='lg' />
              Roll
            </Button>
          </Grid>
          <Grid item>
            <Die
              className={classes.whiteDice}
              component={White}
              rolling={rolling}
            />
          </Grid>
          <Grid item>
            <Die
              className={classes.whiteDice}
              component={White2}
              rolling={rolling}
            />
          </Grid>
          <Grid item>
            <Die
              className={classes.redDice}
              component={Red}
              disabled={disabledDice[2]}
              onClick={() => toggleDisabled('red')}
              rolling={rolling}
            />
          </Grid>
          <Grid item>
            <Die
              className={classes.yellowDice}
              component={Yellow}
              disabled={disabledDice[3]}
              onClick={() => toggleDisabled('yellow')}
              rolling={rolling}
            />
          </Grid>
          <Grid item>
            <Die
              className={classes.greenDice}
              component={Green}
              disabled={disabledDice[4]}
              onClick={() => toggleDisabled('green')}
              rolling={rolling}
            />
          </Grid>
          <Grid item>
            <Die
              className={classes.blueDice}
              component={Blue}
              disabled={disabledDice[5]}
              onClick={() => toggleDisabled('blue')}
              rolling={rolling}
            />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(DiceRow);
