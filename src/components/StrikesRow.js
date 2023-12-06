import React from 'react';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faRedo, faCircleStop, faTrophy } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => {
  const { grey, blue, green, red, yellow } = theme.palette;

  return ({
    scoreContainer: {
      marginRight: theme.spacing(2),
    },
    score: {
      backgroundColor: 'white',
      border: `2px solid ${theme.palette.grey.main}`,
      borderRadius: theme.spacing(),
      paddingLeft: theme.spacing()/2,
      paddingRight: theme.spacing()/2,
      fontSize: 18,
    },
    icon: {
      color: 'white',
      width: '100% !important',
    },
    minusIcon: {
      float: 'right',
      marginRight: theme.spacing(2),
      width: 'auto !important',
    },
    moves: {
      backgroundColor: 'white',
      border: `1px solid ${theme.palette.grey.main}`,
      borderRadius: theme.spacing()/2,
      cursor: 'pointer',
      fontWeight: 'bold',
      padding: `5px ${theme.spacing(1.9)}px`,
      textAlign: 'center',
    },
    movesEmpty: {
      visibility: 'hidden',
    },
    movesRed: {
      backgroundColor: red.light,
    },
    movesYellow: {
      backgroundColor: yellow.light,
    },
    movesGreen: {
      backgroundColor: green.light,
    },
    movesBlue: {
      backgroundColor: blue.light,
    },
    strike: {
      backgroundColor: 'white',
      border: `2px solid ${grey.dark}`,
      borderRadius: theme.spacing(2),
      cursor: 'pointer',
      fontWeight: 'bold',
      padding: theme.spacing(1),
      fontSize: 28,
      textAlign: 'center',
    },
    strikeEmpty: {
      color: 'White',
    },
    block: {
      backgroundColor: 'white',
      border: `2px solid ${grey.dark}`,
      borderRadius: theme.spacing(2),
      cursor: 'pointer',
      padding: theme.spacing(1),
      textAlign: 'center',
    },
    blockWhite: {
      color: 'white',
    },
    blackText: {
      color: 'black',
    },
  });
});

function StrikesRow(props) {
  const { onClick, onClickUndo, onReset, onEndGame, onHistory, moves, strikes, showStrikes, showFinal, revealScore, strikesScore, totalScore } = props;
  const classes = useStyles();
  const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      className={classes.row}
    >
      <Grid item xs={11} key='0' className={classes.strikesContainer}>
        <Grid
          container
          direction="row"
          justifyContent='center'
          alignItems='center'
        >
          <Grid item xs={1} key='0'>
            <FontAwesomeIcon icon={faCircleStop} className={clsx(classes.icon, classes.stop)} onClick={onEndGame} />
          </Grid>
          <Grid item xs={1} key='1'>
            <FontAwesomeIcon icon={faRedo} className={clsx(classes.icon, classes.reset)} onClick={onReset} />
          </Grid>
          <Grid item xs={1} key='2'>
            <FontAwesomeIcon icon={faTrophy} className={clsx(classes.icon, classes.history)} onClick={onHistory} />
          </Grid>
          <Grid item xs={1} key='3'>
            <div onClick={onClickUndo} className={clsx(
              classes.moves,
              moves.length === 0
                ? classes.movesEmpty
                : classes[`moves${moves[0][0][0].toUpperCase() + moves[0][0].slice(1)}`]
              )}>
              {moves.length > 0
                ? (['red', 'yellow'].includes(moves[0][0]) ? numbers : numbers.toReversed())[moves[0][1]]
                : null}
            </div>
          </Grid>
          <Grid item xs={3} key='4'>
            <FontAwesomeIcon icon={faMinus} className={clsx(classes.icon, classes.minusIcon)} />
          </Grid>
          {strikes.map((strike, i) => (
            <Grid item xs
              key={5 + i}
              onClick={() => onClick(i)}
            >
              <div className={clsx(classes.strike, !strike ? classes.strikeEmpty : null)}>
                X
              </div>
            </Grid>
          ))}
          <Grid item xs={1} key='9'
            className={clsx(
              classes.block,
              classes.blockWhite,
              classes.strikesScore,
              showStrikes && classes.blackText,
            )}
            onClick={() => revealScore('showStrikes')}
          >
            {strikesScore}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} key='1'
      >
        <Grid
          container
          direction="row"
          justifyContent='center'
          alignItems='center'
        >
          <Grid item xs key='0'
            className={clsx(
              classes.block,
              classes.blockWhite,
              classes.totalScore,
              showFinal && classes.blackText
            )}
            onClick={() => revealScore('showFinal')}
          >
            {totalScore}
          </Grid>          
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StrikesRow;