"use client"
import { Link } from "react-router-dom"
import { Heart, ShoppingCart, Star } from "lucide-react"
import Button from "@/components/ui/Button/Button"
import { useCart } from "@/context/CartContext"
import { useUI } from "@/context/UIContext"

const ProductCard = ({ product }) => {
  const { addItem } = useCart()
  const { addNotification } = useUI()

  const handleAddToCart = (e) => {
    e.preventDefault()
    addItem(product)
    addNotification({
      type: "success",
      title: "Added to cart",
      message: `${product.name} has been added to your cart`,
    })
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="group relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <Link to={`/products/${product.id}`}>
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
          <img
            src={product.image || "/placeholder.svg?height=300&width=300"}
            alt={product.name}
            className="h-48 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Wishlist button */}
      <button className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors">
        <Heart className="h-4 w-4 text-gray-400 hover:text-red-500" />
      </button>

      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors">{product.name}</h3>
        </Link>

        <div className="flex items-center mt-1">
          <div className="flex items-center">{renderStars(product.rating || 0)}</div>
          <span className="ml-2 text-sm text-gray-500">({product.reviewCount || 0})</span>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>

        <Button onClick={handleAddToCart} className="w-full mt-3" size="sm">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

export default ProductCard
