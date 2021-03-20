import BP from './BP';
import calcSampleLoadList from './Calculator';
import {ADD_SAMPLE, DELETE_SAMPLE, SampleList} from '../redux/sampleList/types';
import {SelectedSeqPlatform} from '../redux/selectedSeqPlatformParams/types';
import {sampleListReducer} from '../redux/sampleList/reducers';

describe('coverageX calculation', () => {
  let selectedSeqPlatform: SelectedSeqPlatform;
  let sampleList: SampleList;

  beforeAll(() => {
    selectedSeqPlatform = {
      name: '',
      mode: '',
      capacity: new BP('120gbp'),
      readLen: 150,
      readEnd: 2,
    };
    sampleList = sampleListReducer(undefined, {
      type: ADD_SAMPLE, payload: {
        type: '',
        num: '2',
        coverageX: '100',
        size: '60mbp',
      }
    });
  });

  afterAll(() => {
    sampleListReducer(undefined, {type: DELETE_SAMPLE, payload: {id: sampleList[0].id}});
  });

  test('sample list load calculation', () => {
    const sampleLoadList = calcSampleLoadList(sampleList, selectedSeqPlatform);
    expect(sampleLoadList.length).toEqual(1);
    expect(sampleLoadList[0].percent).toEqual(10);

  });
});


describe('coverageNumReads calculation', () => {
  let selectedSeqPlatform: SelectedSeqPlatform;
  let sampleList: SampleList;

  beforeAll(() => {
    selectedSeqPlatform = {
      name: '',
      mode: '',
      capacity: new BP('120gbp'),
      readLen: 150,
      readEnd: 2,
    };
    sampleList = sampleListReducer(undefined, {
      type: ADD_SAMPLE, payload: {
        type: '',
        num: '1000',
        coverageNumReads: '50000',
      }
    });
  });

  afterAll(() => {
    sampleListReducer(undefined, {type: DELETE_SAMPLE, payload: {id: sampleList[0].id}});
  });

  test('sample list load calculation', () => {
    const sampleLoadList = calcSampleLoadList(sampleList, selectedSeqPlatform);
    expect(sampleLoadList.length).toEqual(1);
    expect(sampleLoadList[0].percent).toEqual(12.5);
  });
});


