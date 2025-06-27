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

const API_BASE_URL = 'https://likwapuecommerce.fly.dev';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('token');
  return token
    ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    : { 'Content-Type': 'application/json' };
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    const err = await response.json();
    throw err;
  }
  const data = await response.json();
  return data as ApiResponse<T>;
}

export const apiService = {
  // Product methods
  getProducts: (params: ProductFilters = {}): Promise<ApiResponse<Product[]>> => {
    const query = Object.keys(params).length ? '?' + new URLSearchParams(params as any).toString() : '';
    return fetch(`${API_BASE_URL}/api/products${query}`, {
      headers: getAuthHeaders(),
    }).then(handleResponse<Product[]>);
  },
  getProduct: (id: string): Promise<ApiResponse<Product>> =>
    fetch(`${API_BASE_URL}/api/products/${id}`, {
      headers: getAuthHeaders(),
    }).then(handleResponse<Product>),
  // Order methods
  getOrders: (): Promise<ApiResponse<Order[]>> =>
    fetch(`${API_BASE_URL}/api/orders`, {
      headers: getAuthHeaders(),
    }).then(handleResponse<Order[]>),
  createOrder: (orderData: CreateOrderRequest): Promise<ApiResponse<Order>> =>
    fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(orderData),
    }).then(handleResponse<Order>),
  // Auth methods
  login: (credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> =>
    fetch(`${API_BASE_URL}/api/registration/login`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(credentials),
    }).then(handleResponse<AuthResponse>),
  register: (userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> =>
    fetch(`${API_BASE_URL}/api/registration/register`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    }).then(handleResponse<AuthResponse>),
  // User methods
  updateProfile: (userData: Partial<User>): Promise<ApiResponse<User>> =>
    fetch(`${API_BASE_URL}/api/user/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    }).then(handleResponse<User>),
  // Wishlist methods
  getWishlist: (): Promise<ApiResponse<Product[]>> =>
    fetch(`${API_BASE_URL}/api/wishlist`, {
      headers: getAuthHeaders(),
    }).then(handleResponse<Product[]>),
  addToWishlist: (productId: string): Promise<ApiResponse<{ success: boolean }>> =>
    fetch(`${API_BASE_URL}/api/wishlist/add`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ productId }),
    }).then(handleResponse<{ success: boolean }>),
  removeFromWishlist: (productId: string): Promise<ApiResponse<{ success: boolean }>> =>
    fetch(`${API_BASE_URL}/api/wishlist/remove`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ productId }),
    }).then(handleResponse<{ success: boolean }>),
  // Cart methods
  getCart: (): Promise<ApiResponse<any>> =>
    fetch(`${API_BASE_URL}/api/cart`, {
      headers: getAuthHeaders(),
    }).then(handleResponse<any>),
  addToCart: (data: any): Promise<ApiResponse<any>> =>
    fetch(`${API_BASE_URL}/api/cart/add`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse<any>),
  updateCart: (data: any): Promise<ApiResponse<any>> =>
    fetch(`${API_BASE_URL}/api/cart/update`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse<any>),
  removeFromCart: (itemId: string): Promise<ApiResponse<any>> =>
    fetch(`${API_BASE_URL}/api/cart/remove/${itemId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    }).then(handleResponse<any>),
  // Review methods
  getReviews: (productId: string): Promise<ApiResponse<any>> =>
    fetch(`${API_BASE_URL}/api/products/${productId}/reviews`, {
      headers: getAuthHeaders(),
    }).then(handleResponse<any>),
  addReview: (productId: string, data: any): Promise<ApiResponse<any>> =>
    fetch(`${API_BASE_URL}/api/products/${productId}/reviews`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse<any>),
  // Contact
  sendMessage: (data: any): Promise<ApiResponse<any>> =>
    fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse<any>),
};
