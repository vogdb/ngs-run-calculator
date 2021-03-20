import {EditingSample, SET_EDITING_SAMPLE, SetEditingSampleAction} from './types';

const initialState: EditingSample = {
  sampleId: -1,
  fieldName: '',
  fieldValue: '',
};

export function editingSampleReducer(
  state = initialState,
  action: SetEditingSampleAction
): EditingSample {
  switch (action.type) {
    case SET_EDITING_SAMPLE: {
      const {sampleId, fieldName, fieldValue} = action.payload;
      return {
        ...initialState,
        sampleId,
        fieldName,
        fieldValue,
      };
    }
    default: {
      return state;
    }
  }
}
