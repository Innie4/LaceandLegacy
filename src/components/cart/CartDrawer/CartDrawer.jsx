"use client"
import { Link } from "react-router-dom"
import { X, ShoppingBag } from "lucide-react"
import { useCart } from "@/context/CartContext"
import CartItem from "../CartItem/CartItem"
import Button from "@/components/ui/Button/Button"

const CartDrawer = () => {
  const { isOpen, setCartOpen, items, totalPrice, totalItems } = useCart()

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {/* Background overlay */}
        <div
          className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={() => setCartOpen(false)}
        />

        {/* Drawer */}
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-6 bg-gray-50">
                <h2 className="text-lg font-medium text-gray-900">Shopping Cart ({totalItems})</h2>
                <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-gray-500">
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Cart items */}
              <div className="flex-1 overflow-y-auto px-4 py-6">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                    <Link
                      to="/products"
                      onClick={() => setCartOpen(false)}
                      className="text-primary-600 hover:text-primary-500 mt-2 inline-block"
                    >
                      Continue shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-gray-200 px-4 py-6">
                  <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                    <p>Subtotal</p>
                    <p>{formatPrice(totalPrice)}</p>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">Shipping and taxes calculated at checkout.</p>
                  <Link to="/checkout" onClick={() => setCartOpen(false)}>
                    <Button className="w-full mb-3">Checkout</Button>
                  </Link>
                  <Link
                    to="/cart"
                    onClick={() => setCartOpen(false)}
                    className="block text-center text-sm text-primary-600 hover:text-primary-500"
                  >
                    View full cart
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartDrawer
