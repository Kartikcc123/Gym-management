import axios from 'axios';

// 1. Create the Axios Instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://gym-management-1-vidi.onrender.com/', // Load from .env
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor: Attach Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('gym_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Response Interceptor: Handle Global Errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If 401 Unauthorized (Token expired/invalid), avoid redirecting
    // for login requests so the form can show "Invalid credentials".
    const status = error.response?.status;
    const requestUrl = error.config?.url || '';
    const isLoginRequest = requestUrl.includes('/auth/login');

    if (status === 401 && !isLoginRequest) {
      localStorage.removeItem('gym_token');
      localStorage.removeItem('gym_user');
      window.location.href = '/login'; // Force redirect
    }
    return Promise.reject(error);
  }
);

export default api;
