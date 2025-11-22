import axiosClient from './axiosClient';

export const authApi = {
  signup: (data) => axiosClient.post('/auth/signup', data),
  login: (data) => axiosClient.post('/auth/login', data),
  getCurrentUser: () => axiosClient.get('/auth/me'),
};