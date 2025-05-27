"use client"

import { createContext, useContext, useReducer } from "react"

const ProductContext = createContext()

const initialState = {
  products: [],
  categories: [],
  filters: {
    category: "",
    priceRange: [0, 1000],
    rating: 0,
    inStock: false,
  },
  sortBy: "name",
  searchQuery: "",
  isLoading: false,
  error: null,
}

const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }
    case "SET_PRODUCTS":
      return { ...state, products: action.payload, isLoading: false }
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload }
    case "SET_FILTERS":
      return { ...state, filters: { ...state.filters, ...action.payload } }
    case "SET_SORT":
      return { ...state, sortBy: action.payload }
    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false }
    case "CLEAR_FILTERS":
      return { ...state, filters: initialState.filters }
    default:
      return state
  }
}

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState)

  const setProducts = (products) => {
    dispatch({ type: "SET_PRODUCTS", payload: products })
  }

  const setCategories = (categories) => {
    dispatch({ type: "SET_CATEGORIES", payload: categories })
  }

  const setFilters = (filters) => {
    dispatch({ type: "SET_FILTERS", payload: filters })
  }

  const setSortBy = (sortBy) => {
    dispatch({ type: "SET_SORT", payload: sortBy })
  }

  const setSearchQuery = (query) => {
    dispatch({ type: "SET_SEARCH", payload: query })
  }

  const setLoading = (loading) => {
    dispatch({ type: "SET_LOADING", payload: loading })
  }

  const setError = (error) => {
    dispatch({ type: "SET_ERROR", payload: error })
  }

  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" })
  }

  const getFilteredProducts = () => {
    let filtered = [...state.products]

    // Apply search filter
    if (state.searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(state.searchQuery.toLowerCase()),
      )
    }

    // Apply category filter
    if (state.filters.category) {
      filtered = filtered.filter((product) => product.category === state.filters.category)
    }

    // Apply price range filter
    filtered = filtered.filter(
      (product) => product.price >= state.filters.priceRange[0] && product.price <= state.filters.priceRange[1],
    )

    // Apply rating filter
    if (state.filters.rating > 0) {
      filtered = filtered.filter((product) => product.rating >= state.filters.rating)
    }

    // Apply stock filter
    if (state.filters.inStock) {
      filtered = filtered.filter((product) => product.stock > 0)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (state.sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt)
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }

  const value = {
    ...state,
    setProducts,
    setCategories,
    setFilters,
    setSortBy,
    setSearchQuery,
    setLoading,
    setError,
    clearFilters,
    getFilteredProducts,
  }

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider")
  }
  return context
}
