import api from "../config/api";
import storage from "../utils/storage";

export const authApi = {
    /**
     * Register a new user
     * @param {object} userData User registration data 
     * @returns {Promise} Response from the API
     */
    register: async (userData) => {
        const response = await api.post("/auth/register", userData);
        const token = response.data?.token || response.data?.accessToken;
        const user = response.data?.user || response.data?.data?.user;
        if (token) {
            await storage.setToken(token);
            if (user) {
                await storage.setUser(user);
            }
        }
        return response.data;
    },

    /**
     * Send OTP for registration email verification
     * @param {string|object} emailOrPayload Email string or { email }
     * @returns {Promise} Response from the API
     */
    registerSendOtp: async (emailOrPayload) => {
        try {
            const payload =
                typeof emailOrPayload === 'string'
                    ? { email: emailOrPayload.trim().toLowerCase() }
                    : emailOrPayload;
            try {
                const response = await api.post("/register-otp", payload);
                return response?.data || response;
            } catch (err) {
                if (err.response?.status === 404) {
                    const fallback = await api.post("/auth/register-otp", payload);
                    return fallback?.data || fallback;
                }
                throw err;
            }
        } catch (error) {
            console.log("Error during registerSendOtp:", error);
            throw error;
        }
    },

    /**
     * Alias for registerSendOtp / sendOtp
     */
    sendOtp: async (emailOrPayload) => {
        return authApi.registerSendOtp(emailOrPayload);
    },

    /**
     * Verify registration OTP
     * @param {object} payload { email, otp }
     * @returns {Promise} Response from the API
     */
    verifyRegisterOtp: async (payload) => {
        try {
            const formattedPayload = {
                email: payload.email?.trim().toLowerCase(),
                otp: payload.otp?.trim(),
            };
            try {
                const response = await api.post("/auth/verify-register-otp", formattedPayload);
                return response?.data || response;
            } catch (err) {
                if (err.response?.status === 404) {
                    const fallback = await api.post("/verify-register-otp", formattedPayload);
                    return fallback?.data || fallback;
                }
                throw err;
            }
        } catch (error) {
            console.log("Error during verifyRegisterOtp:", error);
            throw error;
        }
    },

    /**
     * Alias for verifyRegisterOtp
     */
    verifyOtp: async (payload) => {
        return authApi.verifyRegisterOtp(payload);
    },

    /**
     * Login user
     * @param {object} credentials Login credentials (email/identifier, password)
     * @returns {Promise} Response from the API
     */
    login: async (credentials) => {
        const response = await api.post("/auth/login", credentials);
        const token = response.data?.data?.token || response.data?.token || response.data?.accessToken;
        const user = response.data?.data?.user || response.data?.user;
        if (token) {
            await storage.setToken(token);
            if (user) {
                await storage.setUser(user);
            }
        }
        return response.data;
    },

    /* async storage store here */
    getStoredUser: async () => {
        return storage.getUser();
    },

    getUserProfile: async () => {
        try {
            const response = await api.get('/users/me');
            return response.data?.data?.user || response.data?.user || response.data;
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            throw error;
        }
    },

    /**
     * Send forgot password reset link to user's email
     * @param {string|object} emailOrPayload Email string or payload object { email }
     * @returns {Promise} Response from the API
     */
    forgotPassword: async (emailOrPayload) => {
        try {
            const payload =
                typeof emailOrPayload === 'string'
                    ? { email: emailOrPayload.trim().toLowerCase() }
                    : emailOrPayload;
            try {
                const response = await api.post("/auth/forgot-password", payload);
                return response?.data;
            } catch (err) {
                if (err.response?.status === 404) {
                    const fallbackResponse = await api.post("/auth/forget-password", payload);
                    return fallbackResponse?.data;
                }
                throw err;
            }
        } catch (error) {
            console.log("Error during forgot password request:", error);
            throw error;
        }
    },

    /**
     * Alias for forgotPassword
     * @param {string|object} emailOrPayload Email string or payload object { email }
     * @returns {Promise} Response from the API
     */
    forgetPassword: async (emailOrPayload) => {
        return authApi.forgotPassword(emailOrPayload);
    },

    logout: async () => {
        await storage.clearAuth();
    }
};

export default authApi;