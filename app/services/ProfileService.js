import { Api } from '../consts/Api';
import {StorageService} from "./StorageService";
import {RequestService} from "./RequestService";

export const ProfileService = {
    get(accountId) {
        return RequestService.get(Api.profile.get.byId, {accountId});
    },

    getFull(accountId) {
        return RequestService.get(Api.profile.get.full, {accountId});
    },

    getLocal() {
        return StorageService.retrieveData('profile').then(value => {
            return value ? JSON.parse(value) : {roles: []};
        });
    },

    getAvatar(profile) {
        return  profile && profile.avatarId ? `${Api.attachment.get}${profile.avatarId}` : null;
    }
};
