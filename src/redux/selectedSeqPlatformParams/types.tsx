import BP from "../../logic/BP";

export interface SelectedSeqPlatformParams {
  name: string;
  mode: string;
  readParams: string;
}

export interface SelectedSeqPlatform {
  name: string;
  mode: string;
  capacity: BP;
  readLen: number;
  readEnd: number;
}

export const SELECT_NAME = 'SELECT_NAME';
export const SELECT_MODE = 'SELECT_MODE';
export const SELECT_READ_PARAMS = 'SELECT_READ_PARAMS';

interface SelectNameAction {
  type: typeof SELECT_NAME;
  payload: {
    name: string
  };
}

interface SelectModeAction {
  type: typeof SELECT_MODE;
  payload: {
    mode: string
  };
}

interface SelectReadParamsAction {
  type: typeof SELECT_READ_PARAMS;
  payload: {
    readParams: string
  };
}


export type ActionTypes = SelectNameAction | SelectModeAction | SelectReadParamsAction;
