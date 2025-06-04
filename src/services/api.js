import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific error cases
      switch (error.response.status) {
        case 401:
          // Handle unauthorized access
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          // Handle forbidden access
          break;
        case 404:
          // Handle not found
          break;
        case 500:
          // Handle server error
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);

// Mock data
const mockProducts = [
  {
    id: '1',
    name: 'Vintage 70s Rock Tee',
    description: 'Authentic 1970s rock band t-shirt with original print',
    price: 49.99,
    originalPrice: 69.99,
    image: '/images/products/70s-rock-tee.jpg',
    category: '70s',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White'],
    isNew: true,
  },
  // Add more mock products...
];

const mockOrders = [
  {
    id: '1',
    date: '2024-03-15',
    status: 'delivered',
    items: [
      {
        id: '1',
        name: 'Vintage 70s Rock Tee',
        quantity: 1,
        price: 49.99,
      },
    ],
    total: 49.99,
  },
  // Add more mock orders...
];

// API methods
export const apiService = {
  // Product methods
  getProducts: async (params = {}) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { data: mockProducts };
  },

  getProduct: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const product = mockProducts.find((p) => p.id === id);
    if (!product) throw new Error('Product not found');
    return { data: product };
  },

  // Order methods
  getOrders: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { data: mockOrders };
  },

  createOrder: async (orderData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'pending',
      ...orderData,
    };
    return { data: newOrder };
  },

  // Auth methods
  login: async (credentials) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (credentials.email === 'test@example.com' && credentials.password === 'password') {
      return {
        data: {
          token: 'mock-jwt-token',
          user: {
            id: '1',
            email: credentials.email,
            name: 'Test User',
          },
        },
      };
    }
    throw new Error('Invalid credentials');
  },

  register: async (userData) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      data: {
        token: 'mock-jwt-token',
        user: {
          id: Date.now().toString(),
          ...userData,
        },
      },
    };
  },

  // User methods
  updateProfile: async (userData) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { data: userData };
  },

  // Wishlist methods
  getWishlist: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: mockProducts.slice(0, 3) };
  },

  addToWishlist: async (productId) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: { success: true } };
  },

  removeFromWishlist: async (productId) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: { success: true } };
  },
};

export default api; 