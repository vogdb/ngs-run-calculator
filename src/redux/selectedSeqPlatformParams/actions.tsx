import {SELECT_MODE, SELECT_NAME, SELECT_READ_PARAMS} from './types';

export function selectName(name: string) {
  return {
    type: SELECT_NAME,
    payload: {
      name
    }
  };
}

export function selectMode(mode: string) {
  return {
    type: SELECT_MODE,
    payload: {
      mode
    }
  };
}

export function selectReadParams(readParams: string) {
  return {
    type: SELECT_READ_PARAMS,
    payload: {
      readParams
    }
  };
}
