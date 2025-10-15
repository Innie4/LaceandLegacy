// Centralized Fetch API Service for Lace and Legacy
const API_BASE_URL = 'https://likwapu-ecommerce-backend.fly.dev/';

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

// Product data normalizers
export function normalizeProduct(p) {
  if (!p || typeof p !== 'object') {
    return {
      id: String(Math.random()),
      name: 'Untitled Product',
      description: '',
      price: 0,
      images: ['https://via.placeholder.com/800x800?text=Product'],
      image: 'https://via.placeholder.com/800x800?text=Product',
      era: 'Vintage',
      decade: 'Vintage',
      style: 'Vintage',
      condition: 'Good',
      colors: ['Black'],
      color: 'Black',
      sizes: ['M'],
      size: 'M',
      isNew: false,
      inStock: true,
      popularity: 0,
      eraYear: 1970,
      createdAt: new Date().toISOString(),
    };
  }

  const imagesArr = Array.isArray(p.images)
    ? p.images
    : p.gallery
    ? p.gallery
    : p.image
    ? [p.image]
    : [];

  const primaryImage = imagesArr.length > 0
    ? imagesArr[0]
    : (p.thumbnail || 'https://via.placeholder.com/800x800?text=Product');

  const colorsArr = Array.isArray(p.colors)
    ? p.colors
    : p.color
    ? [p.color]
    : ['Black'];

  const sizesArr = Array.isArray(p.sizes)
    ? p.sizes
    : p.size
    ? [p.size]
    : ['M'];

  const priceNum = typeof p.price === 'number' ? p.price : parseFloat(p.price);
  const eraYr = p.eraYear || p.year || (p.createdAt ? new Date(p.createdAt).getFullYear() : undefined) || 1970;

  return {
    id: p.id || p._id || p.productId || p.slug || String(Math.random()),
    name: p.name || p.title || 'Untitled Product',
    description: p.description || p.desc || '',
    price: Number.isFinite(priceNum) ? priceNum : 0,
    images: imagesArr.length > 0 ? imagesArr : [primaryImage],
    image: primaryImage,
    era: p.era || p.decade || p.category || 'Vintage',
    decade: p.decade || p.era || 'Vintage',
    style: p.style || p.category || 'Vintage',
    condition: p.condition || 'Good',
    colors: colorsArr,
    color: colorsArr[0],
    sizes: sizesArr,
    size: sizesArr[0],
    isNew: !!p.isNew,
    inStock: p.inStock !== undefined ? !!p.inStock : true,
    popularity: p.popularity || 0,
    eraYear: eraYr,
    createdAt: p.createdAt || new Date().toISOString(),
    category: p.category || p.style || undefined,
  };
}

export function normalizeProducts(items) {
  if (!Array.isArray(items)) return [];
  return items.map(normalizeProduct);
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
    fetch(`${API_BASE_URL}/api/login`, {
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
