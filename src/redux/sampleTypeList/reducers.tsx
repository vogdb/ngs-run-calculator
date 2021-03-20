import sampleTypeList from './sampleTypeList.json';
import {SampleTypeList} from './types';

const initialState = sampleTypeList as SampleTypeList;

export function sampleTypeListReducer(state = initialState): SampleTypeList {
  return state;
}
