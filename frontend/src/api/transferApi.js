import axiosClient from './axiosClient';

export const transferApi = {
  getAll: (params) => axiosClient.get('/transfers', { params }),
  create: (data) => axiosClient.post('/transfers', data),
  validate: (id) => axiosClient.post(`/transfers/${id}/validate`),
};