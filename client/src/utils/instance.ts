import axios from "axios";
import Cookies from "js-cookie";

// // Create axios instance

// const api = axios.create();

// api.interceptors.request.use((config) => {
//     // Retrieve token from cookies
//     const token = Cookies.get("jwt");
//     // If token already exists then
//     // Modify headers to include the Authorization header with the bearer token
//     if (token) {
//         config.headers["Authorization"] = "Bearer " + token;
//     }

//     // Return the config
//     return config;
// })

// export default api;


const api = axios.create({
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    }
});


// Send token from cookie with each request to server
api.interceptors.request.use(config => {
    const token = Cookies.get("notejwt");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, err => {
    return Promise.reject(err);
})

// Add response interceptor to remove the JWT cookie when the user logs out
api.interceptors.request.use(
    (resp) => {
        return resp;
    },
    (err) => {
        if (err.response.status === 401) {
            Cookies.remove("notejwt");
        }
        return Promise.reject(err)
    }
)

export default api;