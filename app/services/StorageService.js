import { SecureStore } from 'expo';

export const StorageService = {
	storeData: async (key, value) => {
	    console.log('StorageService', key, value);
		try {
			await SecureStore.setItemAsync(key, value);
		} catch (error) {
			console.error('Expo.Secure issue:', error);
		}
	},
	retrieveData: async (key) => {
		try {
			return await SecureStore.getItemAsync(key);
		} catch (error) {
			console.error(error);
		}
	},
	removeData: async (key) => {
		try {
			await SecureStore.deleteItemAsync(key);
		} catch (error) {
			console.error(error);
		}
	}
};
