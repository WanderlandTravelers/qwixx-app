import React from 'react';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FreeSection, LockSection } from './NumberRow';

const useStyles = makeStyles((theme) => {
  const { blue, green, grey, red, yellow } = theme.palette;
  
  return ({
    section: {
      flexGrow: 1,
    },
    block: {
      backgroundColor: 'white',
      border: `2px solid ${grey.dark}`,
      borderRadius: theme.spacing(2),
      cursor: 'pointer',
      flexGrow: 1,
      flexShrink: 0,
      marginBottom: theme.spacing(1.81),
      padding: theme.spacing(1.8),
      textAlign: 'center',
      width: 64
    },
    blockRed: {
      borderColor: red.main,
      backgroundColor: red.light,
      color: red.light,
    },
    blockYellow: {
      borderColor: yellow.main,
      backgroundColor: yellow.light,
      color: yellow.light,
    },
    blockGreen: {
      borderColor: green.main,
      backgroundColor: green.light,
      color: green.light,
    },
    blockBlue: {
      borderColor: blue.main,
      backgroundColor: blue.light,
      color: blue.light,
    },
    blackText: {
      color: 'black',
    },
    free: {
      width: '75%',
    },
    lock: {
      width: '16.66666666%',
    },
    score: {
      width: '8.33333333%',
    },
  });
});

export default function ColorRows(props) {
  const classes = useStyles();
  const {
      blue,
      green,
      red,
      yellow,
      blueScore,
      greenScore,
      redScore,
      yellowScore,
      onClick,
      revealScore,
      showBlue,
      showGreen,
      showRed,
      showYellow,
  } = props;

  return (
    <Grid container spacing={1}>
      <Grid item className={clsx(classes.section, classes.free)}>
        <FreeSection
          color={'red'}
          onClick={onClick}
          row={red}
        />
        <FreeSection
          color={'yellow'}
          onClick={onClick}
          row={yellow}
        />
        <FreeSection
          color={'green'}
          onClick={onClick}
          row={green}
          reverse
        />
        <FreeSection
          color={'blue'}
          onClick={onClick}
          row={blue}
          reverse
        />
      </Grid>
      <Grid item className={clsx(classes.section, classes.lock)}>
        <LockSection
          color={'red'}
          onClick={onClick}
          row={red}
        />
        <LockSection
          color={'yellow'}
          onClick={onClick}
          row={yellow}
        />
        <LockSection
          color={'green'}
          onClick={onClick}
          row={green}
          reverse
        />
        <LockSection
          color={'blue'}
          onClick={onClick}
          row={blue}
          reverse
        />
      </Grid>
      <Grid item className={clsx(classes.section, classes.score)}>
        <Grid item
          className={clsx(
            classes.block,
            classes.blockRed,
            showRed && classes.blackText
          )}
          onClick={() => revealScore('showRed')}
        >
          {redScore}
        </Grid>
        <Grid item
          className={clsx(
            classes.block,
            classes.blockYellow,
            showYellow && classes.blackText
          )}
          onClick={() => revealScore('showYellow')}
        >
          {yellowScore}
        </Grid>
        <Grid item
          className={clsx(
            classes.block,
            classes.blockGreen,
            showGreen && classes.blackText
          )}
          onClick={() => revealScore('showGreen')}
        > 
          {greenScore}
        </Grid>
        <Grid item
          className={clsx(
            classes.block,
            classes.blockBlue,
            showBlue && classes.blackText,
          )}
          onClick={() => revealScore('showBlue')}
        >
          {blueScore}
        </Grid>
      </Grid>
    </Grid>
  );
}