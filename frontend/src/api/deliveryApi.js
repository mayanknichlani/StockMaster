import axiosClient from './axiosClient';

export const deliveryApi = {
  getAll: (params) => axiosClient.get('/deliveries', { params }),
  create: (data) => axiosClient.post('/deliveries', data),
  validate: (id) => axiosClient.post(`/deliveries/${id}/validate`),
};