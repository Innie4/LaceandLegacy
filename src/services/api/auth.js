const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api"

const authAPI = {
  login: async (credentials) => {
    // Mock implementation - replace with actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === "user@example.com" && credentials.password === "password") {
          resolve({
            data: {
              user: {
                id: 1,
                name: "John Doe",
                email: credentials.email,
                token: "mock-jwt-token",
              },
            },
          })
        } else {
          reject({
            response: {
              data: {
                message: "Invalid credentials",
              },
            },
          })
        }
      }, 1000)
    })
  },

  register: async (userData) => {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            user: {
              id: Date.now(),
              name: userData.name,
              email: userData.email,
              token: "mock-jwt-token",
            },
          },
        })
      }, 1000)
    })
  },

  forgotPassword: async (email) => {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            message: "Password reset email sent",
          },
        })
      }, 1000)
    })
  },

  logout: async () => {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { message: "Logged out successfully" } })
      }, 500)
    })
  },
}

export { authAPI }
