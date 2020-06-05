import Buckets from "./Buckets";
import {Declarator} from "./Declarator";

export default class Wrapper
{
    public static getDeclarator(): Declarator
    {
        return new Declarator();
    }

    /**
     * If you need more parameters, then do not use a wrapper, use class import directly
     * @param declarator
     */
    public static getBucketsAPI(declarator?: Declarator): Buckets
    {
        if (!declarator) {
            return new Buckets(Wrapper.getDeclarator());
        }
        return new Buckets(declarator);
    }
}
