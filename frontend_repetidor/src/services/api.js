import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const setToken = (token) => {
  api.defaults.headers.common['Authorization'] = token;
};

export default api;
