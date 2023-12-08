import React from 'react';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import OpenLockIcon from '@material-ui/icons/LockOpenOutlined';
import LockIcon from '@material-ui/icons/Lock';
import { makeStyles } from '@material-ui/styles';

const useStyles = (color) => makeStyles((theme) => {
  const { blue, green, red, yellow } = theme.palette;

  return ({
    marks: {
      backgroundColor: theme.palette[color].main,
      padding: theme.spacing(),
      paddingLeft: `env(safe-area-inset-left)`,
    },
    number: {
      cursor: 'pointer',
      borderRadius: theme.spacing(),
      marginLeft: theme.spacing(),
      padding: theme.spacing(),
    },
    numberContent: {
      textAlign: 'center',
      width: '100%',
    },
    liveNumber: {
      backgroundColor: theme.palette[color].light,
      color: theme.palette[color].main,
    },
    disabledNumber: {
      backgroundColor: 'transparent',
      color: 'black',
    },
    disabledNumberContent: {
      '&::before': {
        content: '""',
        borderBottom: '3px solid',
        display: 'flex',
        marginLeft: theme.spacing(2),
        width: '50%',
        transform: 'rotate(-45deg)',
        transformOrigin: 'right',
      },
    },
    x: {
      fontWeight: 'bold',
      color: 'black',
    },
    square: {
      borderRadius: theme.spacing(),
    },
    circle: {
      borderRadius: theme.spacing(20),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(),
      },
    },
    openLock: {
      fontSize: theme.typography.fontSize,
      marginBottom: -4,
      transform: 'rotate(45deg)',
    },
    lock: {
      fontSize: theme.typography.fontSize,
      marginBottom: -4,
    },
    scoreContent: {
      paddingRight: theme.spacing(2),
    },
    block: {
      backgroundColor: 'white',
      cursor: 'pointer',
      padding: theme.spacing(2),
      textAlign: 'center',
    },
    blockRed: {
      borderColor: red.main,
      backgroundColor: red.light,
      color: red.light,
      paddingRight: `env(safe-area-inset-right)`,
    },
    blockYellow: {
      borderColor: yellow.main,
      backgroundColor: yellow.light,
      color: yellow.light,
      paddingRight: `env(safe-area-inset-right)`,
    },
    blockGreen: {
      borderColor: green.main,
      backgroundColor: green.light,
      color: green.light,
      paddingRight: `env(safe-area-inset-right)`,
    },
    blockBlue: {
      borderColor: blue.main,
      backgroundColor: blue.light,
      color: blue.light,
      paddingRight: `env(safe-area-inset-right)`,
    },
    blackText: {
      color: 'black',
    },
  });
});

export default function ColorRow(props) {
  const {
    score,
    onClick,
    revealScore,
    color,
    reverse = false,
    row,
    showScore,
  } = props;
  const [marks, disabled] = row;
  const classes = useStyles(color)();
  const fiveXLocked = marks.filter(value => value).length < 5;
  const capitalizedColor = color.charAt(0).toUpperCase() + color.slice(1);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs key='0' className={classes.marks}>
        <Grid
          container
          direction="row"
          justifyContent='center'
          alignItems='center'
        >
          {marks.map((selected, i) => {
            const isLock = i + 1 === marks.length;

            return i < 10
              ? <Grid
                  item
                  xs
                  key={color + i}
                  className={clsx(classes.number, classes.square, disabled[i] && !selected ? classes.disabledNumber : classes.liveNumber)}
                  onClick={() => onClick(color, i)}
                >
                  <div className={clsx(classes.numberContent, disabled[i] && !selected && classes.disabledNumberContent)}>
                    {selected
                      ? <span className={classes.x}>X</span>
                      : reverse
                        ? marks.length - i
                        : i + 2
                    }
                  </div>
                </Grid>
              : <Grid
                  item
                  xs
                  key={color + i}
                  className={clsx(classes.number, classes.square, disabled[i] && !selected ? classes.disabledNumber : classes.liveNumber)}
                  onClick={() => onClick(color, i, isLock)}
                >
                  <div className={clsx(
                    classes.numberContent,
                    !fiveXLocked && disabled[i] && !selected && classes.disabledNumberContent)}>
                    {selected
                      ? isLock
                        ? <LockIcon className={classes.lock} />
                        : <span className={classes.x}>X</span>
                      : isLock
                        ? <OpenLockIcon className={classes.openLock} />
                        : reverse
                          ? marks.length - i
                          : i + 2
                    }
                  </div>
                </Grid>;
          })}
        </Grid>
      </Grid>
      <Grid item xs={1} key='1'
        className={clsx(
          classes.block,
          classes[`block${capitalizedColor}`],
          showScore && classes.blackText
        )}
        onClick={() => revealScore(`show${capitalizedColor}`)}
      >
        <div className={classes.scoreContent}>{score}</div>
      </Grid>
    </Grid>
  );
}