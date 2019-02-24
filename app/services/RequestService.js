import {config} from '../config/config';
import {StorageService} from "./StorageService";

let accessToken = null;

StorageService.retrieveData('accessToken').then(value => accessToken = value);

export const RequestService  = {
    get(url, data) {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };

        if (data) url += (url.indexOf('?') === -1 ? '?' : '&') + this.queryParams(data);
        if (accessToken) options.headers.Authorization = `Bearer ${accessToken}`;

        return fetch(`${config.apiHost}${url}`, options).then(response => response.json());
    },
    post() {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body
        };

        if (accessToken) options.headers.Authorization = `Bearer ${accessToken}`;

        console.log('REQUEST OPTIONS --- ', options);

        return fetch(`${config.apiHost}${url}`, options).then(response => response.json());
    },
    formDat(url, body) {
        return fetch(`${config.apiHost}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body
        }).then((response) => response.json())
    },
    queryParams(params) {
        return Object.keys(params)
            .filter(k => !!params[k])
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');
    }
};
