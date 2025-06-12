import axios from 'axios';

export const ax = axios.create({
  baseURL: '/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

ax.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = {
          ...(config.headers ?? {}),
          Authorization: `Bearer ${token}`,
        } as typeof config.headers;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
