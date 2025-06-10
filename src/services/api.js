import axios from 'axios';
import API_BASE_URL from '../config/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Add auth token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Clear user data and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
  logout: () => api.post('/api/auth/logout'),
};

// User services
export const userService = {
  getProfile: () => api.get('/api/user/profile'),
  updateProfile: (data) => api.put('/api/user/profile', data),
  updatePreferences: (data) => api.put('/api/user/preferences', data),
};

// Product services
export const productService = {
  getProducts: (params) => api.get('/api/products', { params }),
  getProduct: (id) => api.get(`/api/products/${id}`),
  searchProducts: (query) => api.get('/api/products/search', { params: { q: query } }),
  getCategories: () => api.get('/api/products/categories'),
  getFilters: () => api.get('/api/products/filters'),
};

// Review services
export const reviewService = {
  getReviews: (productId) => api.get(`/api/products/${productId}/reviews`),
  addReview: (productId, data) => api.post(`/api/products/${productId}/reviews`, data),
};

// Cart services
export const cartService = {
  getCart: () => api.get('/api/cart'),
  addToCart: (data) => api.post('/api/cart/add', data),
  updateCart: (data) => api.put('/api/cart/update', data),
  removeFromCart: (itemId) => api.delete(`/api/cart/remove/${itemId}`),
};

// Order services
export const orderService = {
  getOrders: () => api.get('/api/orders'),
  getOrder: (id) => api.get(`/api/orders/${id}`),
  createOrder: (data) => api.post('/api/orders', data),
};

// Contact services
export const contactService = {
  sendMessage: (data) => api.post('/api/contact', data),
};

export default api; 