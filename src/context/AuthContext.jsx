"use client"

import { createContext, useContext, useReducer, useEffect } from "react"
import { authAPI } from "@/services/api/auth"
import { getStoredUser, setStoredUser, removeStoredUser } from "@/services/storage/localStorage"

const AuthContext = createContext()

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
}

const authReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, isLoading: true, error: null }
    case "AUTH_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }
    case "AUTH_FAILURE":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      }
    case "AUTH_LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      }
    case "CLEAR_ERROR":
      return { ...state, error: null }
    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    // Check for stored user on app load
    const storedUser = getStoredUser()
    if (storedUser) {
      dispatch({ type: "AUTH_SUCCESS", payload: storedUser })
    } else {
      dispatch({ type: "AUTH_FAILURE", payload: null })
    }
  }, [])

  const login = async (credentials) => {
    try {
      dispatch({ type: "AUTH_START" })
      const response = await authAPI.login(credentials)
      const user = response.data.user

      setStoredUser(user)
      dispatch({ type: "AUTH_SUCCESS", payload: user })

      return { success: true }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed"
      dispatch({ type: "AUTH_FAILURE", payload: errorMessage })
      return { success: false, error: errorMessage }
    }
  }

  const register = async (userData) => {
    try {
      dispatch({ type: "AUTH_START" })
      const response = await authAPI.register(userData)
      const user = response.data.user

      setStoredUser(user)
      dispatch({ type: "AUTH_SUCCESS", payload: user })

      return { success: true }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed"
      dispatch({ type: "AUTH_FAILURE", payload: errorMessage })
      return { success: false, error: errorMessage }
    }
  }

  const logout = () => {
    removeStoredUser()
    dispatch({ type: "AUTH_LOGOUT" })
  }

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" })
  }

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
