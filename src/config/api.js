const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8090';

export const API_ENDPOINTS = {
  // Auth
  register: '/api/auth/register',
  login: '/api/auth/login',
  logout: '/api/auth/logout',
  
  // User
  profile: '/api/user/profile',
  updateProfile: '/api/user/profile',
  preferences: '/api/user/preferences',
  
  // Products
  products: '/api/products',
  product: (id) => `/api/products/${id}`,
  search: '/api/products/search',
  categories: '/api/products/categories',
  filters: '/api/products/filters',
  
  // Reviews
  reviews: (productId) => `/api/products/${productId}/reviews`,
  addReview: (productId) => `/api/products/${productId}/reviews`,
  
  // Cart
  cart: '/api/cart',
  addToCart: '/api/cart/add',
  updateCart: '/api/cart/update',
  removeFromCart: '/api/cart/remove',
  
  // Orders
  orders: '/api/orders',
  order: (id) => `/api/orders/${id}`,
  createOrder: '/api/orders',
  
  // Contact
  contact: '/api/contact',
};

export default API_BASE_URL; 