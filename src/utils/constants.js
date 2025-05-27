export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: "/products/:id",
  CART: "/cart",
  CHECKOUT: "/checkout",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  PROFILE: "/profile",
  ORDERS: "/orders",
  WISHLIST: "/wishlist",
}

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    FORGOT_PASSWORD: "/auth/forgot-password",
  },
  PRODUCTS: {
    GET_ALL: "/products",
    GET_BY_ID: "/products/:id",
    GET_FEATURED: "/products/featured",
    SEARCH: "/products/search",
  },
  CART: {
    GET: "/cart",
    ADD_ITEM: "/cart/items",
    UPDATE_ITEM: "/cart/items/:id",
    REMOVE_ITEM: "/cart/items/:id",
  },
  ORDERS: {
    CREATE: "/orders",
    GET_USER_ORDERS: "/orders/user",
    GET_BY_ID: "/orders/:id",
  },
}

export const PRODUCT_CATEGORIES = [
  { id: "electronics", name: "Electronics" },
  { id: "fashion", name: "Fashion" },
  { id: "home", name: "Home & Garden" },
  { id: "sports", name: "Sports & Outdoors" },
  { id: "books", name: "Books" },
  { id: "toys", name: "Toys & Games" },
]

export const SORT_OPTIONS = [
  { value: "name", label: "Name A-Z" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
]

export const PRICE_RANGES = [
  { min: 0, max: 25, label: "Under $25" },
  { min: 25, max: 50, label: "$25 - $50" },
  { min: 50, max: 100, label: "$50 - $100" },
  { min: 100, max: 200, label: "$100 - $200" },
  { min: 200, max: 1000, label: "$200+" },
]
