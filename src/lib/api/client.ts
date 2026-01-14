import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:3000',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => {
    // 백엔드에서 응답이 이중으로 래핑되어 오는 경우 처리
    if (response.data?.data?.ok && response.data?.data?.data) {
      response.data = response.data.data;
    }
    
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || '서버 오류가 발생했습니다.';

    return Promise.reject(new Error(message));
  },
);
