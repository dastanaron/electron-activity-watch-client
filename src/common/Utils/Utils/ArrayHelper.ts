export default class ArrayHelper
{
    public isArray(data: any): boolean
    {
        return data !== 'undefined' && Array.isArray(data);
    }

    public isEmpty(array: string[] | number[] | object[]): boolean
    {
        return array.length === 0;
    }

    public getRandomElementFromArray(array: number[] | string[] | object[] | (number|string)[]): number | string | object
    {
        let randomIndex = Math.floor(Math.random() * (array.length));
        return array[randomIndex];
    }
}
