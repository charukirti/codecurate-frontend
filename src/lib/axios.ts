import { env } from '@/config/env';
import axios, { AxiosError } from 'axios';

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let accessToken: string | null;

export const setAccessToken = (token: string) => (accessToken = token);
export const clearAccessToken = () => (accessToken = null);

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
        const respone = await api.post('/auth/refresh-token');

        const newToken = respone.data.accessToken;
        setAccessToken(newToken);
        return api(originalRequest!);
      } catch {
        clearAccessToken();
      }
    }
    return Promise.reject(error);
  },
);
