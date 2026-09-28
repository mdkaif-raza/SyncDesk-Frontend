import api from "..//config/api"

export const authApi = {
    /**
     * Register a new user
     * @param {object} userData User registration data 
     * @returns {Promise} Response from the API
     */
    register: async (userData) => {
        const response = await api.post("/auth/register", userData);
        return response.data;
    },

}
export default authApi;