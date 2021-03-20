export interface EditingSample {
  sampleId: number;
  fieldName: string;
  fieldValue: string;
}

export const SET_EDITING_SAMPLE = 'SET_EDITING_SAMPLE';

export interface SetEditingSampleAction {
  type: typeof SET_EDITING_SAMPLE;
  payload: {
    sampleId: number
    fieldName: string;
    fieldValue: string;
  };
}
