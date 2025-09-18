import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import axios from 'axios';
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const token = authService.getToken();
    if (token) {
      setIsAuthenticated(true);
     
    }
    setLoading(false);
  }, []);




 const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        isAuthenticated(false);
        setUser(null);
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

     
        setUser(response.data.data);
        
        
   
    } catch (error) {
      console.error("Auth verification failed:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
      }

     
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);





  
  const login = async (credentials) => {
    try {
      const response = await authService.signin(credentials);
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.signup(userData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.signout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
