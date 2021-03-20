import React from 'react';
import {withStyles, WithStyles, FormControl, Select, MenuItem, InputLabel} from '@material-ui/core';
import {connect} from 'react-redux';

import {AppState} from '../../redux';
import {getSelectedSeqPlatformParams, getSeqPlatformModes} from '../../redux/selectors';
import {selectMode} from '../../redux/selectedSeqPlatformParams/actions';
import {SelectedSeqPlatformParams} from '../../redux/selectedSeqPlatformParams/types';
import {SeqPlatformModes} from '../../redux/seqPlatformList/types';
import styles from '../styles';


interface Props extends WithStyles<typeof styles> {
  selectMode: typeof selectMode,
  modeMap: SeqPlatformModes,
  selectedSeqPlatformParams: SelectedSeqPlatformParams
}

class ModeSelector extends React.Component<Props> {

  handleChange = (event: any) => {
    const target = event.target;
    const value = target.value;
    this.props.selectMode(value);
  };


  render() {
    const {modeMap, selectedSeqPlatformParams, classes} = this.props;

    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="seq-platform-mode">Mode</InputLabel>
        <Select
          id="seq-platform-mode"
          name="mode"
          value={selectedSeqPlatformParams.mode}
          onChange={this.handleChange}
        >
          {
            Object.keys(modeMap).map(modeName => (
              <MenuItem key={modeName} value={modeName}>
                {modeName}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  const selectedSeqPlatformParams = getSelectedSeqPlatformParams(state);
  const modeMap = getSeqPlatformModes(state);
  return {modeMap, selectedSeqPlatformParams};
};

export default withStyles(styles)(connect(mapStateToProps, {selectMode})(ModeSelector));

