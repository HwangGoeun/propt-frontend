import axios from 'axios';

export const apiClient = axios.create({
  baseURL: (import.meta.env.VITE_SERVER_URL || 'http://localhost:3000') + '/api',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || '서버 오류가 발생했습니다.';

    return Promise.reject(new Error(message));
  },
);
