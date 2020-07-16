import Wrapper from '../../ActivityWatch/API/Wrapper';
import {
    IPCCommand,
    IPCMainAnswer,
    IPCErrorAnswer,
    DEFAULT_CHANNEL_RENDER,
    STATUS_SUCCESS,
    STATUS_ERROR,
} from '../../../common/Contracts/IPC';
import { IPCHandler } from './IPCHandler';
import Buckets, {
    DEFAULT_BUCKET_ID,
    DEFAULT_BUCKET_CLIENT,
    DEFAULT_BUCKET_HOSTNAME,
    DEFAULT_BUCKET_TYPE,
} from '../../ActivityWatch/API/Buckets';
import { BrowserWindow, IpcMainEvent } from 'electron';
import Utils from '../../../common/Utils/Utils';
import { prepareErrorResponse, prepareSuccessResponse } from '../Response';

export class BucketControl implements IPCHandler {
    protected api: Buckets;

    constructor() {
        const declarator = Wrapper.getDeclarator();
        this.api = Wrapper.getBucketsAPI(declarator);
    }

    handle(command: IPCCommand, event: IpcMainEvent, window: BrowserWindow) {
        switch (command.target) {
            case 'createBucket':
                this.createBucketCommand(command, event);
                break;
            case 'deleteBucket':
                this.deleteBucketCommand(command, event);
                break;
            default:
                break;
        }
    }

    private deleteBucketCommand(command: IPCCommand, event: IpcMainEvent): void {
        const bucketId = Utils.object.getIfExists(command.data, 'bucketId', DEFAULT_BUCKET_ID);
        this.api
            .deleteBucketById(bucketId)
            .then((res) => {
                event.sender.send(
                    Utils.object.getIfExists(command.data, 'answerChannel', DEFAULT_CHANNEL_RENDER),
                    prepareSuccessResponse({ result: res }),
                );
            })
            .catch((Error) => {
                event.sender.send(
                    Utils.object.getIfExists(command.data, 'answerChannel', DEFAULT_CHANNEL_RENDER),
                    prepareErrorResponse(`Cannot delete the bucket with id: ${bucketId}`, { error: Error }),
                );
            });
    }

    private createBucketCommand(command: IPCCommand, event: IpcMainEvent): void {
        const bucketId = Utils.object.getIfExists(command.data, 'bucketId', DEFAULT_BUCKET_ID);
        const bucketClient = Utils.object.getIfExists(command.data, 'bucketClient', DEFAULT_BUCKET_CLIENT);
        const bucketHostname = Utils.object.getIfExists(command.data, 'bucketHostname', DEFAULT_BUCKET_HOSTNAME);
        const bucketType = Utils.object.getIfExists(command.data, 'bucketType', DEFAULT_BUCKET_TYPE);

        this.api
            .createBucket(bucketId, bucketClient, bucketType, bucketHostname)
            .then((res) => {
                event.sender.send(
                    Utils.object.getIfExists(command.data, 'answerChannel', DEFAULT_CHANNEL_RENDER),
                    prepareSuccessResponse({ result: res }),
                );
            })
            .catch((Error) => {
                event.sender.send(
                    Utils.object.getIfExists(command.data, 'answerChannel', DEFAULT_CHANNEL_RENDER),
                    prepareErrorResponse(`Cannot create the bucket with id: ${bucketId}`, { error: Error }),
                );
            });
    }
}

export default new BucketControl();
