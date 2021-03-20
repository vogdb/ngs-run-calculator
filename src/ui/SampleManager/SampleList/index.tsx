import React from 'react';
import {connect} from 'react-redux';
import {Grid, Hidden, Typography} from '@material-ui/core';

import {AppState} from '../../../redux';
import {deleteSample, editSample} from '../../../redux/sampleList/actions';
import {getSampleList, getSampleTypeList, getSelectedSeqPlatform} from '../../../redux/selectors';
import {SampleTypeList as SampleTypeListType} from '../../../redux/sampleTypeList/types';
import {SampleList as SampleListType} from '../../../redux/sampleList/types';
import {SelectedSeqPlatform} from '../../../redux/selectedSeqPlatformParams/types';
import {setEditingSample} from '../../../redux/editingSample/actions';

import SampleListNarrow from './narrow';
import SampleListWide from './wide';
import EditingSampleForm from './EditingSampleForm';
import {EditingSample} from '../../../redux/editingSample/types';

export interface Props {
  sampleList: SampleListType,
  sampleTypeList: SampleTypeListType,
  selectedSeqPlatform: SelectedSeqPlatform,
  setEditingSample: typeof setEditingSample,
  editingSample: EditingSample,
  editSample: typeof editSample,
  deleteSample: typeof deleteSample,
}

function Index(props: Props) {
  const isSampleList = props.sampleList && props.sampleList.length > 0;
  return (
    isSampleList ? <Grid item xs={12} container spacing={16}>
        <Grid item xs={12}>
          <Typography variant="h6" align="center">Sample List</Typography>
        </Grid>
        <Grid item xs={12}>
          <Hidden mdUp>
            <SampleListNarrow {...props}/>
          </Hidden>
          <Hidden smDown>
            <SampleListWide {...props}/>
          </Hidden>
          <EditingSampleForm {...props}/>
        </Grid>
      </Grid>
      : null
  )
}

const mapStateToProps = (state: AppState) => {
  const sampleList = getSampleList(state);
  const sampleTypeList = getSampleTypeList(state);
  const selectedSeqPlatform = getSelectedSeqPlatform(state);
  const editingSample = state.editingSample;
  return {sampleList, sampleTypeList, selectedSeqPlatform, editingSample};
};

export default connect(mapStateToProps, {deleteSample, editSample, setEditingSample})(Index);
