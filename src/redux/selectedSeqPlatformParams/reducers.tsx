import {SELECT_MODE, SELECT_NAME, SELECT_READ_PARAMS, SelectedSeqPlatformParams, ActionTypes} from './types';

const initialState: SelectedSeqPlatformParams = {
  name: '',
  mode: '',
  readParams: '',
};

export function selectedSeqPlatformParamsReducer(
  state = initialState,
  action: ActionTypes
): SelectedSeqPlatformParams {
  switch (action.type) {
    case SELECT_NAME: {
      const {name} = action.payload;
      return {
        ...initialState,
        name,
      };
    }
    case SELECT_MODE: {
      const {mode} = action.payload;
      return {
        ...initialState,
        name: state.name,
        mode,
      };
    }
    case SELECT_READ_PARAMS: {
      const {readParams} = action.payload;
      return {
        ...state,
        readParams,
      };
    }
    default: {
      return state;
    }
  }
}
