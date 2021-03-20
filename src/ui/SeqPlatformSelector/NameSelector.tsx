import React from 'react';
import {FormControl, InputLabel, MenuItem, Select, WithStyles, withStyles} from '@material-ui/core';
import {connect} from 'react-redux';

import {AppState} from '../../redux';
import {getSelectedSeqPlatformParams, getSeqPlatformList} from '../../redux/selectors';
import {selectName} from '../../redux/selectedSeqPlatformParams/actions';
import {SelectedSeqPlatformParams} from '../../redux/selectedSeqPlatformParams/types';
import {SeqPlatformList} from '../../redux/seqPlatformList/types';
import styles from '../styles';


interface Props extends WithStyles<typeof styles> {
  selectName: typeof selectName,
  seqPlatformList: SeqPlatformList,
  selectedSeqPlatformParams: SelectedSeqPlatformParams
}

class NameSelector extends React.Component<Props> {

  handleChange = (event: any) => {
    const target = event.target;
    const value = target.value;
    this.props.selectName(value);
  };

  render() {
    const {seqPlatformList, selectedSeqPlatformParams, classes} = this.props;
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="seq-platform-name">Sequencing Platform</InputLabel>
        <Select
          id="seq-platform-name"
          name="name"
          value={selectedSeqPlatformParams.name}
          onChange={this.handleChange}
        >
          {seqPlatformList.map(platform => (
            <MenuItem key={platform.name} value={platform.name}>
              {platform.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }
}


const mapStateToProps = (state: AppState) => {
  const seqPlatformList = getSeqPlatformList(state);
  const selectedSeqPlatformParams = getSelectedSeqPlatformParams(state);
  return {seqPlatformList, selectedSeqPlatformParams};
};

export default withStyles(styles)(connect(mapStateToProps, {selectName})(NameSelector));

