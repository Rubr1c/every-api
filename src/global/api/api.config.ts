import axios from 'axios';

export const ax = axios.create({
  baseURL: 'api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

ax.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
