import axiosClient from './axiosClient';

export const receiptApi = {
  getAll: (params) => axiosClient.get('/receipts', { params }),
  getById: (id) => axiosClient.get(`/receipts/${id}`),
  create: (data) => axiosClient.post('/receipts', data),
  validate: (id) => axiosClient.post(`/receipts/${id}/validate`),
};