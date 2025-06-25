// Centralized Fetch API Service for Lace & Legacy
const API_BASE_URL = 'https://likwapuecommerce.fly.dev';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token
    ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    : { 'Content-Type': 'application/json' };
}

function handleResponse(response) {
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return response.json().then(err => { throw err; });
  }
  return response.json();
}

// Auth services
export const authService = {
  register: (data) =>
    fetch(`${API_BASE_URL}/api/registration/register`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),
  login: (data) =>
    fetch(`${API_BASE_URL}/api/registration/login`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),
  logout: () =>
    fetch(`${API_BASE_URL}/api/registration/logout`, {
      method: 'POST',
      headers: getAuthHeaders(),
    }).then(handleResponse),
};

// User services
export const userService = {
  getProfile: () =>
    fetch(`${API_BASE_URL}/api/user/profile`, {
      headers: getAuthHeaders(),
    }).then(handleResponse),
  updateProfile: (data) =>
    fetch(`${API_BASE_URL}/api/user/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),
  updatePreferences: (data) =>
    fetch(`${API_BASE_URL}/api/user/preferences`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),
};

// Product services
export const productService = {
  getProducts: (params) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetch(`${API_BASE_URL}/api/products${query}`, {
      headers: getAuthHeaders(),
    }).then(handleResponse);
  },
  getProduct: (id) =>
    fetch(`${API_BASE_URL}/api/products/${id}`, {
      headers: getAuthHeaders(),
    }).then(handleResponse),
  searchProducts: (query) =>
    fetch(`${API_BASE_URL}/api/products/search?q=${encodeURIComponent(query)}`, {
      headers: getAuthHeaders(),
    }).then(handleResponse),
  getCategories: () =>
    fetch(`${API_BASE_URL}/api/products/categories`, {
      headers: getAuthHeaders(),
    }).then(handleResponse),
  getFilters: () =>
    fetch(`${API_BASE_URL}/api/products/filters`, {
      headers: getAuthHeaders(),
    }).then(handleResponse),
};

// Review services
export const reviewService = {
  getReviews: (productId) =>
    fetch(`${API_BASE_URL}/api/products/${productId}/reviews`, {
      headers: getAuthHeaders(),
    }).then(handleResponse),
  addReview: (productId, data) =>
    fetch(`${API_BASE_URL}/api/products/${productId}/reviews`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),
};

// Cart services
export const cartService = {
  getCart: () =>
    fetch(`${API_BASE_URL}/api/cart`, {
      headers: getAuthHeaders(),
    }).then(handleResponse),
  addToCart: (data) =>
    fetch(`${API_BASE_URL}/api/cart/add`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),
  updateCart: (data) =>
    fetch(`${API_BASE_URL}/api/cart/update`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),
  removeFromCart: (itemId) =>
    fetch(`${API_BASE_URL}/api/cart/remove/${itemId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    }).then(handleResponse),
};

// Order services
export const orderService = {
  getOrders: () =>
    fetch(`${API_BASE_URL}/api/orders`, {
      headers: getAuthHeaders(),
    }).then(handleResponse),
  getOrder: (id) =>
    fetch(`${API_BASE_URL}/api/orders/${id}`, {
      headers: getAuthHeaders(),
    }).then(handleResponse),
  createOrder: (data) =>
    fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),
};

// Contact services
export const contactService = {
  sendMessage: (data) =>
    fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),
};
