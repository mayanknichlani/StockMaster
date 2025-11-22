import axiosClient from './axiosClient';

export const adjustmentApi = {
  getAll: (params) => axiosClient.get('/adjustments', { params }),
  create: (data) => axiosClient.post('/adjustments', data),
  validate: (id) => axiosClient.post(`/adjustments/${id}/validate`),
};