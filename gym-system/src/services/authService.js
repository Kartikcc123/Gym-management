import api from './api';

const authService = {
  /**
   * Register a new user
   */
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  /**
   * Login existing user
   */
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  /**
   * Send Password Reset Email
   */
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  /**
   * Reset Password (using token)
   */
  resetPassword: async (token, password) => {
    // Note: This matches the backend route /resetpassword/:resettoken
    const response = await api.put(`/auth/resetpassword/${token}`, { password });
    return response.data;
  },

  /**
   * Logout
   * FIXED: Now removes 'user' (which is what login sets)
   */
  logout: () => {
    localStorage.removeItem('user');
    // Reload page to clear any global states if necessary
    // window.location.href = '/login'; 
  },

  /**
   * Get current user profile
   */
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

export default authService;