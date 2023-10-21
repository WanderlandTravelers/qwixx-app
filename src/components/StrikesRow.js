import React from 'react';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faRedo, faCircleStop, faTrophy } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => {
  const { grey } = theme.palette;

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
    scoreTop: {
      borderBottom: `1px solid ${theme.palette.grey.main}`,
      textAlign: 'center',
      padding: theme.spacing(0.75),
    },
    scoreBottom: {
      padding: theme.spacing()/2,
      textAlign: 'center',
    },
    stop: {
      color: 'white',
      marginRight: theme.spacing(2),
    },
    reset: {
      color: 'white',
      marginRight: theme.spacing(2),
    },
    history: {
      color: 'white',
      marginRight: theme.spacing(2),
    },
    minusIcon: {
      color: 'white',
      marginLeft: theme.spacing(30),
    },
    strike: {
      backgroundColor: 'white',
      border: `1px solid ${theme.palette.grey.main}`,
      borderRadius: theme.spacing()/2,
      cursor: 'pointer',
      fontWeight: 'bold',
      padding: `5px ${theme.spacing(1.9)}px`,
    },
    strikeEmpty: {
      color: 'White',
    },
    strikesContainer: {
      width: "100%",
    },
    strikesLabel: {
      fontSize: 18,
      textAlign: 'center',
    },
    strikesLabelX: {
      fontWeight: 'bold',
      color: 'red',
    },
    block: {
      backgroundColor: 'white',
      border: `2px solid ${grey.dark}`,
      borderRadius: theme.spacing(2),
      marginLeft: theme.spacing(2),
      cursor: 'pointer',
      flexGrow: 1,
      flexShrink: 0,
      padding: theme.spacing(1),
      textAlign: 'center',
      width: 64
    },
    blockWhite: {
      color: 'white',
    },
    blackText: {
      color: 'black',
    },
    strikesScore: {
      marginRight: theme.spacing(3),
    },
    totalScore: {
      marginRight: theme.spacing(1.5),
    },
  });
});

function StrikesRow(props) {
  const { onClick, onReset, onEndGame, strikes, showStrikes, showFinal, revealScore, strikesScore, totalScore } = props;
  const classes = useStyles();

  return (
    <Grid container justify='space-between' alignItems='center' wrap='nowrap' className={classes.row}>
      <Grid item className={classes.strikesContainer}>
        <Grid container spacing={1} justify='space-around' alignItems='center' wrap='nowrap'>
          <FontAwesomeIcon icon={faCircleStop} className={classes.stop} onClick={onEndGame} />
          <FontAwesomeIcon icon={faRedo} className={classes.reset} onClick={onReset} />
          <FontAwesomeIcon icon={faTrophy} className={classes.history}/>
          <FontAwesomeIcon icon={faMinus} className={classes.minusIcon}/>
          {strikes.map((strike, i) => (
            <Grid item
              key={i}
              onClick={() => onClick(i)}
            >
              <div className={clsx(classes.strike, !strike ? classes.strikeEmpty : null)}>
                X
              </div>
            </Grid>
          ))}
          <Grid item 
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
          <Grid item 
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