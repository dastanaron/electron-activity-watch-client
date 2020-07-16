import { ipcMain, IpcMainEvent, BrowserWindow } from 'electron';
import { IPCCommand, DEFAULT_CHANNEL_MAIN, STATUS_ERROR, DEFAULT_CHANNEL_RENDER } from '../../common/Contracts/IPC';
import { prepareErrorResponse } from './Response';
import { IPCHandler } from './Handlers/IPCHandler';
import BucketControl from './Handlers/BucketControl';
import Utils from '../../common/Utils/Utils';

interface CommandMatchType {
    [key: string]: IPCHandler;
}

export const CommandMatchType: CommandMatchType = {
    'bucket.control': BucketControl,
};

export function listen(window: BrowserWindow, channel: string = DEFAULT_CHANNEL_MAIN): void {
    ipcMain.on(channel, (event: IpcMainEvent, command: IPCCommand) => {
        const handler = getHandlerByType(command.type);
        if (!handler) {
            event.sender.send(
                Utils.object.getIfExists(command.data, 'answerChannel', DEFAULT_CHANNEL_RENDER),
                prepareErrorResponse(`Undefined handler for the ${command.type} command`),
            );
            return;
        }
        handler.handle(command, event, window);
    });
}

export function getHandlerByType(type: string): IPCHandler {
    return CommandMatchType[type];
}
