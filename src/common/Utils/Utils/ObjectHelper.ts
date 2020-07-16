import { StandardObjectInterface } from '../../Contracts/ObjectTypes';

export default class ObjectHelper {
    public isObject(data: any): boolean {
        if (data === null || data === undefined) {
            return false;
        }
        return typeof data === 'function' || typeof data === 'object';
    }

    public isExistsProperty(object: StandardObjectInterface, propertyName: string): boolean {
        return object.hasOwnProperty(propertyName);
    }

    public countProperties(object: StandardObjectInterface): number {
        return Object.keys(object).length;
    }

    public isEmpty(object: StandardObjectInterface): boolean {
        return this.countProperties(object) === 0;
    }

    public getIfExists(data: any, key: string, defaultValue: any = null): any {
        if (!this.isObject(data)) {
            return defaultValue;
        }
        if (!this.isExistsProperty(data, key)) {
            return defaultValue;
        }
        return data[key];
    }
}
