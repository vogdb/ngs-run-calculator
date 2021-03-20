import BP from './BP'

test('success validation', () => {
  expect(new BP('1bp').valueBP).toEqual(1);
  expect(new BP('0.5 kbp').valueBP).toEqual(500);
  expect(new BP('34.04Kbp').valueBP).toEqual(34040);
  expect(new BP('1.05mbp').valueBP).toEqual(1050000);
  expect(new BP('1,05 mbp').valueBP).toEqual(1050000);
});

test('failed validation', () => {
  expect(() => new BP('')).toThrow(/invalid/i);
  expect(() => new BP(' ')).toThrow(/invalid/i);

  expect(() => new BP('100')).toThrow(/invalid/i);
  expect(() => new BP('100.01')).toThrow(/invalid/i);
  expect(() => new BP('3lbp')).toThrow(/invalid/i);

  expect(() => new BP('0 bp')).toThrow('less than 1bp');
  expect(() => new BP('0.6 bp')).toThrow('less than 1bp');
});

test('to optimal string', () => {
  expect(new BP('1000bp').toOptimalString()).toEqual('1 Kbp');
  expect(new BP('3000000bp').toOptimalString()).toEqual('3 Mbp');
  expect(new BP('1540kbp').toOptimalString()).toEqual('1.54 Mbp');
});
