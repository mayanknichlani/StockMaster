import axiosClient from './axiosClient';

export const warehouseApi = {
  getAll: () => axiosClient.get('/warehouses'),
  create: (data) => axiosClient.post('/warehouses', data),
  getLocations: (id) => axiosClient.get(`/warehouses/${id}/locations`),
};