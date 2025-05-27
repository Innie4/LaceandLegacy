"use client"
import { Trash2 } from "lucide-react"
import { useCart } from "@/context/CartContext"
import QuantitySelector from "../QuantitySelector/QuantitySelector"

const CartItem = ({ item }) => {
  const { removeItem, updateQuantity } = useCart()

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  return (
    <div className="flex items-center space-x-4 py-4 border-b border-gray-200">
      <img
        src={item.image || "/placeholder.svg?height=80&width=80"}
        alt={item.name}
        className="h-16 w-16 object-cover rounded-md"
      />

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{formatPrice(item.price)}</p>
      </div>

      <div className="flex items-center space-x-2">
        <QuantitySelector quantity={item.quantity} onQuantityChange={(quantity) => updateQuantity(item.id, quantity)} />
        <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 p-1">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default CartItem
