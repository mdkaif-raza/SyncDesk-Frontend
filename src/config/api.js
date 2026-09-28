import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


import { Platform } from 'react-native';

// Fallback Base URL: Android Emulator uses 10.0.2.2 or localhost (via adb reverse tcp:3000 tcp:3000)
const DEV_BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000/api/v1' : 'http://localhost:3000/api/v1';
const BASE_URL = process.env.API_BASE_URL || DEV_BASE_URL;

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});
api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            const keysToRemove = [
                "token",
                "user",
                "userId",
                "workspaces",
                "activeWorkspaceId",
                "isSwitcherOpen",
                "activeWorkspaceName",
                "activeWorkspaceRole"
            ];
            await AsyncStorage.multiRemove(keysToRemove);
        }
        return Promise.reject(error);
    }
);


export default api;
