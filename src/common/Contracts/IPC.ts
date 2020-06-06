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
