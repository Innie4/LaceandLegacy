import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { toast } from 'react-hot-toast';

import ProductCard from '../components/products/ProductCard';
import FilterSidebar from '../components/products/FilterSidebar';
import QuickViewModal from '../components/products/QuickViewModal';
import useDebounce from '../hooks/useDebounce';
import { mockProducts } from '../data/mockProducts';
import { useCart } from '../contexts/CartContext';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/forms/Select';
import Badge from '../components/ui/Badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../components/ui/Sheet';
import Input from '../components/forms/Input';
import Button from '../components/buttons/Button';



const ProductCatalogPage = () => {
  // Default to list view on mobile, grid on desktop
  const [viewMode, setViewMode] = useState(() => {
    return window.innerWidth < 768 ? 'list' : 'grid';
  });
  const [showFilters, setShowFilters] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [sortBy, setSortBy] = useState('newest');
  const [headerHeight, setHeaderHeight] = useState(0);
  const { addToCart } = useCart();
  const [filters, setFilters] = useState({
    sizes: [],
    colors: [],
    priceRange: [0, 1000],
    eras: [],
    styles: [],
    conditions: []
  });

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Calculate header height for proper sticky positioning
  useEffect(() => {
    const header = document.querySelector('[data-header]');
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
  }, []);

  // Calculate active filters count
  const activeFiltersCount = useMemo(() => {
    return Object.values(filters).reduce((count, filterArray) => count + filterArray.length, 0);
  }, [filters]);

  // Get active filters for display
  const activeFilters = useMemo(() => {
    const active = {};
    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        active[key] = values;
      }
    });
    return active;
  }, [filters]);

  // Remove individual filter
  const removeFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].filter(item => item !== value)
    }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      eras: [],
      conditions: [],
      sizes: [],
      colors: [],
      priceRange: [],
      styles: [],
    });
  };



  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];

    // Apply search
    if (debouncedSearchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
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
  }, [debouncedSearchQuery, filters, sortBy]);

  const products = filteredProducts;
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

  const handleQuickView = (product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = async (product) => {
    try {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: Array.isArray(product.sizes) ? product.sizes[0] : product.size || 'M',
        color: product.color || 'Default',
        era: product.era,
        quantity: 1
      };
      
      await addToCart(cartItem);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error('Failed to add item to cart');
      console.error('Cart error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Filter Header */}
      <div
        className="sticky bg-white border-b border-gray-200 shadow-sm z-40"
        style={{
          top: `${headerHeight}px`,
          position: 'sticky'
        }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-10 pr-4 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Filter Controls */}
            <div className="flex items-center gap-4 ml-4">
              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                  <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Button */}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filter & Sort
                {activeFiltersCount > 0 && (
                  <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
              
              {/* Desktop Filter Toggle */}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="hidden lg:flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filter
                {activeFiltersCount > 0 && (
                  <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {Object.entries(activeFilters).map(([key, values]) =>
                values.map(value => (
                  <Badge
                    key={`${key}-${value}`}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {value}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => removeFilter(key, value)}
                    />
                  </Badge>
                ))
              )}
              <Button
                variant="link"
                size="sm"
                onClick={clearAllFilters}
                className="text-red-600 hover:text-red-700"
              >
                Clear All
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content with Proper Layout */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside
            className={`hidden lg:block transition-all duration-300 lg:ml-6 ${
              showFilters ? 'w-80 opacity-100' : 'w-0 opacity-0 overflow-hidden'
            }`}
          >
            <div className="sticky top-4 bg-white rounded-lg shadow-sm p-6">
              <FilterSidebar
                filters={filters}
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearAllFilters}
              />
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1 min-w-0">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {products.length} of {mockProducts.length} products
              </p>
            </div>

            {/* View Mode Toggle - Mobile */}
            <div className="md:hidden mb-4 flex justify-end">
              <div className="flex border-2 border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-600 text-white' : 'bg-white text-black hover:bg-gray-100'} transition-colors duration-300`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-600 text-white' : 'bg-white text-black hover:bg-gray-100'} transition-colors duration-300`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Products */}
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <Button
                  onClick={clearAllFilters}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1'
                }`}>
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      viewMode={viewMode}
                      onQuickView={() => handleQuickView(product)}
                      onAddToCart={() => handleAddToCart(product)}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Items per page:</span>
                      <Select
                        value={itemsPerPage.toString()}
                        onValueChange={(value) => {
                          setItemsPerPage(Number(value));
                          setCurrentPage(1);
                        }}
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12">12</SelectItem>
                          <SelectItem value="24">24</SelectItem>
                          <SelectItem value="48">48</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      
                      <span className="px-4 py-2 text-sm">
                        Page {currentPage} of {totalPages}
                      </span>
                      
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
        <SheetContent side="left" className="w-full sm:w-80 p-0">
          <SheetHeader className="p-6 border-b">
            <SheetTitle>Filter Products</SheetTitle>
          </SheetHeader>
          <div className="p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Filter & Sort</h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <FilterSidebar
              filters={filters}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearAllFilters}
              onClose={() => setIsMobileFilterOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>

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