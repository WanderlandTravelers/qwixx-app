import React, { Component } from 'react';
import cloneDeep from 'lodash.clonedeep';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import ColorRows from './components/ColorRows';
import StrikesRow from './components/StrikesRow';

const scoring = [0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78];
const gameWidth = 1000;
const gameHeight = 405; // calculated after rendering and here for reference

const styles = (theme) => ({
  cardTitleRow: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  cardTitle: {
    color: theme.palette.grey.dark,
    display: 'inline-block',
    fontWeight: 'bold',
    marginRight: theme.spacing(4),
  },
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
  gameWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: gameWidth,
    margin: 'auto',
  },
  paper: {
    backgroundColor: theme.palette.grey.light,
    padding: theme.spacing(2),
    paddingTop: theme.spacing(2),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    marginBottom: theme.spacing(),
  },
});

const diceIndex = { red: 2, yellow: 3, green: 4, blue: 5 };
const blankState = {
  blue: [
    new Array(12).fill(false),
    [false, false, false, false, false, false, false, false, false, false, true, false]
  ],
  blueScore: 0,
  disabledDice: new Array(6).fill(false),
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
  startingGameWidth = gameWidth;
  startingGameHeight = gameHeight;

  componentDidMount() {
    // if there is a saved state, reload it
    let savedState = localStorage.getItem('QwixxAppState');
    if (savedState) {
      savedState = JSON.parse(savedState);
      localStorage.removeItem('QwixxAppState');
      this.setState(savedState);
    }

    // save the state if the user navagates away or refreshes
    window.addEventListener('pagehide', () => {
      console.log('saving state');
      localStorage.setItem('QwixxAppState', JSON.stringify(this.state));
    });

    // Rescale the card to fit on the screen if the size of the screen changes
    window.addEventListener('resize', () => {
      this.setState({ scaler: this.getScaler() });
    });

    // set the initial scaler for the game
    this.setState({ scaler: this.getScaler() });
  }

  /**
   * Calculates a scale factor for how to scale the card and dice so they
   * always fit on the screen regardless of orientation. Scaler is always 1
   * unless the height < width, then we scale based on the height of the screen
   */
  getScaler = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    //const gameHeight = document.getElementById('game-wrapper').clientHeight;
    const gameHeight = this.startingGameHeight;

    // scaler starts at 1 which means no scaling needed
    let scaler = 1;

    // do we even need to scale?
    console.log(windowHeight);
    console.log(gameHeight);

    const scalerH = windowHeight / gameHeight;
    const scalerW = windowWidth / gameWidth;

    // take the smaller scaler because that one is more important
    scaler = scalerH < scalerW ? scalerH : scalerW

    // shrink just a little to add some padding around the edges
    scaler = scaler * 0.98;

    return scaler;
  }

  /**
   * Handles clicks for the colored number rows
   * @param {String} color The color of the row
   * @param {Number} index The index of the clicked square
   * @param {Boolean} isLock Whether or not the square clicked is a lock
   */
  handleClick = (color, index, isLock) => {
    const { disabledDice } = this.state;
    let [marks, disabled] = this.state[color];

    // if disabled do nothing
    if (disabled[index]) {
      return;
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
      [color]: [marks, disabled],
      [`${color}Score`]: score,
    });
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
    if (skipConfirm || window.confirm('Are you sure you want to reset the card?'))
    {
      this.setState(cloneDeep(blankState));
    }
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
    const {
      blueScore = 0,
      greenScore = 0,
      redScore = 0,
      scaler = 1,
      showBlue,
      showGreen,
      showRed,
      showYellow,
      showFinal,
      showStrikes,
      strikes,
      strikesScore = 0,
      yellowScore = 0,
    } = this.state;

    let wrapperStyles;
    if (scaler !== 1) {
      wrapperStyles = {
        transform: `translate(-50%) scale(${scaler})`,
        left: `50%`,
        marginTop: 8 - (gameHeight - (gameHeight * scaler)) / 2
      };
    };

    return (
      <>
        <div 
          id='game-wrapper'
          className={classes.gameWrapper}
          style={wrapperStyles}
        >
          <ColorRows {...this.state}
            onClick={this.handleClick}
            showBlue={showBlue}
            showGreen={showGreen}
            showRed={showRed}
            showYellow={showYellow}
            blueScore={blueScore}
            greenScore={greenScore}
            redScore={redScore}
            yellowScore={yellowScore}
            revealScore={(score) => this.setState({ [score]: !this.state[score] })}
          />
          <StrikesRow
            strikes={strikes}
            onReset={this.handleReset}
            onClick={(i) => this.handleClickStrikes(i)}
            showFinal={showFinal}
            showStrikes={showStrikes}
            totalScore={redScore + yellowScore + greenScore + blueScore - strikesScore}
            strikesScore={-strikesScore}
            revealScore={(score) => this.setState({ [score]: !this.state[score] })}
          />
        </div>
      </>
    );
  }
}

export default withStyles(styles)(QuixxScoreCard);
