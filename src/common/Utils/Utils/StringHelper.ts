export default class StringHelper {
    public capitalizeFirstLetter(string: string): string {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    public isString(data: any): boolean {
        return typeof data === 'string';
    }

    public isEmpty(string: string): boolean {
        return !string || string.length === 0;
    }

    public cropText(text: string, maxLength = 500, trailingCharacters = '...'): string {
        let croppedText = text.trim();
        if (croppedText.length <= maxLength) return croppedText;

        croppedText = croppedText.slice(0, maxLength);

        return croppedText.trim() + trailingCharacters;
    }

    public numberToStringForm(number: number, textForms: string[]): string {
        const absoluteNumber = Math.abs(number) % 100;
        const latestNumber = absoluteNumber % 10;
        if (absoluteNumber > 10 && absoluteNumber < 20) {
            return textForms[2];
        }
        if (latestNumber > 1 && latestNumber < 5) {
            return textForms[1];
        }
        if (latestNumber == 1) {
            return textForms[0];
        }
        return textForms[2];
    }
}
