import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
    baseURL: "http://localhost:8080",
});

// Request interceptor: attach Bearer token from localStorage user object
api.interceptors.request.use(
    (config) => {
        let token = null;

        const userStr = localStorage.getItem("user");
        if (userStr) {
            try {
                const userObj = JSON.parse(userStr);
                token = userObj.token;
            } catch (e) {
                // ignore JSON parse errors
            }
        }

        // Attach token if exists
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: handle 401 Unauthorized globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            // Clear auth and redirect to login
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;