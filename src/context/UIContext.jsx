"use client"

import { createContext, useContext, useReducer } from "react"

const UIContext = createContext()

const initialState = {
  theme: "light",
  notifications: [],
  modals: {
    isOpen: false,
    type: null,
    data: null,
  },
  loading: {
    global: false,
    components: {},
  },
  sidebar: {
    isOpen: false,
  },
}

const uiReducer = (state, action) => {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, theme: action.payload }
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      }
    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter((notification) => notification.id !== action.payload),
      }
    case "CLEAR_NOTIFICATIONS":
      return { ...state, notifications: [] }
    case "OPEN_MODAL":
      return {
        ...state,
        modals: {
          isOpen: true,
          type: action.payload.type,
          data: action.payload.data,
        },
      }
    case "CLOSE_MODAL":
      return {
        ...state,
        modals: {
          isOpen: false,
          type: null,
          data: null,
        },
      }
    case "SET_GLOBAL_LOADING":
      return {
        ...state,
        loading: { ...state.loading, global: action.payload },
      }
    case "SET_COMPONENT_LOADING":
      return {
        ...state,
        loading: {
          ...state.loading,
          components: {
            ...state.loading.components,
            [action.payload.component]: action.payload.loading,
          },
        },
      }
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        sidebar: { ...state.sidebar, isOpen: !state.sidebar.isOpen },
      }
    case "SET_SIDEBAR":
      return {
        ...state,
        sidebar: { ...state.sidebar, isOpen: action.payload },
      }
    default:
      return state
  }
}

export const UIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState)

  const setTheme = (theme) => {
    dispatch({ type: "SET_THEME", payload: theme })
  }

  const addNotification = (notification) => {
    const id = Date.now().toString()
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: { id, ...notification },
    })

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(id)
    }, 5000)
  }

  const removeNotification = (id) => {
    dispatch({ type: "REMOVE_NOTIFICATION", payload: id })
  }

  const clearNotifications = () => {
    dispatch({ type: "CLEAR_NOTIFICATIONS" })
  }

  const openModal = (type, data = null) => {
    dispatch({ type: "OPEN_MODAL", payload: { type, data } })
  }

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" })
  }

  const setGlobalLoading = (loading) => {
    dispatch({ type: "SET_GLOBAL_LOADING", payload: loading })
  }

  const setComponentLoading = (component, loading) => {
    dispatch({
      type: "SET_COMPONENT_LOADING",
      payload: { component, loading },
    })
  }

  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" })
  }

  const setSidebar = (isOpen) => {
    dispatch({ type: "SET_SIDEBAR", payload: isOpen })
  }

  const value = {
    ...state,
    setTheme,
    addNotification,
    removeNotification,
    clearNotifications,
    openModal,
    closeModal,
    setGlobalLoading,
    setComponentLoading,
    toggleSidebar,
    setSidebar,
  }

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export const useUI = () => {
  const context = useContext(UIContext)
  if (!context) {
    throw new Error("useUI must be used within a UIProvider")
  }
  return context
}
