import { Module } from 'vuex';
import { ApplicationSettings } from '../../../../common/Contracts/ApplicationSettings';
import {
    DEFAULT_BUCKET_ID,
    DEFAULT_BUCKET_CLIENT,
    DEFAULT_BUCKET_HOSTNAME,
} from '../../../../main/ActivityWatch/API/Buckets';

export const BUCKET_ID = 'bucketId';
export const BUCKET_CLIENT_NAME = 'bucketClientName';
export const BUCKET_HOSTNAME = 'bucketHostname';
export const ACCEPTABLE_DOWNTIME = 'acceptableDowntime';

const applicationSettings: Module<ApplicationSettings, any> = {
    state: {
        [BUCKET_ID]: DEFAULT_BUCKET_ID,
        [BUCKET_CLIENT_NAME]: DEFAULT_BUCKET_CLIENT,
        [BUCKET_HOSTNAME]: DEFAULT_BUCKET_HOSTNAME,
        [ACCEPTABLE_DOWNTIME]: 30 * 60,
    },
    getters: {
        [BUCKET_ID]: (state: ApplicationSettings) => state[BUCKET_ID],
        [BUCKET_CLIENT_NAME]: (state: ApplicationSettings) => state[BUCKET_CLIENT_NAME],
        [BUCKET_HOSTNAME]: (state: ApplicationSettings) => state[BUCKET_HOSTNAME],
        [ACCEPTABLE_DOWNTIME]: (state: ApplicationSettings) => state[ACCEPTABLE_DOWNTIME],
    },
    mutations: {
        [BUCKET_ID]: (state: ApplicationSettings, value: string) => (state[BUCKET_ID] = value),
        [BUCKET_CLIENT_NAME]: (state: ApplicationSettings, value: string) => (state[BUCKET_CLIENT_NAME] = value),
        [BUCKET_HOSTNAME]: (state: ApplicationSettings, value: string) => (state[BUCKET_HOSTNAME] = value),
        [ACCEPTABLE_DOWNTIME]: (state: ApplicationSettings, value: number) => (state[ACCEPTABLE_DOWNTIME] = value),
    },
};

export default applicationSettings;
