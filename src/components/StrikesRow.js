import React from 'react';
import clsx from 'clsx';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo, faCircleStop, faTrophy } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => {
  const { grey, blue, green, red, yellow } = theme.palette;

  return ({
    row: {
      fontSize: theme.typography.fontSize,
    },
    height100: {
      height: '100%',
    },
    verticallyCenter: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    scoreContainer: {
      height: '100%',
      padding: theme.spacing(0.5),
      paddingLeft: 0,
      paddingRight: 0,
    },
    iconContainer: {
      padding: '8px',
      height: '100%',
    },
    icon: {
      color: 'white',
      width: '100% !important',
      height: '100%',
    },
    movesContainer: {
      height: '100%',
      padding: theme.spacing(0.5),
      paddingLeft: 0,
      paddingRight: 0,
    },
    moves: {
      backgroundColor: 'white',
      border: `1px solid ${theme.palette.grey.main}`,
      borderRadius: theme.spacing(),
      cursor: 'pointer',
      fontWeight: 'bold',
      width: '100%',
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
    strikeContainer: {
      height: '100%',
      padding: theme.spacing(0.5),
      paddingLeft: 0,
      paddingRight: 0,
    },
    strike: {
      backgroundColor: 'white',
      border: `2px solid ${grey.dark}`,
      borderRadius: theme.spacing(),
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: 28,
    },
    strikeEmpty: {
      color: 'White',
    },
    block: {
      backgroundColor: 'white',
      border: `2px solid ${grey.dark}`,
      borderRadius: theme.spacing(),
      cursor: 'pointer',
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
  const {
    onClick,
    onClickUndo,
    onReset,
    onEndGame,
    onHistory,
    className,
    moves,
    strikes,
    strikesScore,
    totalScore
  } = props;
  const classes = useStyles();
  const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      className={clsx(classes.row, className)}
    >
      <Grid item xs={11} key='0' className={clsx(classes.height100, classes.strikesContainer)}>
        <Grid
          container
          direction="row"
          justifyContent='center'
          alignItems='center'
          className={classes.height100}
        >
          <Grid item xs={1} key='0' className={classes.iconContainer}>
            <FontAwesomeIcon icon={faCircleStop} className={clsx(classes.icon, classes.stop)} onClick={onEndGame} />
          </Grid>
          <Grid item xs={1} key='1' className={classes.iconContainer}>
            <FontAwesomeIcon icon={faRedo} className={clsx(classes.icon, classes.reset)} onClick={onReset} />
          </Grid>
          <Grid item xs={1} key='2' className={classes.iconContainer}>
            <FontAwesomeIcon icon={faTrophy} className={clsx(classes.icon, classes.history)} onClick={onHistory} />
          </Grid>
          <Grid item xs={1} key='3' className={classes.movesContainer}>
            <div onClick={onClickUndo} className={clsx(
              classes.moves,
              classes.verticallyCenter,
              moves.length === 0
                ? classes.movesEmpty
                : classes[`moves${moves[0][0][0].toUpperCase() + moves[0][0].slice(1)}`]
            )}>
              {moves.length > 0
                ? (['red', 'yellow'].includes(moves[0][0]) ? numbers : numbers.toReversed())[moves[0][1]]
                : null}
            </div>
          </Grid>
          <Grid item xs={1} key='4'></Grid>
          <Grid item xs={1} key='5'></Grid>
          <Grid item xs={1} key='6'></Grid>
          {strikes.map((strike, i) => (
            <Grid item xs
              key={5 + i}
              onClick={() => onClick(i)}
              className={classes.strikeContainer}
            >
              <div className={clsx(classes.verticallyCenter, classes.strike, !strike ? classes.strikeEmpty : null)}>
                X
              </div>
            </Grid>
          ))}
          <Grid item xs={1} key='9'
            className={clsx(
              classes.blockWhite,
              classes.scoreContainer,
              classes.blackText,
            )}
          >
            <div className={clsx(classes.block, classes.verticallyCenter)}>{strikesScore}</div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} key='1' className={classes.height100}>
        <Grid
          container
          direction="row"
          justifyContent='center'
          alignItems='center'
          className={classes.height100}
        >
          <Grid item xs key='0'
            className={clsx(
              classes.blockWhite,
              classes.scoreContainer,
              classes.blackText
            )}
          >
            <div className={clsx(classes.block, classes.verticallyCenter)}>{totalScore}</div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StrikesRow;