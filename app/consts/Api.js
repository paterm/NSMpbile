import {config} from '../config/config'
const HOST = config.apiHost;

export const Api = {
    auth: {
        token: `${HOST}/token`
    },
    attachment: {
        upload: `${HOST}/attachment/upload`,
        get: `${HOST}/attachment/get/`
    },
    profile: {
        get: {
            byId: '/profile/get',
            full: '/profile/get/full/'
        }
    }
};
