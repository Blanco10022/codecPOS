// src/services/apiService.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://elegant-crow-curiously.ngrok-free.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (data: any) => {
  return apiClient.post('/api/v1/auth/register/', data);
};

export const loginUser = async (data: any) => {
  return apiClient.post('api/v1/auth/login/', data);
};

export const getProductsByShop = async (token: string) => {
  return apiClient.get('api/v1/products/shop/', {
    headers: {
      Authorization: `Token ${token}`
    }
  });
};