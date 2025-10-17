import axios from "axios";
import {store } from "@/store";
import { selectedToken } from "@/redux/reducer/auth/auth";




const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // adjust the base URL as needed
});

axiosInstance.interceptors.request.use(
    (config) => {
        let token = null;
        const state = store.getState();
        
        const localToken = localStorage.getItem('tlp_token');
        
        if (localToken) {
            try {
                token = JSON.parse(localToken);
            } catch (e) {
                console.error("Failed to parse token from localStorage", e);
            }
        }else {
            token = selectedToken(state);
        }
        // if (!token) token = localToken ? JSON.parse(localToken) : null;
        
        if (token) config.headers['Authorization'] = `Bearer ${token}`;
    
        return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

export default axiosInstance;
