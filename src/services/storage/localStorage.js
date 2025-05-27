const STORAGE_KEYS = {
  USER: "ecommerce_user",
  CART: "ecommerce_cart",
  WISHLIST: "ecommerce_wishlist",
  THEME: "ecommerce_theme",
}

// User storage
export const getStoredUser = () => {
  try {
    const user = localStorage.getItem(STORAGE_KEYS.USER)
    return user ? JSON.parse(user) : null
  } catch (error) {
    console.error("Error getting stored user:", error)
    return null
  }
}

export const setStoredUser = (user) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
  } catch (error) {
    console.error("Error storing user:", error)
  }
}

export const removeStoredUser = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER)
  } catch (error) {
    console.error("Error removing stored user:", error)
  }
}

// Cart storage
export const getStoredCart = () => {
  try {
    const cart = localStorage.getItem(STORAGE_KEYS.CART)
    return cart ? JSON.parse(cart) : { items: [], totalItems: 0, totalPrice: 0 }
  } catch (error) {
    console.error("Error getting stored cart:", error)
    return { items: [], totalItems: 0, totalPrice: 0 }
  }
}

export const setStoredCart = (cart) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart))
  } catch (error) {
    console.error("Error storing cart:", error)
  }
}

// Wishlist storage
export const getStoredWishlist = () => {
  try {
    const wishlist = localStorage.getItem(STORAGE_KEYS.WISHLIST)
    return wishlist ? JSON.parse(wishlist) : []
  } catch (error) {
    console.error("Error getting stored wishlist:", error)
    return []
  }
}

export const setStoredWishlist = (wishlist) => {
  try {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist))
  } catch (error) {
    console.error("Error storing wishlist:", error)
  }
}

// Theme storage
export const getStoredTheme = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.THEME) || "light"
  } catch (error) {
    console.error("Error getting stored theme:", error)
    return "light"
  }
}

export const setStoredTheme = (theme) => {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme)
  } catch (error) {
    console.error("Error storing theme:", error)
  }
}
