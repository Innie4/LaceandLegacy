# E-Commerce Frontend

A modern, responsive e-commerce frontend built with React 18, Vite, and Tailwind CSS.

## Features

- 🛍️ Complete e-commerce functionality
- 📱 Responsive design for all devices
- 🎨 Modern UI with Tailwind CSS
- 🔐 User authentication and authorization
- 🛒 Shopping cart with persistent storage
- 💳 Checkout process
- 🔍 Product search and filtering
- ⭐ Product reviews and ratings
- 💝 Wishlist functionality
- 📦 Order tracking
- 🌙 Dark mode support (planned)

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: Context API + useReducer
- **HTTP Client**: Axios
- **Data Fetching**: React Query
- **Form Handling**: React Hook Form
- **Validation**: Yup
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd ecommerce-frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create environment file:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Update environment variables in `.env.local`

5. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

\`\`\`
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components (Header, Footer, etc.)
│   ├── ui/             # Basic UI components (Button, Input, etc.)
│   ├── product/        # Product-related components
│   ├── cart/           # Cart-related components
│   ├── auth/           # Authentication components
│   └── ...
├── pages/              # Page components
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── services/           # API services and utilities
├── utils/              # Utility functions
├── data/               # Mock data and constants
└── styles/             # Global styles
\`\`\`

## State Management

The application uses React Context API with useReducer for state management:

- **AuthContext**: User authentication state
- **CartContext**: Shopping cart state
- **ProductContext**: Product catalog and filters
- **UIContext**: UI state (modals, notifications, etc.)

## API Integration

The app is designed to work with a REST API. Currently uses mock data for development. Update the API services in `src/services/api/` to integrate with your backend.

## Deployment

### Build for Production

\`\`\`bash
npm run build
\`\`\`

The build artifacts will be stored in the `dist/` directory.

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to Netlify

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.
