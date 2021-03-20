import BP from '../../logic/BP';

export const validateType = (val: string) => {
  let error;
  if (!val) {
    error = 'Select a type'
  }
  return error;
};

export const validateNumber = (val: string) => {
  if (!val) {
    return 'Enter a number of samples'
  }
  return validatePositiveInt(val)
};

export const validatePositiveInt = (val: string) => {
  const n = Math.floor(Number(val));
  const test = n !== Infinity && String(n) === val && n > 0;
  let error;
  if (!test) {
    error = 'Enter a positive integer number';
  }
  return error;
};

export const validateCoverage = (val: string) => {
  if (!val) {
    return 'Enter a coverage'
  }
  return validatePositiveInt(val)
};

export const validateSize = (val: string) => {
  let error;
  try {
    new BP(val);
  } catch (e) {
    error = e.message + '. Valid examples: 10 Mbp, 3bp';
  }
  return error;
};
