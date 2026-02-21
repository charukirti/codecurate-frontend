import appConfig from '@/lib/env';
import axios from 'axios';

const instance = axios.create({
  baseURL: appConfig.api_url,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default instance;
