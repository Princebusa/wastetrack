import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || `${import.meta.env.VITE_BACKEND_URL}`;

const authAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
authAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  // Sign up new user
  signup: async (userData) => {
    try {
      const response = await authAPI.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error occurred' };
    }
  },

  // Sign in existing user
  signin: async (credentials) => {
    try {
      const response = await authAPI.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error occurred' };
    }
  },

  // Sign out user
  signout: () => {
    localStorage.removeItem('token');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Get stored token
  getToken: () => {
    return localStorage.getItem('token');
  }
};
