import { mockProducts } from "@/data/mockProducts"

const productsAPI = {
  getAll: async () => {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProducts)
      }, 1000)
    })
  },

  getById: async (id) => {
    // Mock implementation - replace with actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = mockProducts.find((p) => p.id === Number.parseInt(id))
        if (product) {
          resolve(product)
        } else {
          reject(new Error("Product not found"))
        }
      }, 500)
    })
  },

  getFeatured: async () => {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProducts.filter((p) => p.featured))
      }, 800)
    })
  },

  getByCategory: async (category) => {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProducts.filter((p) => p.category === category))
      }, 800)
    })
  },

  search: async (query) => {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = mockProducts.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase()),
        )
        resolve(results)
      }, 600)
    })
  },
}

export { productsAPI }
