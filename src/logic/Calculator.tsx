import BP from './BP';
import {Sample, SampleList} from '../redux/sampleList/types';
import {SelectedSeqPlatform} from '../redux/selectedSeqPlatformParams/types';

export interface SampleLoad {
  color: string,
  percent: number,
}

export function calcSampleLoad(sample: Sample, selectedSeqPlatform: SelectedSeqPlatform): BP {
  const {num, size, coverageX, coverageNumReads} = sample;
  let load = new BP('1bp');
  if (coverageNumReads) {
    const {readLen, readEnd} = selectedSeqPlatform;
    load.mulNum(num * coverageNumReads * readLen * readEnd);
  } else if (coverageX && size) {
    load = new BP(size.toOriginalString());
    load.mulNum(num * coverageX);
  }
  return load;
}

export default function calcSampleLoadList(sampleList: SampleList, selectedSeqPlatform: SelectedSeqPlatform): SampleLoad[] {
  const sampleLoadList = [];

  for (const sample of sampleList) {
    const load = calcSampleLoad(sample, selectedSeqPlatform);
    const sampleLoad = {color: sample.color, percent: load.percentRatio(selectedSeqPlatform.capacity)};
    sampleLoadList.push(sampleLoad);
  }
  return sampleLoadList;
}
