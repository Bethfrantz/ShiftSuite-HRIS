import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
});

// Attach token automatically for protected routes
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Unified error formatter
function formatError(error) {
    return {
        error: true,
        message:
            error?.response?.data?.message ||
            error?.message ||
            "Unknown error occurred",
        status: error?.response?.status || null,
    };
}

// Automatic retry wrapper
async function withRetry(fn, retries = 2) {
    try {
        return await fn();
    } catch (err) {
        if (retries <= 0) return formatError(err);
        return withRetry(fn, retries - 1);
    }
}

// GET wrapper
export async function apiGet(url) {
    return withRetry(() => api.get(url).then((res) => res.data));
}

// POST wrapper
export async function apiPost(url, data) {
    return withRetry(() => api.post(url, data).then((res) => res.data));
}

// LOGIN (no token required)
export const loginUser = (email, password) => {
    return api.post("/api/auth/login", { email, password });
};

export const registerUser = (formData) => {
    return api.post("/api/auth/register", formData);
};

// Manager Dashboard Endpoints
export const getDashboardStats = () => apiGet("/api/manager/stats");
export const getRecentShifts = () => apiGet("/api/manager/recent-shifts");
export const getSnapshot = () => apiGet("/api/manager/snapshot");

export default api;


