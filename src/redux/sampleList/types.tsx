import BP from '../../logic/BP';
import {SampleTypeList} from '../sampleTypeList/types';
import {SelectedSeqPlatform} from '../selectedSeqPlatformParams/types';
import {calcSampleLoad} from '../../logic/Calculator';
import {EditingSample} from "../editingSample/types";

export class Sample {
  id: number;
  type: string;
  num: number;
  coverageX?: number;
  coverageNumReads?: number;
  size?: BP;
  color: string;

  getCoverage() {
    let coverage = this.coverageX ? 'x' + this.coverageX : '';
    return '' + (this.coverageNumReads ? this.coverageNumReads : coverage);
  }

  getTypeName(sampleTypeList: SampleTypeList) {
    const sampleType = sampleTypeList.find(type => type.id === this.type);
    return sampleType ? sampleType.name : null;
  }

  getOutput(seqPlatform: SelectedSeqPlatform): string {
    return calcSampleLoad(this, seqPlatform).toOptimalString();
  }
}

export interface SampleForm {
  type: string;
  num: string;
  coverageX?: string;
  coverageNumReads?: string;
  size?: string;
}

export interface SampleList extends Array<Sample> {
}

export const ADD_SAMPLE = 'ADD_SAMPLE';
export const EDIT_SAMPLE = 'EDIT_SAMPLE';
export const DELETE_SAMPLE = 'DELETE_SAMPLE';

interface AddSampleAction {
  type: typeof ADD_SAMPLE;
  payload: SampleForm;
}

interface EditSampleAction {
  type: typeof EDIT_SAMPLE;
  payload: EditingSample;
}


interface DeleteSampleAction {
  type: typeof DELETE_SAMPLE;
  payload: {
    id: number;
  };
}

export type SampleListActionTypes = AddSampleAction | EditSampleAction | DeleteSampleAction;
