import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel,
  Switch,
  Grid,
} from '@mui/material';

const SettingsDialog = ({ open, onClose, settings, onSettingsChange }) => {
  const handleToggle = (event) => {
    onSettingsChange({ ...settings, [event.target.name]: event.target.checked });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.is67RuleEnabled}
                  onChange={handleToggle}
                  name="is67RuleEnabled"
                  color="primary"
                />
              }
              label='Enable "6-7" Rule'
            />
          </Grid>
          <Grid item>
            <p>Allows taking 8 any time you have also taken 6 and 7 on a single turn.</p>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(SettingsDialog);
