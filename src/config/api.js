import axios from "axios";
import storage from "../utils/storage";

// Base URL using localhost (forwarded via adb reverse tcp:3000 tcp:3000)
const DEV_BASE_URL = 'http://localhost:3000/api/v1';
const BASE_URL = process.env.API_BASE_URL || DEV_BASE_URL;

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

api.interceptors.request.use(async (config) => {
    try {
        const token = await storage.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch (error) {
        console.warn("Storage unavailable in request interceptor:", error?.message);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            await storage.clearAuth();
        }
        return Promise.reject(error);
    }
);

export default api;
