import {ADD_SAMPLE, DELETE_SAMPLE, EDIT_SAMPLE, Sample, SampleList, SampleListActionTypes,} from './types';
import BP from '../../logic/BP';

const initialState: SampleList = [];

const colorList = [
  '#4281a4',
  '#48a9a6',
  '#d4b483',
  '#c1666b',
  '#63a332',
  '#995d81',
  '#fff07c',
  '#87f1ff',
  '#ffbbff',
];

export function sampleListReducer(
  state = initialState,
  action: SampleListActionTypes
): SampleList {
  switch (action.type) {
    case ADD_SAMPLE:
      const sampleForm = action.payload;
      const newId = generateId(state);
      let newSample = new Sample();
      newSample = Object.assign(newSample, {
        id: newId,
        type: sampleForm.type,
        num: Number(sampleForm.num),
        size: sampleForm.size ? new BP(sampleForm.size) : undefined,
        coverageX: sampleForm.coverageX ? Number(sampleForm.coverageX) : undefined,
        coverageNumReads: sampleForm.coverageNumReads ? Number(sampleForm.coverageNumReads) : undefined,
        color: colorList[newId % colorList.length]
      });

      return [...state, newSample];

    case EDIT_SAMPLE:
      const {sampleId, fieldName, fieldValue} = action.payload;
      const sample = state.find(s => s.id === sampleId);
      if (!!sample) {
        switch (fieldName) {
          case 'num':
            sample.num = Number(fieldValue);
            break;
          case 'size':
            sample.size = new BP(fieldValue);
            break;
          case 'coverage':
            if (sample.coverageX) {
              sample.coverageX = Number(fieldValue);
            } else if (sample.coverageNumReads) {
              sample.coverageNumReads = Number(fieldValue);
            }
            break;
        }
      }
      return state;

    case DELETE_SAMPLE:
      const {id} = action.payload;
      return state.filter((sample) => {
        return sample.id !== id;
      });
    default:
      return state;
  }
}

function generateId(state: SampleList): number {
  const sampleIds = state.map(sample => sample.id);
  if (sampleIds.length > 0) {
    return Math.max(...sampleIds as number[]) + 1;
  } else {
    return 0;
  }
}
