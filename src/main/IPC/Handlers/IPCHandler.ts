import {HandlerInterface} from "../../../common/Contracts/Handlers";
import {IPCCommand} from "../../../common/Contracts/IPC";
import {IpcMainEvent, BrowserWindow} from "electron";

export interface IPCHandler extends HandlerInterface
{
    handle(command: IPCCommand, event: IpcMainEvent, window?: BrowserWindow): void;
}
