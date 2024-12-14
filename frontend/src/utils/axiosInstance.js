// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5242/api', // Backend'inizin temel URL'si
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // LocalStorage'dan token'ı al
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Authorization başlığına ekle
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
