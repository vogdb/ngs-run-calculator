import seqPlatformList from './seqPlatformList.json';
import {SeqPlatformList} from './types';

const initialState = seqPlatformList as SeqPlatformList;

export function seqPlatformListReducer(state = initialState): SeqPlatformList {
  return state;
}
