import jwtDecode from 'jwt-decode';
import { StorageService } from './StorageService';
import { ProfileService } from './ProfileService';
import { Api } from '../consts/Api';

export const AuthService = {
    login(data) {
        const loginData = data;

        loginData.grant_type = 'password';

        const formBody = Object.keys(loginData).map(key =>
            `${encodeURIComponent(key)}=${encodeURIComponent(loginData[key])}`).join('&');

        return fetch(Api.auth.token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
        .then((response) => response.json())
        .then((response) => {
            if (response.access_token) {
                this.decodeAndSaveTokenData(response);
            }

            return ProfileService.getFull();
        })
        .then(response => {
            StorageService.storeData('accountId', response.data.id);
            StorageService.storeData('profile', JSON.stringify(response.data));

            return response;
        })
        .catch(err => {
            console.error(err);
            return err;
        });
    },

    decodeAndSaveTokenData(response) {
        const tokenData = jwtDecode(response.access_token);

        StorageService.storeData('accessToken', response.access_token);
        StorageService.storeData('refreshToken', response.refresh_token);
        StorageService.storeData('accountId', tokenData.accountId);
    }
};
