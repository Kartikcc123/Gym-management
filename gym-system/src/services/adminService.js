import axios from 'axios';

// 1. SETUP API BASE URL
// Change this to match your backend port (e.g., 5000, 8000)
const API_URL = 'http://localhost:5000/api/auth'; 

// 2. REGISTER USER
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// 3. LOGIN USER
const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// 4. FORGOT PASSWORD (This fixes your issue)
const forgotPassword = async (email) => {
  // This sends the email to your backend route
  const response = await axios.post(`${API_URL}/forgot-password`, { email });
  return response.data;
};

// 5. LOGOUT
const logout = () => {
  localStorage.removeItem('user');
};

// 6. GET CURRENT USER
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

// 7. EXPORT EVERYTHING
const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  forgotPassword, // <--- IMPORTANT: Ensure this is here!
};

export default authService;