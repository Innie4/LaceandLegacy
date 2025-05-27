"use client"

import { useEffect } from "react"
import { useQuery } from "react-query"
import ProductGrid from "@/components/product/ProductGrid/ProductGrid"
import FilterSidebar from "@/components/product/ProductFilters/FilterSidebar"
import SortDropdown from "@/components/product/ProductSort/SortDropdown"
import Spinner from "@/components/common/Loading/Spinner"
import { useProducts } from "@/context/ProductContext"
import { productsAPI } from "@/services/api/products"

const ProductCatalogPage = () => {
  const { setProducts, getFilteredProducts, isLoading, setLoading } = useProducts()

  const { data: products, isLoading: queryLoading } = useQuery("products", productsAPI.getAll, {
    onSuccess: (data) => {
      setProducts(data)
    },
    staleTime: 5 * 60 * 1000,
  })

  useEffect(() => {
    setLoading(queryLoading)
  }, [queryLoading, setLoading])

  const filteredProducts = getFilteredProducts()

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center min-h-96">
          <Spinner size="lg" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <FilterSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Products ({filteredProducts.length})</h1>
            <SortDropdown />
          </div>

          {/* Products Grid */}
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  )
}

export default ProductCatalogPage
