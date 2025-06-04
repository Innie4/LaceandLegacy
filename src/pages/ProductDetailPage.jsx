import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import {
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Star,
  Ruler,
  Info,
  ShoppingCart,
  Loader2,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import ImageGallery from '../components/products/ImageGallery';
import SizeGuideModal from '../components/products/SizeGuideModal';
import ReviewSection from '../components/products/ReviewSection';
import ProductRecommendations from '../components/products/ProductRecommendations';
import { mockProducts } from '../data/mockProducts';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Simulate API call
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        const foundProduct = mockProducts.find(p => p.id === id);
        if (foundProduct) {
          setProduct(foundProduct);
          setSelectedColor(foundProduct.colors[0]);
        }
      } catch (error) {
        toast.error('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    // TODO: Implement add to cart logic
    toast.success('Added to cart');
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(
      isWishlisted
        ? 'Removed from wishlist'
        : 'Added to wishlist'
    );
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } catch (error) {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-amber-600 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-amber-900">Product not found</h2>
          <Link
            to="/products"
            className="mt-4 inline-flex items-center text-amber-600 hover:text-amber-700"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Breadcrumb Navigation */}
      <nav className="bg-white border-b-2 border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-amber-600 hover:text-amber-700">
              Home
            </Link>
            <span className="text-amber-400">/</span>
            <Link to="/products" className="text-amber-600 hover:text-amber-700">
              Products
            </Link>
            <span className="text-amber-400">/</span>
            <span className="text-amber-900">{product.name}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image Gallery */}
          <div className="relative">
            <ImageGallery
              images={product.images}
              currentIndex={currentImageIndex}
              onIndexChange={setCurrentImageIndex}
            />
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-amber-900 font-mono">
                {product.name}
              </h1>
              <div className="mt-2 flex items-center gap-4">
                <span className="text-2xl font-bold text-amber-900 font-mono">
                  ${product.price.toFixed(2)}
                </span>
                <span className="px-3 py-1 text-sm font-medium bg-amber-100 text-amber-900 rounded-full">
                  {product.era}
                </span>
                <span className="px-3 py-1 text-sm font-medium bg-amber-100 text-amber-900 rounded-full">
                  {product.condition}
                </span>
              </div>
            </div>

            <p className="text-amber-600">{product.description}</p>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-amber-900 mb-2">
                Color
              </h3>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                      selectedColor === color
                        ? 'border-amber-600'
                        : 'border-amber-300'
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-amber-900">
                  Size
                </h3>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-sm text-amber-600 hover:text-amber-700 flex items-center gap-1"
                >
                  <Ruler className="h-4 w-4" />
                  Size Guide
                </button>
              </div>
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
            <div>
              <h3 className="text-sm font-medium text-amber-900 mb-2">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 rounded-lg border-2 border-amber-300 text-amber-900 hover:border-amber-600 transition-colors duration-300"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-lg font-medium text-amber-900">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 rounded-lg border-2 border-amber-300 text-amber-900 hover:border-amber-600 transition-colors duration-300"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 border-2 border-amber-600 rounded-lg text-amber-900 hover:bg-amber-600 hover:text-white transition-colors duration-300"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
              <button
                onClick={handleWishlist}
                className={`p-3 rounded-lg border-2 transition-colors duration-300 ${
                  isWishlisted
                    ? 'border-red-300 text-red-500 hover:text-red-600'
                    : 'border-amber-300 text-amber-600 hover:text-amber-700'
                }`}
              >
                <Heart
                  className={`h-5 w-5 ${
                    isWishlisted ? 'fill-current' : ''
                  }`}
                />
              </button>
              <button
                onClick={handleShare}
                className="p-3 rounded-lg border-2 border-amber-300 text-amber-600 hover:text-amber-700 transition-colors duration-300"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t-2 border-amber-200 pt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-amber-900">
                      Authenticity Guarantee
                    </h3>
                    <p className="mt-1 text-sm text-amber-600">
                      Every vintage piece is carefully authenticated by our experts.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Ruler className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-amber-900">
                      Measurements
                    </h3>
                    <p className="mt-1 text-sm text-amber-600">
                      {product.measurements}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <ReviewSection productId={product.id} />
        </div>

        {/* Recommendations */}
        <div className="mt-16">
          <ProductRecommendations
            currentProductId={product.id}
            category={product.category}
          />
        </div>
      </div>

      {/* Size Guide Modal */}
      <AnimatePresence>
        {showSizeGuide && (
          <SizeGuideModal onClose={() => setShowSizeGuide(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetailPage; 