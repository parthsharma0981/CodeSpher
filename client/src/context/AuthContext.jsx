import React, { createContext, useState, useEffect } from 'react';
import { authService, userService } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (token) {
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch {}
        }
        try {
          const profile = await userService.getMe();
          if (profile?.data) {
            setUser(profile.data);
            localStorage.setItem('user', JSON.stringify(profile.data));
          }
        } catch (err) {
          // If token expired, clear
          if (err.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
          }
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    const token = response.data?.accessToken || response.data?.token;
    const userData = response.data?.user;
    if (token) localStorage.setItem('token', token);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    }
    return response;
  };

  const register = async (userData) => {
    return await authService.register(userData);
  };

  const verifyOTP = async (data) => {
    const response = await authService.verifyOTP(data);
    const token = response.data?.accessToken || response.data?.token;
    const userData = response.data?.user;
    if (token) localStorage.setItem('token', token);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    }
    return response;
  };

  const updateUserState = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        verifyOTP,
        updateUserState,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
