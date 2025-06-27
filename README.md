# Lace and Legacy - Your Vintage T-Shirt Destination

Welcome to Lace and Legacy, your one-stop shop for authentic vintage and retro t-shirts! This guide will help you understand how to use our website and make the most of your shopping experience.

## 🛍️ Shopping Features

### Browsing Products
- **Grid View**: See multiple products at once in a grid layout
- **List View**: View products in a detailed list format
- **Quick View**: Click the eye icon to see product details without leaving the page
- **Wishlist**: Click the heart icon to save items you love

### Product Information
Each product shows:
- Product name and description
- Price (including original price if on sale)
- Available sizes
- Condition rating
- Era/Decade
- High-quality product images

### Filtering & Sorting
Find exactly what you're looking for with our easy-to-use filters:
- **Price Range**: Set your budget
- **Size**: Filter by available sizes
- **Color**: Browse by color options
- **Era**: Find t-shirts from specific decades
- **Condition**: Choose based on item condition
- **Style**: Filter by style categories

Sort products by:
- Newest arrivals
- Price (low to high or high to low)
- Most popular
- Era (oldest to newest)

### Search
Use the search bar to find specific items by:
- Brand name
- Artist name
- Event name
- Keywords

## 👤 Account Features

### User Account
- Create an account to:
  - Save your favorite items
  - Track your orders
  - Save shipping information
  - Get exclusive offers

### Shopping Cart
- Add items to your cart
- Review your selections
- Update quantities
- Save items for later

## 🎨 Website Features

### Theme Options
- Light mode: Bright, clean interface
- Dark mode: Easy on the eyes for night browsing

### Mobile Friendly
- Shop on any device
- Easy-to-use mobile menu
- Responsive design for all screen sizes

## 🔍 Product Categories

Browse our collection of:
- Band Tour T-shirts
- Sports Memorabilia
- Movie Classics
- Vintage Graphics
- Limited Editions

## 💡 Tips for Best Experience

1. **Create an Account**: Get the most out of your shopping experience by creating an account
2. **Use Filters**: Narrow down your search to find exactly what you want
3. **Check Sizing**: Review size guides before purchasing
4. **Read Descriptions**: Get all the details about each item's condition and history
5. **Save Favorites**: Use the wishlist feature to keep track of items you love

## 🛒 How to Order

1. Browse our collection
2. Select your desired items
3. Choose your size
4. Add to cart
5. Review your cart
6. Proceed to checkout
7. Enter shipping information
8. Complete payment
9. Receive order confirmation

## 📱 Contact & Support

Need help? We're here for you:
- Email: support@lace-legacy.com
- Phone: (555) 123-4567
- Live Chat: Available during business hours

## 🔒 Security & Privacy

Your security is our priority:
- Secure payment processing
- Protected personal information
- Safe shopping environment
- Privacy policy compliance

## 🚚 Shipping & Returns

### Shipping
- Fast, reliable shipping
- Tracking information provided
- International shipping available
- Free shipping on orders over $100

### Returns
- 30-day return policy
- Easy return process
- Full refund for unworn items
- Return shipping label provided

---

Thank you for choosing Lace and Legacy! We're committed to providing you with the best vintage t-shirt shopping experience. Happy shopping! 🎉

## Features

- 🎨 Vintage-inspired design system
- 📱 Fully responsive layout
- 🛒 Shopping cart functionality
- 🔐 User authentication
- 📦 Order management
- 🎯 Product filtering and search
- 🌙 Dark mode support
- 📱 PWA support
- ♿ Accessibility compliant

## Tech Stack

- React 18
- React Router 6
- Tailwind CSS
- Framer Motion
- Context API for state management
- Service Workers for offline support
- Jest & React Testing Library

## Prerequisites

- Node.js 16+
- npm or yarn
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/lace-legacy.git
cd lace-legacy
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=http://localhost:3000/api
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── components/         # Reusable components
│   ├── auth/          # Authentication components
│   ├── layout/        # Layout components
│   ├── products/      # Product-related components
│   └── ui/            # UI components
├── contexts/          # React Context providers
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── services/          # API services
├── styles/            # Global styles
└── utils/             # Utility functions
```

## Available Scripts

- `npm start` - Start development server
- `npm test` - Run tests
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- src/components/ProductCard.test.js
```

## Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy the `build` directory to your hosting service.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Style Guide

### Components

- Use functional components with hooks
- Keep components small and focused
- Use prop-types for type checking
- Follow the atomic design pattern

### Styling

- Use Tailwind CSS utility classes
- Follow BEM naming convention for custom classes
- Maintain consistent spacing and typography
- Use CSS variables for theming

### State Management

- Use Context API for global state
- Use local state for component-specific state
- Implement proper loading and error states

### Accessibility

- Use semantic HTML elements
- Include ARIA attributes where necessary
- Ensure keyboard navigation
- Maintain proper color contrast

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons by [Lucide Icons](https://lucide.dev)
- Images from [Unsplash](https://unsplash.com)
- Fonts from [Google Fonts](https://fonts.google.com)
