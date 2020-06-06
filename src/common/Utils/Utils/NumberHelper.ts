
export default class NumberHelper
{
    public isNumber(data: any): boolean
    {
        return typeof data === 'number';
    }

    public formatNumberToPrice(value: number, currency: string = 'USD', locale: string = 'en-US'): string
    {
        return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(value).replace(/\,00/, '');
    }

    public getRandomInteger(min: number, max: number) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }
}
