(function(Scratch) {
  'use strict';

  class NumberAbbreviator {
    getInfo() {
      return {
        id: 'numberabbreviator',
        name: 'Number Abbreviator',
        blocks: [
          {
            opcode: 'abbreviateNumber',
            blockType: Scratch.BlockType.REPORTER,
            text: 'abbreviate [n] to [d] decimal places',
            arguments: {
              n: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1000
              },
              d: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2
              }
            }
          }
        ]
      };
    }

    abbreviateNumber(args) {
	  if (args.n < 1000) {
		  return args.n
	  }
      const number = args.n;
      const decimalPoints = args.d;
      const abbreviations = ['', 'K', 'M', 'B', "Tr", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc", "Udc", "Ddc", "Tdc", "Qadc", "Qidc", "Sxdc", "Spdc", "Ocdc", "Nmdc", "Vg"];
      const log1000 = Math.floor(Math.log10(number) / 3);
      const abbreviatedNumber = (number / Math.pow(1000, log1000)).toFixed(decimalPoints) + abbreviations[log1000];
      return abbreviatedNumber;
    }
  }

  Scratch.extensions.register(new NumberAbbreviator());
})(Scratch);
