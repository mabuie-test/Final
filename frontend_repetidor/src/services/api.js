// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,  // ex: https://seu-backend.onrender.com/api
});

// Agora prepend “Bearer ”
export const setToken = (token) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default api;
