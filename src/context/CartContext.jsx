"use client"

import { createContext, useContext, useReducer, useEffect } from "react"
import { getStoredCart, setStoredCart } from "@/services/storage/localStorage"

const CartContext = createContext()

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isOpen: false,
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_CART":
      return { ...state, ...action.payload }
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id)

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + action.payload.quantity } : item,
        )
        return {
          ...state,
          items: updatedItems,
        }
      } else {
        return {
          ...state,
          items: [...state.items, action.payload],
        }
      }
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }
    case "UPDATE_QUANTITY": {
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
      )
      return {
        ...state,
        items: updatedItems,
      }
    }
    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      }
    case "TOGGLE_CART":
      return {
        ...state,
        isOpen: !state.isOpen,
      }
    case "SET_CART_OPEN":
      return {
        ...state,
        isOpen: action.payload,
      }
    case "UPDATE_TOTALS":
      const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      return {
        ...state,
        totalItems,
        totalPrice,
      }
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    // Load cart from localStorage on mount
    const storedCart = getStoredCart()
    if (storedCart) {
      dispatch({ type: "LOAD_CART", payload: storedCart })
    }
  }, [])

  useEffect(() => {
    // Update totals whenever items change
    dispatch({ type: "UPDATE_TOTALS" })

    // Save to localStorage
    setStoredCart({
      items: state.items,
      totalItems: state.totalItems,
      totalPrice: state.totalPrice,
    })
  }, [state.items])

  const addItem = (product, quantity = 1) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      },
    })
  }

  const removeItem = (productId) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId })
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId)
    } else {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: productId, quantity },
      })
    }
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" })
  }

  const setCartOpen = (isOpen) => {
    dispatch({ type: "SET_CART_OPEN", payload: isOpen })
  }

  const value = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    setCartOpen,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
