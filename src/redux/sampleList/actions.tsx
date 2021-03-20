import {ADD_SAMPLE, DELETE_SAMPLE, EDIT_SAMPLE, SampleForm} from './types';
import {EditingSample} from "../editingSample/types";

export function addSample(sampleForm: SampleForm) {
  return {
    type: ADD_SAMPLE,
    payload: sampleForm
  };
}

export function editSample(editSample: EditingSample) {
  return {
    type: EDIT_SAMPLE,
    payload: editSample
  };
}

export function deleteSample(id: number) {
  return {
    type: DELETE_SAMPLE,
    payload: {
      id
    }
  };
}
