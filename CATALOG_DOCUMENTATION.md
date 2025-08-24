# Catalog Page and Filter Component Documentation

## Overview

The Lace & Legacy catalog system provides a comprehensive product browsing experience with advanced filtering, search, sorting, and pagination capabilities. The system is built with React and includes responsive design for optimal user experience across all devices.

## Core Components

### 1. ProductCatalogPage (`src/pages/ProductCatalogPage.jsx`)

The main catalog page component that orchestrates the entire product browsing experience.

#### Key Features:
- **Responsive Layout**: Adapts to different screen sizes with mobile-first design
- **View Modes**: Grid and list view options for product display
- **Real-time Search**: Debounced search functionality for optimal performance
- **Advanced Filtering**: Multi-criteria filtering with URL parameter synchronization
- **Sorting Options**: Multiple sorting criteria (price, popularity, era, newest)
- **Pagination**: Configurable items per page with navigation controls
- **Quick View**: Modal-based product preview without page navigation

#### State Management:
```javascript
const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
const [filters, setFilters] = useState({
  eras: [],
  conditions: [],
  sizes: [],
  priceRange: [],
  styles: []
});
const [searchQuery, setSearchQuery] = useState('');
const [sortBy, setSortBy] = useState('popularity');
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(12);
```

#### Filtering Logic:
The component implements comprehensive product filtering based on:
- **Search Query**: Matches product name and description (case-insensitive)
- **Era**: Filters by vintage era (60s, 70s, 80s, 90s, 2000s)
- **Condition**: Product condition (New, Like New, Excellent, Good, Fair)
- **Size**: Available sizes (XS, S, M, L, XL, XXL)
- **Price Range**: Predefined price brackets
- **Style**: Product categories (Vintage, Retro, Classic, Streetwear, Athletic, Other)

#### Sorting Options:
- **Price**: Low to high / High to low
- **Popularity**: Based on product popularity score
- **Era**: Chronological ordering
- **Newest**: Recently added products first

#### URL Synchronization:
Filters are synchronized with URL parameters for:
- Shareable filtered views
- Browser back/forward navigation
- Bookmark-friendly URLs

### 2. FilterSidebar (`src/components/products/FilterSidebar.jsx`)

A responsive filter component that provides intuitive product filtering capabilities.

#### Key Features:
- **Responsive Design**: Mobile overlay on small screens, sidebar on desktop
- **Smooth Animations**: Framer Motion powered transitions
- **Checkbox Filters**: Multi-select filtering for each category
- **Clear Functionality**: Individual and bulk filter clearing
- **Accessibility**: Proper ARIA labels and keyboard navigation

#### Mobile Behavior:
- **Overlay Mode**: Full-screen overlay with backdrop blur
- **Slide Animation**: Smooth slide-in from left
- **Touch-Friendly**: Optimized for mobile interaction
- **Auto-Close**: Closes on backdrop click

#### Desktop Behavior:
- **Sidebar Layout**: Fixed position sidebar
- **Scrollable Content**: Scrolls with page content (non-sticky)
- **Compact Design**: Space-efficient layout

#### Filter Groups:
```javascript
const filterGroups = [
  {
    title: 'Era',
    key: 'eras',
    options: ['60s', '70s', '80s', '90s', '2000s']
  },
  {
    title: 'Condition',
    key: 'conditions',
    options: ['New', 'Like New', 'Excellent', 'Good', 'Fair']
  },
  {
    title: 'Size',
    key: 'sizes',
    options: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    title: 'Price Range',
    key: 'priceRange',
    options: ['Under $25', '$25 - $50', '$50 - $100', '$100 - $200', 'Over $200']
  },
  {
    title: 'Style',
    key: 'styles',
    options: ['Vintage', 'Retro', 'Classic', 'Streetwear', 'Athletic', 'Other']
  }
];
```

### 3. ProductCard (`src/components/products/ProductCard.jsx`)

Displays individual products in both grid and list view modes.

#### Key Features:
- **Dual View Modes**: Optimized layouts for grid and list display
- **Interactive Elements**: Hover effects and smooth animations
- **Quick Actions**: Wishlist, quick view, and add to cart
- **Responsive Images**: Optimized image display with aspect ratio preservation
- **Product Information**: Name, price, era, condition, sizes, and description

#### Grid View Features:
- **Square Aspect Ratio**: Consistent card dimensions
- **Overlay Actions**: Hover-revealed action buttons
- **Badge System**: Era and condition badges
- **Slide-up Cart**: Hidden add to cart button on hover

#### List View Features:
- **Horizontal Layout**: Side-by-side image and content
- **Expanded Information**: More detailed product description
- **Visible Actions**: Always visible action buttons
- **Responsive Stacking**: Stacks vertically on mobile

#### Animation System:
```javascript
const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { y: -5 }
};

const imageVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 }
};
```

### 4. QuickViewModal (`src/components/products/QuickViewModal.jsx`)

Provides detailed product preview without page navigation.

#### Key Features:
- **Modal Overlay**: Full-screen modal with backdrop blur
- **Product Details**: Complete product information display
- **Size Selection**: Interactive size picker
- **Quantity Control**: Increment/decrement quantity selector
- **Add to Cart**: Direct cart addition from modal
- **Wishlist Integration**: Toggle wishlist status

#### Layout:
- **Two-Column Design**: Image on left, details on right
- **Responsive Grid**: Stacks on mobile devices
- **Smooth Animations**: Scale and fade transitions
- **Click Outside**: Closes on backdrop click

### 5. useDebounce Hook (`src/hooks/useDebounce.js`)

Optimizes search performance by debouncing user input.

#### Implementation:
```javascript
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

#### Benefits:
- **Performance**: Reduces unnecessary API calls or filtering operations
- **User Experience**: Smooth typing experience without lag
- **Resource Efficiency**: Minimizes computational overhead

## Technical Implementation

### Dependencies
- **React**: Core framework with hooks
- **Framer Motion**: Animation library for smooth transitions
- **React Router**: Navigation and URL management
- **Lucide React**: Icon library for UI elements
- **React Hot Toast**: Toast notifications for user feedback

### Styling Approach
- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach with breakpoints
- **Color Scheme**: Amber-based theme with black accents
- **Typography**: Mono font for headings, sans-serif for body text

### Performance Optimizations
- **Debounced Search**: 300ms delay for search input
- **Memoized Filtering**: useCallback for expensive operations
- **Lazy Loading**: Images loaded on demand
- **Virtual Scrolling**: Pagination to limit DOM elements

### Accessibility Features
- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Logical tab order
- **Color Contrast**: WCAG compliant color combinations

## Data Flow

### Filter State Management
1. **User Interaction**: User selects/deselects filter options
2. **State Update**: Filter state updated via `onFilterChange`
3. **URL Sync**: URL parameters updated to reflect current filters
4. **Product Filtering**: Products filtered based on current state
5. **UI Update**: Filtered products displayed with updated counts

### Search Flow
1. **User Input**: User types in search field
2. **Debouncing**: Input debounced with 300ms delay
3. **Filter Application**: Search query applied to product filtering
4. **Results Display**: Matching products displayed
5. **No Results**: Helpful message shown when no matches found

### Cart Integration
1. **Product Selection**: User clicks "Add to Cart"
2. **Cart Context**: Item added via `useCart` hook
3. **Toast Notification**: Success message displayed
4. **State Persistence**: Cart state maintained across navigation

## Mobile Responsiveness

### Breakpoints
- **Mobile**: < 768px (sm)
- **Tablet**: 768px - 1024px (md)
- **Desktop**: > 1024px (lg)

### Mobile Optimizations
- **Touch Targets**: Minimum 44px touch targets
- **Swipe Gestures**: Natural mobile interactions
- **Viewport Optimization**: Proper viewport meta tag
- **Performance**: Optimized for mobile networks

### Layout Adaptations
- **Filter Sidebar**: Converts to full-screen overlay
- **Product Grid**: Responsive column counts
- **Navigation**: Hamburger menu for mobile
- **Typography**: Scaled font sizes for readability

## Future Enhancements

### Potential Improvements
1. **Infinite Scroll**: Replace pagination with infinite scrolling
2. **Advanced Search**: Fuzzy search and search suggestions
3. **Filter Presets**: Saved filter combinations
4. **Product Comparison**: Side-by-side product comparison
5. **Recently Viewed**: Track and display recently viewed products
6. **Personalization**: AI-powered product recommendations
7. **Advanced Sorting**: Custom sorting options
8. **Bulk Actions**: Multi-select for bulk operations

### Performance Enhancements
1. **Virtual Scrolling**: For large product catalogs
2. **Image Optimization**: WebP format and lazy loading
3. **Caching**: Client-side caching for filter results
4. **Service Worker**: Offline functionality

## Troubleshooting

### Common Issues
1. **Filters Not Working**: Check filter state and URL parameters
2. **Search Lag**: Verify debounce implementation
3. **Mobile Layout Issues**: Check responsive breakpoints
4. **Animation Performance**: Reduce motion for low-end devices

### Debug Tips
1. **React DevTools**: Inspect component state and props
2. **Network Tab**: Monitor API calls and performance
3. **Console Logging**: Add strategic console.log statements
4. **Responsive Testing**: Use browser dev tools for mobile testing

This documentation provides a comprehensive overview of the catalog page and filter component architecture, implementation details, and usage guidelines for the Lace & Legacy e-commerce platform.