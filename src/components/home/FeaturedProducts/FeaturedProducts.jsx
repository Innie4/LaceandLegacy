import { useQuery } from "react-query"
import ProductCard from "@/components/product/ProductCard/ProductCard"
import Spinner from "@/components/common/Loading/Spinner"
import { productsAPI } from "@/services/api/products"

const FeaturedProducts = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery("featured-products", () => productsAPI.getFeatured(), {
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
        </div>
        <div className="flex justify-center">
          <Spinner size="lg" />
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-red-600">Failed to load featured products</p>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our handpicked selection of the best products
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products?.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default FeaturedProducts
