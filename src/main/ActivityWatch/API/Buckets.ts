import {hostname} from 'os';
import fetch from 'node-fetch';
import {Declarator} from "./Declarator";
import {METHOD_GET, METHOD_POST, METHOD_UPDATE, METHOD_DELETE} from "../../../common/Contracts/HTTP";
import {SimpleObjectInterface} from "../../../common/Contracts/ObjectTypes";

export const DEFAULT_SPACE = '/api/0/buckets/';

export const DEFAULT_BUCKET_ID       = `aw-electron-client_${hostname()}`;
export const DEFAULT_BUCKET_CLIENT   = 'aw-electron-client';
export const DEFAULT_BUCKET_TYPE     = 'aw-manual-timer';
export const DEFAULT_BUCKET_HOSTNAME = hostname();

export default class Buckets
{
    protected addressDeclarator: Declarator;
    protected entryPoint: string;

    constructor(declarator: Declarator, entryPoint: string = DEFAULT_SPACE)
    {
        this.entryPoint = entryPoint;
        this.addressDeclarator = declarator;
        this.addressDeclarator.setEntryPoint(entryPoint);
    }

    public loadAllBuckets(): Promise<any>
    {
        return fetch(this.addressDeclarator.getUrl(), {method: METHOD_GET})
        .then(res => res.json());
    }

    public createBucket(bucketId: string = DEFAULT_BUCKET_ID,
                        bucketClient: string = DEFAULT_BUCKET_CLIENT,
                        bucketType: string = DEFAULT_BUCKET_TYPE,
                        bucketHostname: string = DEFAULT_BUCKET_HOSTNAME): Promise<any>
    {
        return fetch(`${this.addressDeclarator.getUrl()}${bucketId}`, {
            method: METHOD_POST,
            body: JSON.stringify({
                client: bucketClient,
                type: bucketType,
                hostname: bucketHostname,
            }),
            headers: { 'Content-Type': 'application/json', 'accept': 'application/json' },
        }).then(res => res.json());
    }

    public deleteBucketById(bucketId: string = DEFAULT_BUCKET_ID, force: number = 1): Promise<any>
    {
        return fetch(`${this.addressDeclarator.getUrl()}${bucketId}?force=${force}`, {
            method: METHOD_DELETE,
        })
        .then(res => res.json());
    }

    public loadBucketMetaByID(bucketId: string = DEFAULT_BUCKET_ID): Promise<any>
    {
        return fetch(`${this.addressDeclarator.getUrl()}${bucketId}`, {method: METHOD_GET})
        .then(res => res.json());
    }

    public pushHeartBeat(timeStamp: Date, duration: number,
                         data: SimpleObjectInterface,
                         pulseTime: number,
                         bucketId: string = DEFAULT_BUCKET_ID
    ): Promise<any>
    {
        return fetch(`${this.addressDeclarator.getUrl()}${bucketId}/heartbeat?pulsetime=${pulseTime}`, {
            method: METHOD_POST,
            body: JSON.stringify({
                timestamp: timeStamp.toUTCString(),
                duration: duration,
                data: data,
            }),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json());
    }
}
