import React, { createContext, useContext, useReducer, useEffect } from 'react';

const UserContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  preferences: {
    theme: 'light',
    notifications: true,
    language: 'en'
  },
  loading: false,
  error: null
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null
      };

    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case 'LOGOUT':
      return {
        ...initialState,
        preferences: state.preferences
      };

    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload
        }
      };

    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };

    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState, () => {
    const savedUser = localStorage.getItem('user');
    const savedPreferences = localStorage.getItem('preferences');
    return {
      ...initialState,
      user: savedUser ? JSON.parse(savedUser) : null,
      isAuthenticated: !!savedUser,
      preferences: savedPreferences ? JSON.parse(savedPreferences) : initialState.preferences
    };
  });

  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }
  }, [state.user]);

  useEffect(() => {
    localStorage.setItem('preferences', JSON.stringify(state.preferences));
  }, [state.preferences]);

  const login = async (credentials) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      // Mock API call
      const response = await new Promise(resolve => 
        setTimeout(() => resolve({
          id: 1,
          name: 'John Doe',
          email: credentials.email,
          preferences: state.preferences
        }), 1000)
      );
      dispatch({ type: 'LOGIN_SUCCESS', payload: response });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const updatePreferences = (preferences) => {
    dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
  };

  const updateProfile = (profile) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: profile });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        login,
        logout,
        updatePreferences,
        updateProfile
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 