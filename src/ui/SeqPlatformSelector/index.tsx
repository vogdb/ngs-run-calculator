import {createStyles, Theme, Typography, WithStyles, withStyles, Grid} from '@material-ui/core';
import React from 'react';
import ModeSelector from './ModeSelector';
import NameSelector from './NameSelector';
import ReadParamsSelector from './ReadParamsSelector';

const styles = (theme: Theme) => createStyles({
  root: {
    marginTop: theme.spacing.unit * 2,
  }
});

interface Props extends WithStyles<typeof styles> {
}

function SeqPlatformSelector({classes}: Props) {
  return (
    <Grid item xs={12} container spacing={16} className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h6" align="center">
          Please select a sequencing platform and its parameters
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <NameSelector/>
      </Grid>
      <Grid item xs={12} sm={4}>
        <ModeSelector/>
      </Grid>
      <Grid item xs={12} sm={4}>
        <ReadParamsSelector/>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(SeqPlatformSelector);