import ArrayHelper from './ArrayHelper';

export default class CodeGenerator {
    private readonly commonSymbols: string[] = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
    ];

    private readonly numericSymbols: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 9];

    private readonly arrayHelper: ArrayHelper;

    constructor() {
        this.arrayHelper = new ArrayHelper();
    }

    public generateLetterSymbolsCode(length = 4): string {
        return this.generate(this.commonSymbols, length);
    }

    public generateNumericCode(length = 4): string {
        return this.generate(this.numericSymbols, length);
    }

    public generateMixCode(length = 4): string {
        const symbols = [...this.commonSymbols, ...this.numericSymbols];
        return this.generate(symbols, length);
    }

    private generate(symbols: (number | string)[], length: number): string {
        let code = '';

        for (let i = 1; i <= length; i++) {
            code += this.arrayHelper.getRandomElementFromArray(symbols).toString();
        }

        return code;
    }
}
