import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://gym-management-1-vidi.onrender.com/api/v1",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("gym_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";
    const isLoginRequest = requestUrl.includes("/auth/login");

    if (status === 401 && !isLoginRequest) {
      localStorage.removeItem("gym_token");
      localStorage.removeItem("gym_user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;