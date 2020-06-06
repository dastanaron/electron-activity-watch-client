import {ipcMain, IpcMainEvent, BrowserWindow} from "electron";
import {IPCCommand} from "../../common/Contracts/IPC";
import {IPCHandler} from "./Handlers/IPCHandler";
import BucketControl from "./Handlers/BucketControl";

export const DEFAULT_CHANNEL_MAIN = 'toMain';
export const DEFAULT_CHANNEL_RENDER = 'toRender';

interface CommandMatchType
{
    [key: string]: IPCHandler,
}

export const CommandMatchType: CommandMatchType = {
    'bucket.control': BucketControl,
};

export function listen(window: BrowserWindow, channel: string = DEFAULT_CHANNEL_MAIN): void
{
    ipcMain.on(channel, (event:IpcMainEvent, command: IPCCommand) => {
        getHandlerByType(command.type).handle(command, event, window)
    });
}

export function getHandlerByType(type: string): IPCHandler
{
    return CommandMatchType[type];
}
