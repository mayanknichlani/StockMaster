export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  PRODUCTS: '/products',
  RECEIPTS: '/receipts',
  DELIVERIES: '/deliveries',
  TRANSFERS: '/transfers',
  ADJUSTMENTS: '/adjustments',
  LEDGER: '/ledger',
  WAREHOUSES: '/warehouses',
  PROFILE: '/profile',
};

export const STATUS = {
  DRAFT: 'draft',
  WAITING: 'waiting',
  READY: 'ready',
  DONE: 'done',
  CANCELLED: 'cancelled',
};

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
  WAREHOUSE_STAFF: 'warehouse_staff',
  INVENTORY_MANAGER: 'inventory_manager',
  VIEWER: 'viewer',
};