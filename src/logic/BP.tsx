export default class BP {

  public static PATTERN = '^([0-9]+(?:[.,][0-9]+)?)\\s*([kmgtKMGT]?)[bB][pP]$';
  protected static REGEX = new RegExp(BP.PATTERN);
  protected static PREFIX_FACTORS = {
    'K': 1000, 'M': 1000 * 1000, 'G': 1000 * 1000 * 1000, 'T': 1000 * 1000 * 1000 * 1000
  };

  protected static parse(bpStr: string) {
    const match = BP.REGEX.exec(bpStr);
    if (match) {
      const num = parseFloat(match[1].replace(',', '.'));
      const prefix = match[2] ? match[2].toUpperCase() : undefined;
      return {num, prefix};
    }
    return {};
  }

  valueBP: number;
  num: number;
  prefix?: string;

  constructor(bpStr: string) {
    const {num, prefix} = BP.parse(bpStr);
    if (!num && num !== 0) {
      throw new SyntaxError('Invalid BP string format');
    }
    let prefixFactor = 1;
    if (prefix) {
      prefixFactor = BP.PREFIX_FACTORS[prefix];
    }
    const valueBP = num * prefixFactor;
    if (valueBP < 1) {
      throw new SyntaxError('BP value is less than 1bp');
    }
    this.valueBP = Math.round(valueBP);
    this.num = num;
    this.prefix = prefix;

  }

  mulNum(num: number): void {
    this.valueBP = this.valueBP * num;
  };

  plusBP(bp: BP): void {
    this.valueBP = this.valueBP + bp.valueBP;
  };

  percentRatio(bp: BP): number {
    const toPercent = 100;
    const roundTo2Decimal = 100;
    return Math.round(toPercent * roundTo2Decimal * this.valueBP / bp.valueBP) / roundTo2Decimal;
  };

  toOriginalString(): string {
    return this.num + ' ' + (this.prefix ? this.prefix.toUpperCase() : '') + 'bp';
  }

  toOptimalString(): string {
    const mgntdOrder = Math.floor(Math.log10(this.valueBP));
    if (mgntdOrder < 1) {
      return this.valueBP + 'bp';
    }
    const mgntd = Math.pow(10, mgntdOrder);
    let prefixName;
    let prefixValue;
    for (prefixName of Object.keys(BP.PREFIX_FACTORS)) {
      prefixValue = BP.PREFIX_FACTORS[prefixName];
      if (mgntd >= prefixValue && mgntd < prefixValue * 1000) {
        break;
      }
    }
    return `${Math.floor((this.valueBP / prefixValue) * 1000) / 1000} ${prefixName}bp`;
  }
}
