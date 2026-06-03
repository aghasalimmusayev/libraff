import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "x-app-token": import.meta.env.VITE_API_TOKEN,
    },
});

export default axiosInstance;
