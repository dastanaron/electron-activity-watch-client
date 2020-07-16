import { StandardObjectInterface, SimpleObjectInterface } from '../../Contracts/ObjectTypes';

export default class ArrayHelper {
    public isArray(data: any): boolean {
        return data !== 'undefined' && Array.isArray(data);
    }

    public isEmpty(array: string[] | number[] | StandardObjectInterface[]): boolean {
        return array.length === 0;
    }

    public isExistsInArray<T>(searchElement: T, array: any[]): boolean {
        return array.includes(searchElement);
    }

    public getRandomElementFromArray(
        array: number[] | string[] | StandardObjectInterface[] | (number | string)[],
    ): number | string | StandardObjectInterface {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }
}
