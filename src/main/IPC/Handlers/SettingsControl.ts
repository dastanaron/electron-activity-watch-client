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
import { BrowserWindow, IpcMainEvent } from 'electron';
import Utils from '../../../common/Utils/Utils';
import { ApplicationSettings } from '../../../common/Contracts/ApplicationSettings';
import { prepareErrorResponse, prepareSuccessResponse } from '../Response';
import { DEFAULT_BUCKET_ID } from '../../ActivityWatch/API/Buckets';
import * as path from 'path';
import * as fs from 'fs';

export class SettingsControl implements IPCHandler {
    protected settingsPath: string;

    constructor() {
        if (process.env.NODE_ENV === 'development') {
            this.settingsPath = path.resolve(__dirname, '../../../../', 'configuration.json');
        } else {
            this.settingsPath = path.resolve(__dirname, './', 'configuration.json');
        }
    }

    handle(command: IPCCommand, event: IpcMainEvent, window: BrowserWindow) {
        switch (command.target) {
            case 'getSettings':
                this.getSettings(command, event);
                break;
            case 'createSettings':
                this.createSettings(command, event);
                break;
            case 'updateSettings':
                this.updateSettings(command, event);
                break;
            default:
                break;
        }
    }

    private getSettings(command: IPCCommand, event: IpcMainEvent): void {
        try {
            const settings = fs.readFileSync(this.settingsPath);
            event.sender.send(
                Utils.object.getIfExists(command.data, 'answerChannel', DEFAULT_CHANNEL_RENDER),
                prepareSuccessResponse(JSON.parse(settings.toString()), 'settings.getting'),
            );
        } catch (Error) {
            event.sender.send(
                Utils.object.getIfExists(command.data, 'answerChannel', DEFAULT_CHANNEL_RENDER),
                prepareErrorResponse(`Configuration load error`, { error: Error }, 'settings.getting'),
            );
        }
    }

    private createSettings(
        command: IPCCommand,
        event: IpcMainEvent,
        successMessage = 'Config file created successfully',
    ): void {
        try {
            const settings = command.data.form;
            fs.writeFileSync(this.settingsPath, JSON.stringify(settings, null, 4));
            event.sender.send(
                Utils.object.getIfExists(command.data, 'answerChannel', DEFAULT_CHANNEL_RENDER),
                prepareSuccessResponse({ message: successMessage }, 'settings.created'),
            );
        } catch (Error) {
            event.sender.send(
                Utils.object.getIfExists(command.data, 'answerChannel', DEFAULT_CHANNEL_RENDER),
                prepareErrorResponse(`Cannot save the configuration file`, { error: Error }, 'settings.created'),
            );
        }
    }

    private updateSettings(command: IPCCommand, event: IpcMainEvent): void {
        fs.unlinkSync(this.settingsPath);
        this.createSettings(command, event, 'Config file updated successfully');
    }
}

export default new SettingsControl();
