import React from 'react';
import {withStyles, createStyles, Typography, Theme, WithStyles, Grid} from '@material-ui/core';
import {connect} from 'react-redux';

import {AppState} from '../redux';
import {getSampleList, getSelectedSeqPlatform} from '../redux/selectors';
import {SampleList} from '../redux/sampleList/types';
import {SelectedSeqPlatform} from '../redux/selectedSeqPlatformParams/types';
import calcSampleLoadList, {SampleLoad} from '../logic/Calculator';

const styles = (theme: Theme) => createStyles({
  loadBar: {
    display: 'flex',
    flexGrow: 1,
    height: theme.typography.h4.fontSize,
    margin: 2 * theme.spacing.unit,
    outline: 'none',
    boxShadow: '0 0 ' + 2 * theme.spacing.unit + 'px',
    // boxShadow color trick
    color: 'green',
    '& .capacityText': {
      color: '#000',
      fontSize: theme.typography.h5.fontSize,
      margin: '0 auto',
    },
  },
});


interface Props extends WithStyles<typeof styles> {
  selectedSeqPlatform: SelectedSeqPlatform,
  sampleList: SampleList
}


export class Calculator extends React.Component<Props> {

  // background: 'linear-gradient(to right, red 20%, blue 20%, blue 50%, yellow 50%, yellow 60%, white 0)',
  static sampleLoadListToCSS = (sampleLoadList: SampleLoad[]) => {
    let css = 'linear-gradient(to right';
    let cumulativeSumPercent = sampleLoadList[0].percent;
    css += ', ' + sampleLoadList[0].color + ' ' + cumulativeSumPercent + '%';
    for (let i = 1; i < sampleLoadList.length; i++) {
      let sampleLoad = sampleLoadList[i];
      css += ', ' + sampleLoad.color + ' ' + cumulativeSumPercent + '%, '
        + sampleLoad.color + ' ' + Math.min(cumulativeSumPercent + sampleLoad.percent, 100) + '%';
      cumulativeSumPercent += sampleLoad.percent;
      if (cumulativeSumPercent > 100) {
        break;
      }
    }
    let boxShadowColor;
    if (cumulativeSumPercent >= 80) {
      boxShadowColor = 'orange';
    }
    if (cumulativeSumPercent > 99) {
      boxShadowColor = 'red';
    }
    return {
      background: css + ', white 0)',
      color: boxShadowColor,
    };
  };


  render() {
    const {selectedSeqPlatform, sampleList, classes} = this.props;
    let styles = {};
    if (selectedSeqPlatform && sampleList.length > 0) {
      const sampleLoadList = calcSampleLoadList(sampleList, selectedSeqPlatform);
      styles = Calculator.sampleLoadListToCSS(sampleLoadList);
    }

    return (
      <Grid item xs={12} container spacing={16}>
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            The sequencing platform load
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.loadBar} style={styles}>
            <Typography className="capacityText" variant="body2" component="span">
              {selectedSeqPlatform ? selectedSeqPlatform.capacity.toOriginalString() : ''}
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    )
  }

}

const mapStateToProps = (state: AppState) => {
  const selectedSeqPlatform = getSelectedSeqPlatform(state);
  const sampleList = getSampleList(state);
  return {selectedSeqPlatform, sampleList};
};


export default withStyles(styles)(connect(mapStateToProps)(Calculator));