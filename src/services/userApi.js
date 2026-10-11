import api from "../config/api";
import asyncStorage from "@react-native-async-storage/async-storage";

export const userApi ={
    /** 
     * get detalis of user from backend api
     */
    getUserDetalis : async () =>{
        try {
            const response = await api.get('/user/me');
      return response.data?.data?.user || response.data?.user || response.data;
        } catch (error) {
            console.log("failed to fetch user profile")
        }
    }
}