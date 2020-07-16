import { StandardObjectInterface } from '../../common/Contracts/ObjectTypes';
import { IPCErrorAnswer, IPCMainAnswer, STATUS_ERROR, STATUS_SUCCESS } from '../../common/Contracts/IPC';

export function prepareSuccessResponse(data: StandardObjectInterface = {}, target = 'answer'): IPCMainAnswer {
    return {
        status: STATUS_SUCCESS,
        data: data,
        target: target
    } as IPCMainAnswer;
}

export function prepareErrorResponse(message: string, data: StandardObjectInterface = {}, target = 'error'): IPCErrorAnswer {
    return {
        status: STATUS_ERROR,
        message: message,
        data: data,
        target: target,
    } as IPCErrorAnswer;
}
