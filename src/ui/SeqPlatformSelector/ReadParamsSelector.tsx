import React from 'react';
import {withStyles, WithStyles, FormControl, Select, MenuItem, InputLabel} from '@material-ui/core';
import {connect} from 'react-redux';

import {AppState} from '../../redux';
import {getSelectedSeqPlatformParams, getSeqPlatformReadParams} from '../../redux/selectors';
import {selectReadParams} from '../../redux/selectedSeqPlatformParams/actions';
import {SelectedSeqPlatformParams} from '../../redux/selectedSeqPlatformParams/types';
import {SeqPlatformReadParams} from '../../redux/seqPlatformList/types';
import styles from '../styles';


interface Props extends WithStyles<typeof styles> {
  selectReadParams: typeof selectReadParams,
  readParamsMap: SeqPlatformReadParams,
  selectedSeqPlatformParams: SelectedSeqPlatformParams
}

class ReadParamsSelector extends React.Component<Props> {

  handleChange = (event: any) => {
    const target = event.target;
    const value = target.value;
    this.props.selectReadParams(value);
  };


  render() {
    const {readParamsMap, selectedSeqPlatformParams, classes} = this.props;

    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="seq-platform-read-params">Read Params</InputLabel>
        <Select
          id="seq-platform-read-params"
          name='readParams'
          value={selectedSeqPlatformParams.readParams}
          onChange={this.handleChange}
        >
          {
            Object.keys(readParamsMap).map(name => (
              <MenuItem key={name} value={name}>
                {name}
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
  const readParamsMap = getSeqPlatformReadParams(state);
  return {readParamsMap, selectedSeqPlatformParams};
};

export default withStyles(styles)(connect(mapStateToProps, {selectReadParams})(ReadParamsSelector));

