import React from 'react';
import { AppBar, Toolbar, Button, Typography, Hidden } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faRedo } from '@fortawesome/free-solid-svg-icons';

import rules from '../QwixxTM-RULES.pdf';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.grey.darker,
    color: 'white',
    height: 64,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    position: 'absolute',
    zIndex: 100,
  },
  appTitle: {
    flexGrow: 1,
    fontSize: 24,
  },
  link: {
    color: 'white',
    fontSize: 18,
    marginRight: theme.spacing(4),
    '&:hover': {
      color: theme.palette.grey.main,
    },
  },
  leftIcon: {
    marginRight: theme.spacing(2),
  },
  reset: {
    backgroundColor: theme.palette.red.main,
    color: 'white',
    fontSize: 18,
    '&:hover': {
      color: theme.palette.red.main,
    },
  },
}));

export default function QwixxAppBar({ onReset }) {
  const classes = useStyles();
  return (
    <AppBar position='static' className={classes.appBar}>
      <Toolbar>
        <Typography variant='h1' className={classes.appTitle}>
          Qwixx App
        </Typography>
        <Hidden smDown>
          <Button
            className={classes.link}
            href={rules}
            target='_'
          >
            <FontAwesomeIcon icon={faExternalLinkAlt} className={classes.leftIcon}/>
            Rules of Play
          </Button>
        </Hidden>
        <Button
          className={classes.reset}
          variant='contained'
          onClick={onReset}
        >
          <FontAwesomeIcon icon={faRedo} className={classes.leftIcon}/>
          Reset
        </Button>
      </Toolbar>
    </AppBar>
  );
}