import {combineReducers, createStore} from 'redux';
import {sampleListReducer} from './sampleList/reducers'
import {sampleTypeListReducer} from './sampleTypeList/reducers'
import {seqPlatformListReducer} from './seqPlatformList/reducers'
import {selectedSeqPlatformParamsReducer} from './selectedSeqPlatformParams/reducers'
import {editingSampleReducer} from './editingSample/reducers'

const rootReducer = combineReducers({
  sampleList: sampleListReducer,
  sampleTypeList: sampleTypeListReducer,
  seqPlatformList: seqPlatformListReducer,
  selectedSeqPlatformParams: selectedSeqPlatformParamsReducer,
  editingSample: editingSampleReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default createStore(rootReducer);
