import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  ApiResponse,
  Product,
  ProductFilters,
  Order,
  CreateOrderRequest,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
  WishlistItem,
  ApiError
} from '../types/api';

const api: AxiosInstance = axios.create({
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
      const apiError: ApiError = {
        status: error.response.status,
        message: error.response.data?.message || 'An error occurred',
        code: error.response.data?.code
      };

      switch (error.response.status) {
        case 401:
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
      return Promise.reject(apiError);
    }
    return Promise.reject(error);
  }
);

// Mock data
const mockProducts: Product[] = [
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
    condition: 'Excellent',
    decade: '70s'
  },
  // Add more mock products...
];

const mockOrders: Order[] = [
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
  getProducts: async (params: ProductFilters = {}): Promise<ApiResponse<Product[]>> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { data: mockProducts, success: true };
  },

  getProduct: async (id: string): Promise<ApiResponse<Product>> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const product = mockProducts.find((p) => p.id === id);
    if (!product) throw new Error('Product not found');
    return { data: product, success: true };
  },

  // Order methods
  getOrders: async (): Promise<ApiResponse<Order[]>> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { data: mockOrders, success: true };
  },

  createOrder: async (orderData: CreateOrderRequest): Promise<ApiResponse<Order>> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newOrder: Order = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'pending',
      items: orderData.items,
      total: orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
    return { data: newOrder, success: true };
  },

  // Auth methods
  login: async (credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
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
        success: true
      };
    }
    throw new Error('Invalid credentials');
  },

  register: async (userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      data: {
        token: 'mock-jwt-token',
        user: {
          id: Date.now().toString(),
          ...userData,
        },
      },
      success: true
    };
  },

  // User methods
  updateProfile: async (userData: Partial<User>): Promise<ApiResponse<User>> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { 
      data: { 
        id: '1', 
        email: 'test@example.com', 
        name: 'Test User',
        ...userData 
      }, 
      success: true 
    };
  },

  // Wishlist methods
  getWishlist: async (): Promise<ApiResponse<Product[]>> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: mockProducts.slice(0, 3), success: true };
  },

  addToWishlist: async (productId: string): Promise<ApiResponse<{ success: boolean }>> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: { success: true }, success: true };
  },

  removeFromWishlist: async (productId: string): Promise<ApiResponse<{ success: boolean }>> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: { success: true }, success: true };
  },
};

export default api; 