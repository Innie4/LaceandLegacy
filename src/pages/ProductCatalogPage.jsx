import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Grid, List, Search, Sliders, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ProductCard from '../components/products/ProductCard';
import FilterSidebar from '../components/products/FilterSidebar';
import QuickViewModal from '../components/products/QuickViewModal';
import useDebounce from '../hooks/useDebounce';
import { mockProducts } from '../data/mockProducts';

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'era_asc', label: 'Era: Oldest First' },
  { value: 'era_desc', label: 'Era: Newest First' }
];

const itemsPerPageOptions = [12, 24, 36, 48];

const ProductCatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // Default to list view on mobile, grid on desktop
  const [viewMode, setViewMode] = useState(() => {
    return window.innerWidth < 768 ? 'list' : 'grid';
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({
    sizes: [],
    colors: [],
    priceRange: [0, 1000],
    eras: [],
    styles: [],
    conditions: []
  });

  const debouncedSearch = useDebounce(searchQuery, 300);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('search', debouncedSearch);
    if (sortBy !== 'newest') params.set('sort', sortBy);
    if (currentPage > 1) params.set('page', currentPage);
    if (itemsPerPage !== 12) params.set('per_page', itemsPerPage);
    
    // Add filter params
    Object.entries(filters).forEach(([key, value]) => {
      if (value.length > 0) {
        params.set(key, value.join(','));
      }
    });

    setSearchParams(params);
  }, [debouncedSearch, sortBy, currentPage, itemsPerPage, filters, setSearchParams]);

  // Filter and sort products
  const filteredProducts = useCallback(() => {
    let result = [...mockProducts];

    // Apply search
    if (debouncedSearch) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        product.description.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // Apply filters
    if (filters.sizes.length > 0) {
      result = result.filter(product =>
        filters.sizes.includes(product.size)
      );
    }
    if (filters.colors.length > 0) {
      result = result.filter(product =>
        filters.colors.includes(product.color)
      );
    }
    if (filters.eras.length > 0) {
      result = result.filter(product =>
        filters.eras.includes(product.decade)
      );
    }
    if (filters.styles.length > 0) {
      result = result.filter(product =>
        filters.styles.includes(product.style)
      );
    }
    if (filters.conditions.length > 0) {
      result = result.filter(product =>
        filters.conditions.includes(product.condition)
      );
    }
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) {
      result = result.filter(product =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'era_asc':
        result.sort((a, b) => a.eraYear - b.eraYear);
        break;
      case 'era_desc':
        result.sort((a, b) => b.eraYear - a.eraYear);
        break;
      default: // newest
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [debouncedSearch, filters, sortBy]);

  const products = filteredProducts();
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      sizes: [],
      colors: [],
      priceRange: [0, 1000],
      eras: [],
      styles: [],
      conditions: []
    });
    toast.success('Filters cleared');
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-0">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-2 border-2 border-gray-300 rounded-lg text-black hover:bg-gray-100 transition-colors duration-300"
              >
                <Sliders className="h-5 w-5 mr-2" />
                Filters
              </button>
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'grid'
                      ? 'bg-gray-100 text-black'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'list'
                      ? 'bg-gray-100 text-black'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="relative flex-1 sm:flex-none">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black text-black placeholder-gray-400"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black text-black"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {Object.entries(filters).some(([_, value]) => 
            Array.isArray(value) ? value.length > 0 : value !== null
          ) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.entries(filters).map(([key, value]) => {
                if (Array.isArray(value) && value.length > 0) {
                  return value.map(item => (
                    <span
                      key={`${key}-${item}`}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-black"
                    >
                      {item}
                      <button
                        onClick={() => handleFilterChange(key, value.filter(v => v !== item))}
                        className="ml-2 hover:text-black"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </span>
                  ));
                }
                return null;
              })}
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-200 text-black hover:bg-gray-300"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        <div className="flex gap-8 relative">
          {/* Filter Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                className="w-64 flex-shrink-0 hidden lg:block"
              >
                <div className="sticky top-24">
                  <FilterSidebar
                    isOpen={showFilters}
                    onClose={() => setShowFilters(false)}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={clearFilters}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Filter Sidebar */}
          {showFilters && (
            <FilterSidebar
              isOpen={showFilters}
              onClose={() => setShowFilters(false)}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
          )}

          {/* Product Grid/List */}
          <div className="flex-1 min-w-0">
            {paginatedProducts.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1'
                } md:${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}
              >
                {paginatedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                    onQuickView={() => handleQuickView(product)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-black">
                  No products found
                </h3>
                <p className="mt-2 text-gray-700">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-black">Items per page:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="px-2 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black text-black"
                  >
                    {itemsPerPageOptions.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border-2 border-gray-300 text-black hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`w-8 h-8 rounded-lg border-2 ${
                        currentPage === index + 1
                          ? 'bg-gray-600 text-white border-gray-600'
                          : 'border-gray-300 text-black hover:bg-gray-100'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border-2 border-gray-300 text-black hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <QuickViewModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductCatalogPage;