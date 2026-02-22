import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize Session on Load
  useEffect(() => {
    const initializeAuth = () => {
      // FIX: Use 'user' to match what authService saves
      const storedUser = localStorage.getItem('user'); 
      
      if (storedUser) {
        try {
            setUser(JSON.parse(storedUser));
        } catch (e) {
            console.error("Data corruption detected");
            localStorage.removeItem('user'); // Clear bad data
        }
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  // --- LOGIN ---
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      // FIX: authService.login returns the data directly. We do NOT use .data here.
      const response = await authService.login(email, password);
      
      // If your backend returns { user: {...}, token: '...' }
      // We don't need to manually setItem here if authService already did it,
      // but doing it here updates the state instantly.
      setUser(response.user); 
      return response.user;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // --- REGISTER ---
  const register = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      // FIX: Same here. authService.register returns the data directly.
      const response = await authService.register(userData);
      
      setUser(response.user);
      return response.user;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // --- LOGOUT ---
  const logout = () => {
    authService.logout();
    setUser(null);
    window.location.href = '/login'; 
  };

  // Update Profile Helper
  const updateProfile = (updates) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;