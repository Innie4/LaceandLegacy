// Unified API base URL
// In development, use relative base to leverage CRA proxy and avoid CORS.
// In production, default to Fly.io backend or use REACT_APP_API_URL override.
const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? ''
    : process.env.REACT_APP_API_URL || 'https://likwapu-ecommerce-backend.fly.dev';

export const API_ENDPOINTS = {
  // Auth (aligned to backend routes)
  login: '/api/login',
  register: '/api/registration/register',
  logout: '/api/registration/logout',
  verifyEmail: '/api/registration/verify',
  resendVerification: '/api/registration/resend-code',
  
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

  // Wishlist
  wishlist: '/api/wishlist',
  wishlistAdd: '/api/wishlist/add',
  wishlistRemove: '/api/wishlist/remove',
  
  // Cart
  cart: '/api/cart',
  addToCart: '/api/cart/add',
  updateCart: '/api/cart/update',
  removeFromCart: (itemId) => `/api/cart/remove/${itemId}`,
  
  // Orders
  orders: '/api/orders',
  order: (id) => `/api/orders/${id}`,
  createOrder: '/api/orders',
  
  // Contact
  contact: '/api/contact',
};

export default API_BASE_URL;