// Centralized Fetch API Service for Lace and Legacy
import API_BASE_URL, { API_ENDPOINTS } from '../config/api';

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
    return response.text().then(text => {
      try {
        return Promise.reject(text ? JSON.parse(text) : { message: 'Request failed', status: response.status });
      } catch (e) {
        return Promise.reject({ message: text || 'Request failed', status: response.status });
      }
    });
  }
  // Gracefully handle empty-body 200 OK responses
  return response.text().then(text => {
    if (!text) {
      // Return a normalized success payload so callers can treat it as success
      return { success: true, status: 'success' };
    }
    try {
      return JSON.parse(text);
    } catch (e) {
      // Non-JSON success responses
      return { success: true, data: text };
    }
  });
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
  // Try both payload formats to maximize compatibility with backend
  register: async (data) => {
    const token = localStorage.getItem('token');

    // Helper to build FormData with common field aliases
    const buildFormData = (src) => {
      const form = new FormData();
      const firstname = src.firstName ?? src.firstname;
      const lastname = src.lastName ?? src.lastname;
      const email = src.email ?? src.username;
      const password = src.password;
      const password_confirmation = src.repeatedPassword ?? src.confirmPassword ?? src.password_confirmation ?? src.password;
      const country = src.country ?? src.countryCode ?? src.selectedCountry;
      if (firstname) form.append('firstname', firstname);
      if (lastname) form.append('lastname', lastname);
      if (email) form.append('email', email);
      if (password) form.append('password', password);
      if (password_confirmation) form.append('password_confirmation', password_confirmation);
      if (country) form.append('country', country);
      return form;
    };

    const jsonHeaders = token ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } : { 'Content-Type': 'application/json' };
    const authHeaderOnly = token ? { Authorization: `Bearer ${token}` } : undefined;

    // Attempt 1: FormData (covers servers that reject JSON with 415)
    try {
      const fdResp = await fetch(`${API_BASE_URL}${API_ENDPOINTS.register}`, {
        method: 'POST',
        headers: authHeaderOnly,
        credentials: 'include',
        body: buildFormData(data),
      });
      return await handleResponse(fdResp);
    } catch (err1) {
      // Attempt 2: JSON (covers servers that expect application/json)
      try {
        const jsonResp = await fetch(`${API_BASE_URL}${API_ENDPOINTS.register}`, {
          method: 'POST',
          headers: jsonHeaders,
          credentials: 'include',
          body: JSON.stringify(data),
        });
        return await handleResponse(jsonResp);
      } catch (err2) {
        // Surface the first error by default if both fail
        throw err1?.status ? err1 : err2;
      }
    }
  },
  login: (data) =>
    fetch(`${API_BASE_URL}${API_ENDPOINTS.login}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(data),
    }).then(handleResponse),
  logout: () =>
    fetch(`${API_BASE_URL}${API_ENDPOINTS.logout}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
    }).then(handleResponse),
  verifyEmail: (data) =>
    fetch(`${API_BASE_URL}${API_ENDPOINTS.verifyEmail}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(data),
    }).then(handleResponse),
  resendVerification: (data) =>
    fetch(`${API_BASE_URL}${API_ENDPOINTS.resendVerification}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(data),
    }).then(handleResponse),
};

// User services
export const userService = {
  getProfile: () =>
    fetch(`${API_BASE_URL}${API_ENDPOINTS.profile}`, {
      headers: getAuthHeaders(),
      credentials: 'include',
    }).then(handleResponse),
  updateProfile: (data) =>
    fetch(`${API_BASE_URL}${API_ENDPOINTS.updateProfile}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),
  updatePreferences: (data) =>
    fetch(`${API_BASE_URL}${API_ENDPOINTS.preferences}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),
};

// Product services
export const productService = {
  getProducts: (params) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}`, Accept: 'application/json' } : { Accept: 'application/json' };
    return fetch(`${API_BASE_URL}${API_ENDPOINTS.products}${query}`, {
      headers,
      mode: 'cors',
      credentials: 'omit',
    }).then(handleResponse);
  },
  getProduct: (id) =>
    fetch(`${API_BASE_URL}${API_ENDPOINTS.product(id)}`, {
      headers: getAuthHeaders(),
    }).then(handleResponse),
  searchProducts: (query) =>
    fetch(`${API_BASE_URL}${API_ENDPOINTS.search}?q=${encodeURIComponent(query)}`, {
      headers: getAuthHeaders(),
    }).then(handleResponse),
  getCategories: () =>
    fetch(`${API_BASE_URL}${API_ENDPOINTS.categories}`, {
      headers: getAuthHeaders(),
    }).then(handleResponse),
  getFilters: () =>
    fetch(`${API_BASE_URL}${API_ENDPOINTS.filters}`, {
      headers: getAuthHeaders(),
    }).then(handleResponse),
};

// Review services
export const reviewService = {
  getReviews: (productId) =>
    fetch(`${API_BASE_URL}${API_ENDPOINTS.reviews(productId)}`, {
      headers: getAuthHeaders(),
    }).then(handleResponse),
  addReview: (productId, data) =>
    fetch(`${API_BASE_URL}${API_ENDPOINTS.addReview(productId)}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),
};

// Cart services
export const cartService = {
  getCart: () =>
    fetch(`${API_BASE_URL}${API_ENDPOINTS.cart}`, {
      headers: getAuthHeaders(),
    }).then(handleResponse),
  addToCart: (data) =>
    fetch(`${API_BASE_URL}${API_ENDPOINTS.addToCart}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),
  updateCart: (data) =>
    fetch(`${API_BASE_URL}${API_ENDPOINTS.updateCart}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),
  removeFromCart: (itemId) =>
    fetch(`${API_BASE_URL}${API_ENDPOINTS.removeFromCart(itemId)}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    }).then(handleResponse),
};

// Order services
export const orderService = {
  getOrders: () =>
    fetch(`${API_BASE_URL}${API_ENDPOINTS.orders}`, {
      headers: getAuthHeaders(),
    }).then(handleResponse),
  getOrder: (id) =>
    fetch(`${API_BASE_URL}${API_ENDPOINTS.order(id)}`, {
      headers: getAuthHeaders(),
    }).then(handleResponse),
  createOrder: (data) =>
    fetch(`${API_BASE_URL}${API_ENDPOINTS.createOrder}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),
};

// Contact services
export const contactService = {
  sendMessage: (data) =>
    fetch(`${API_BASE_URL}${API_ENDPOINTS.contact}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),
};
