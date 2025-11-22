import axiosClient from './axiosClient';

export const dashboardApi = {
  getKPIs: () => axiosClient.get('/dashboard/kpis'),
  getLowStock: () => axiosClient.get('/dashboard/low-stock'),
  getRecentActivity: () => axiosClient.get('/dashboard/recent-activity'),
};