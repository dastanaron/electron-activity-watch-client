import { StandardObjectInterface } from '../../common/Contracts/ObjectTypes';
import { IPCErrorAnswer, IPCMainAnswer, STATUS_ERROR, STATUS_SUCCESS } from '../../common/Contracts/IPC';

export function prepareSuccessResponse(data: StandardObjectInterface = {}): IPCMainAnswer {
    return {
        status: STATUS_SUCCESS,
        data: data,
    } as IPCMainAnswer;
}

export function prepareErrorResponse(message: string, data: StandardObjectInterface = {}): IPCErrorAnswer {
    return {
        status: STATUS_ERROR,
        message: message,
        data: data,
    } as IPCErrorAnswer;
}
