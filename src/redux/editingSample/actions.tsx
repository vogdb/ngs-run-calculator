import {SET_EDITING_SAMPLE} from './types';

export function setEditingSample(sampleId: number, fieldName: string, fieldValue: string) {
  return {
    type: SET_EDITING_SAMPLE,
    payload: {
      sampleId,
      fieldName,
      fieldValue
    }
  };
}
