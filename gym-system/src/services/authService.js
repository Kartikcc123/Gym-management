import api from './api';

const authService = {
  /**
   * Register a new user
   */
  register: async (userData) => {
    return api.post('/auth/register', userData);
  },

  /**
   * Login existing user
   */
  login: async (email, password) => {
    return api.post('/auth/login', { email, password });
  },

  forgotPassword: async (email) => {
    return api.post('/auth/forgotpassword', { email });
  },

  resetPassword: async (token, password) => {
    return api.put(`/auth/resetpassword/${token}`, { password });
  },

  /**
   * Logout (Client side cleanup)
   */
  logout: () => {
    localStorage.removeItem('gym_token');
    localStorage.removeItem('gym_user');
  },

  /**
   * Get current user profile
   */
  getMe: async () => {
    return api.get('/auth/me');
  }
};

export default authService;