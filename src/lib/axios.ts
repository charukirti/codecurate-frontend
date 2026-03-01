import { env } from '@/config/env';
import axios, { AxiosError } from 'axios';

// Axios instance with base URL and default headers
export const api = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let accessToken: string | null;

export const setAccessToken = (token: string) => (accessToken = token);
export const clearAccessToken = () => (accessToken = null);

// Attach access token
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError & { _retry?: boolean }) => {
    const originalRequest = error.config as typeof error.config & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await api.post('/auth/refresh-token');

        const newToken = response.data.accessToken;
        setAccessToken(newToken);
        return api(originalRequest!);
      } catch {
        clearAccessToken();
      }
    }
    return Promise.reject(error);
  },
);
