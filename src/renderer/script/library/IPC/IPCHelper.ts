import { ipcRenderer, IpcRendererEvent } from 'electron';
import {IPCMainAnswer, IPCCommand, DEFAULT_CHANNEL_RENDER, DEFAULT_CHANNEL_MAIN} from "../../../../common/Contracts/IPC";

export default class IPCHelper
{
    static listen(callback: (event: IpcRendererEvent, command: IPCMainAnswer) => any, channel: string = DEFAULT_CHANNEL_RENDER): void
    {
        ipcRenderer.on(channel, callback);
    }

    static send(command: IPCCommand, channel: string = DEFAULT_CHANNEL_MAIN): void
    {
        ipcRenderer.send(channel, command);
    }
}
