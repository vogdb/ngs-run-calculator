import BP from '../logic/BP';
import {AppState} from './index';
import {SeqPlatform, SeqPlatformList, SeqPlatformModes, SeqPlatformReadParams} from './seqPlatformList/types';
import {SampleList} from './sampleList/types';
import {SelectedSeqPlatform, SelectedSeqPlatformParams} from './selectedSeqPlatformParams/types';
import {SampleTypeList} from './sampleTypeList/types';

export const getSelectedSeqPlatformParams = (store: AppState) =>
  store.selectedSeqPlatformParams ? store.selectedSeqPlatformParams : {} as SelectedSeqPlatformParams;

export const getSeqPlatformList = (store: AppState) =>
  store.seqPlatformList ? store.seqPlatformList : [] as SeqPlatformList;

export const getSeqPlatformByName = (store: AppState, name: string) => {
  if (store.seqPlatformList && name) {
    const seqPlatform = store.seqPlatformList.find((platform: SeqPlatform) => platform.name === name);
    if (seqPlatform) {
      return seqPlatform;
    }
  }
  return {} as SeqPlatform;
};

export const getSampleTypeList = (store: AppState) =>
  store.sampleTypeList ? store.sampleTypeList : [] as SampleTypeList;

export const getSampleList = (store: AppState) =>
  store.sampleList ? store.sampleList : [] as SampleList;

export const getSeqPlatformModes = (store: AppState) => {
  const params = getSelectedSeqPlatformParams(store);
  const seqPlatform = getSeqPlatformByName(store, params.name);
  return seqPlatform.modes ? seqPlatform.modes : {} as SeqPlatformModes;
};

export const getSeqPlatformReadParams = (store: AppState) => {
  const params = getSelectedSeqPlatformParams(store);
  const modes = getSeqPlatformModes(store);
  return Object.keys(modes).length > 0 && params.mode ? modes[params.mode] : {} as SeqPlatformReadParams;
};

export const getSelectedSeqPlatform = (store: AppState) => {
  const {name, mode, readParams} = getSelectedSeqPlatformParams(store);
  if (name && mode && readParams) {
    const seqPlatform = getSeqPlatformByName(store, name);
    if (seqPlatform.modes) {
      const [readLen, readEnd] = readParams.split('x');
      const capacity = new BP(seqPlatform.modes[mode][readParams]);
      return {
        name, mode, capacity, readLen: parseInt(readLen, 10), readEnd: parseInt(readEnd, 10)
      } as SelectedSeqPlatform;
    }
  }
  return null;
};

