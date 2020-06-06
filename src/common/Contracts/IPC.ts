import {StandardObjectInterface} from "./ObjectTypes";

export interface IPCCommand extends StandardObjectInterface
{
    type: string,
    target?: string,
    data?: StandardObjectInterface,
}

export interface IPCMainAnswer extends StandardObjectInterface
{
    status: string,
    statusCode?: number,
    data?: StandardObjectInterface,
}

export interface IPCErrorAnswer extends IPCMainAnswer
{
    message: string,
}

export const STATUS_SUCCESS = 'ok';
export const STATUS_ERROR   = 'error';

export const DEFAULT_CHANNEL_MAIN = 'toMain';
export const DEFAULT_CHANNEL_RENDER = 'toRender';
