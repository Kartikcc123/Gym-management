import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize Session
  useEffect(() => {
    const initializeAuth = () => {
      const storedUser = localStorage.getItem('gym_user');
      const token = localStorage.getItem('gym_token');

      if (storedUser && token) {
        try {
            setUser(JSON.parse(storedUser));
        } catch (e) {
            console.error("Data corruption detected");
            localStorage.clear();
        }
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.login(email, password);
      
      const { user, token } = response.data;
      
      localStorage.setItem('gym_token', token);
      localStorage.setItem('gym_user', JSON.stringify(user));
      setUser(user);
      return user;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.register(userData);
      const { user, token } = response.data;
      
      localStorage.setItem('gym_token', token);
      localStorage.setItem('gym_user', JSON.stringify(user));
      setUser(user);
      return user;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    window.location.href = '/'; 
  };

  // Updates local state immediately (useful for instant UI feedback)
  const updateProfile = (updates) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('gym_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

