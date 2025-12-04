import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // URL do seu Backend Spring Boot
});

// Interceptor para adicionar o token automaticamente em toda requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('racha_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;