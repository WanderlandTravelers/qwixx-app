import React from 'react';
import clsx from 'clsx';
import { Grid } from '@mui/material';
import OpenLockIcon from '@mui/icons-material/LockOpenOutlined';
import LockIcon from '@mui/icons-material/Lock';
import { makeStyles } from '@mui/styles';

const useStyles = (color) => makeStyles((theme) => {
  const { blue, green, red, yellow } = theme.palette;

  return {
    row: {
      fontSize: theme.typography.fontSize,
    },
    verticallyCenter: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    height100: {
      height: '100%',
    },
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
      textDecoration: 'line-through',
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
      [theme.breakpoints.down('md')]: {
        padding: theme.spacing(),
      },
    },
    openLock: {
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
      paddingRight: `env(safe-area-inset-right)`,
      textAlign: 'center',
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
  };
});

export default function ColorRow(props) {
  const {
    score,
    onClick,
    color,
    reverse = false,
    row,
    className,
  } = props;
  const [marks, disabled] = row;
  const classes = useStyles(color)();
  const fiveXLocked = marks.filter(value => value).length < 5;
  const capitalizedColor = color.charAt(0).toUpperCase() + color.slice(1);

  return (
    <Grid
      className={clsx(className, classes.row)}
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs key='0' className={clsx(classes.marks, classes.height100)}>
        <Grid
          container
          direction="row"
          justifyContent='center'
          alignItems='center'
          className={classes.height100}
        >
          {marks.map((selected, i) => {
            const isLock = i + 1 === marks.length;

            return i < 10
              ? <Grid
                  item
                  xs
                  key={color + i}
                  className={clsx(classes.height100, classes.number, classes.square, disabled[i] && !selected ? classes.disabledNumber : classes.liveNumber)}
                  onClick={() => onClick(color, i)}
                >
                  <div className={clsx(classes.numberContent, classes.verticallyCenter, disabled[i] && !selected && classes.disabledNumberContent)}>
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
                  className={clsx(classes.height100, classes.number, classes.square, disabled[i] && !selected ? classes.disabledNumber : classes.liveNumber)}
                  onClick={() => onClick(color, i, isLock)}
                >
                  <div className={clsx(
                    classes.numberContent,
                    classes.verticallyCenter,
                    !fiveXLocked && disabled[i] && !selected && classes.disabledNumberContent)}>
                    {selected
                      ? isLock
                        ? <LockIcon className={classes.lock} />
                        : <span className={classes.x}>X</span>
                      : isLock
                        ? <OpenLockIcon className={clsx(classes.lock, classes.openLock)} />
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
          classes.height100,
          classes.block,
          classes[`block${capitalizedColor}`],
          classes.blackText
        )}
      >
        <div className={clsx(classes.scoreContent, classes.verticallyCenter)}>{score}</div>
      </Grid>
    </Grid>
  );
}