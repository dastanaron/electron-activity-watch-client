import {SimpleObjectInterface} from "../../../common/Contracts/ObjectTypes";
import {protocol} from "../../../common/Contracts/HTTP";

export const DEFAULT_HOST  = 'localhost';
export const DEFAULT_PORT  = 5600;

export interface AddressObject extends SimpleObjectInterface
{
    protocol: protocol
    host: string,
    port: number,
    entryPoint?: string,
}

export class Declarator
{
    protected  address: AddressObject;

    constructor()
    {
        this.address = {
            protocol: 'http',
            host: DEFAULT_HOST,
            port: DEFAULT_PORT,
            entryPoint: undefined,
        };
    }

    public setHost(host: string): Declarator
    {
        this.address.host = host;
        return this;
    }

    public setPort(port: number): Declarator
    {
        this.address.port = port;
        return this;
    }

    public setProtocol(protocol: protocol): Declarator
    {
        this.address.protocol = protocol;
        return this;
    }

    public setEntryPoint(entryPoint: string): Declarator
    {
        this.address.entryPoint = entryPoint.replace(/^\\/gi, '');
        return this;
    }

    public getUrl(): string
    {
        return `${this.address.protocol}://${this.address.host}:${this.address.port}${this.address.entryPoint}`;
    }

    public getAddress(): AddressObject
    {
        return this.address;
    }
}

export default new Declarator();
