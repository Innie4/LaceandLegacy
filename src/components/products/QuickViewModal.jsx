import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingCart, Heart } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useCart } from '../../contexts/CartContext';

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(
      isWishlisted
        ? 'Removed from wishlist'
        : 'Added to wishlist'
    );
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: product.color || 'Default',
      era: product.era,
      quantity: quantity
    };
    
    addToCart(cartItem);
    toast.success(`${product.name} added to cart!`);
    onClose();
  };

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl border-2 border-amber-200 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg text-amber-600 hover:text-amber-700 transition-colors duration-300 z-10"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-amber-900/10 mix-blend-multiply" />
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-amber-900 font-mono">
                    {product.name}
                  </h2>
                  <p className="mt-2 text-amber-600">
                    {product.description}
                  </p>
                </div>
                <button
                  onClick={handleWishlist}
                  className={`p-2 rounded-lg transition-colors duration-300 ${
                    isWishlisted
                      ? 'text-red-500 hover:text-red-600'
                      : 'text-amber-600 hover:text-amber-700'
                  }`}
                >
                  <Heart
                    className={`h-6 w-6 ${
                      isWishlisted ? 'fill-current' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <span className="text-3xl font-bold text-amber-900 font-mono">
                  ${product.price.toFixed(2)}
                </span>
                <span className="px-3 py-1 text-sm font-medium bg-amber-100 text-amber-900 rounded-full">
                  {product.era}
                </span>
                <span className="px-3 py-1 text-sm font-medium bg-amber-100 text-amber-900 rounded-full">
                  {product.condition}
                </span>
              </div>

              {/* Size Selection */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-amber-900 mb-2">
                  Select Size
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${
                        selectedSize === size
                          ? 'bg-amber-600 text-white'
                          : 'border-2 border-amber-300 text-amber-900 hover:border-amber-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-amber-900 mb-2">
                  Quantity
                </h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 rounded-lg border-2 border-amber-300 text-amber-900 hover:border-amber-600 transition-colors duration-300"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-lg font-medium text-amber-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 rounded-lg border-2 border-amber-300 text-amber-900 hover:border-amber-600 transition-colors duration-300"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="mt-8 inline-flex items-center justify-center px-6 py-3 border-2 border-amber-600 rounded-lg text-amber-900 hover:bg-amber-600 hover:text-white transition-colors duration-300"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuickViewModal;