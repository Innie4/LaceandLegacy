import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Trash2,
  Heart,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  X,
  Loader2,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import Button from '../components/buttons/Button';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Vintage 70s Rock Band Tee',
      price: 49.99,
      image: '/images/products/rock-band-tee.jpg',
      size: 'M',
      color: 'Black',
      era: '70s',
      quantity: 1,
    },
    {
      id: 2,
      name: 'Retro 80s Neon Jacket',
      price: 89.99,
      image: '/images/products/neon-jacket.jpg',
      size: 'L',
      color: 'Pink',
      era: '80s',
      quantity: 1,
    },
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [removingItemId, setRemovingItemId] = useState(null);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal + tax + shipping;

  const handleQuantityChange = (itemId, change) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: Math.max(1, Math.min(10, item.quantity + change)),
            }
          : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setRemovingItemId(itemId);
    setTimeout(() => {
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
      setRemovingItemId(null);
      toast.success('Item removed from cart');
    }, 300);
  };

  const handleClearCart = () => {
    setShowClearConfirm(false);
    setCartItems([]);
    toast.success('Cart cleared');
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    setIsApplyingCoupon(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Coupon applied successfully');
    } catch (error) {
      toast.error('Invalid coupon code');
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleSaveForLater = (itemId) => {
    // TODO: Implement save for later functionality
    toast.success('Item saved for later');
  };

  return (
    <div className="min-h-screen bg-amber-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-amber-900 font-mono mb-8">
          Your Vintage Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-medium text-amber-900 mb-4">
              Your cart is empty
            </h2>
            <Link
              to="/products"
              className="inline-flex items-center text-amber-600 hover:text-amber-700"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-xl border-2 border-amber-200 p-4"
                >
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-amber-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-amber-900/10 mix-blend-multiply" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-amber-900 font-mono">
                            {item.name}
                          </h3>
                          <div className="mt-1 space-y-1">
                            <p className="text-sm text-amber-600">
                              Size: {item.size}
                            </p>
                            <p className="text-sm text-amber-600">
                              Color: {item.color}
                            </p>
                            <p className="text-sm text-amber-600">
                              Era: {item.era}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={removingItemId === item.id}
                          className="p-2 text-amber-600 hover:text-amber-700 transition-colors duration-300"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="p-1 rounded-lg border-2 border-amber-300 text-amber-600 hover:border-amber-600 transition-colors duration-300"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-medium text-amber-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="p-1 rounded-lg border-2 border-amber-300 text-amber-600 hover:border-amber-600 transition-colors duration-300"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-amber-900 font-mono">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => handleSaveForLater(item.id)}
                            className="mt-1 text-sm text-amber-600 hover:text-amber-700 transition-colors duration-300"
                          >
                            <Heart className="h-4 w-4 inline mr-1" />
                            Save for later
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="flex justify-between items-center">
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="text-amber-600 hover:text-amber-700 transition-colors duration-300"
                >
                  Clear Cart
                </button>
                <Link
                  to="/products"
                  className="inline-flex items-center text-amber-600 hover:text-amber-700"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border-2 border-amber-200 p-6 space-y-6">
                <h2 className="text-xl font-bold text-amber-900 font-mono">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-amber-900">
                    <span>Subtotal</span>
                    <span className="font-mono">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-amber-900">
                    <span>Tax (10%)</span>
                    <span className="font-mono">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-amber-900">
                    <span>Shipping</span>
                    <span className="font-mono">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="border-t-2 border-amber-200 pt-4">
                    <div className="flex justify-between text-lg font-bold text-amber-900">
                      <span>Total</span>
                      <span className="font-mono">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="coupon"
                      className="block text-sm font-medium text-amber-900 mb-2"
                    >
                      Coupon Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="coupon"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 px-4 py-2 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-600 text-amber-900 placeholder-amber-400"
                        placeholder="Enter code"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        disabled={isApplyingCoupon}
                        className="px-4 py-2 border-2 border-amber-600 rounded-lg text-amber-900 hover:bg-amber-600 hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isApplyingCoupon ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          'Apply'
                        )}
                      </button>
                    </div>
                  </div>

                  <Link
                    to="/checkout"
                    className="block w-full text-center px-6 py-3 border-2 border-amber-600 rounded-lg text-amber-900 hover:bg-amber-600 hover:text-white transition-colors duration-300"
                  >
                    Proceed to Checkout
                  </Link>
                </div>

                <div className="flex flex-col gap-4 mt-8">
                  <Link to="/payment">
                    <Button className="w-full">Proceed to Payment</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Clear Cart Confirmation Modal */}
      <AnimatePresence>
        {showClearConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowClearConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border-2 border-amber-200 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-amber-900 font-mono mb-4">
                Clear Cart?
              </h3>
              <p className="text-amber-600 mb-6">
                Are you sure you want to remove all items from your cart?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-4 py-2 text-amber-600 hover:text-amber-700 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearCart}
                  className="px-4 py-2 border-2 border-amber-600 rounded-lg text-amber-900 hover:bg-amber-600 hover:text-white transition-colors duration-300"
                >
                  Clear Cart
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartPage; 