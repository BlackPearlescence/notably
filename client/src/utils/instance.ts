import axios from "axios";
import Cookies from "js-cookie";

// Create axios instance

const api = axios.create();

api.interceptors.request.use((config) => {
    // Retrieve token from cookies
    const token = Cookies.get("jwt");
    // If token already exists then
    // Modify headers to include the Authorization header with the bearer token
    if (token) {
        config.headers["Authorization"] = "Bearer " + token;
    }

    // Return the config
    return config;
})

export default api;