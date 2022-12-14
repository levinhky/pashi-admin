import axios from "axios";

const axiosClient = axios.create({
    // baseURL: 'https://ecommerce-public-api.herokuapp.com/api/v2/',
    // baseURL: 'https://json-api-public.herokuapp.com/api/',
    baseURL: 'http://localhost:8000/api/v2/',
    // baseURL: 'https://pashi-api.vercel.app/api/v2/',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE',
    }
});

axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    throw error;
});


export default axiosClient;