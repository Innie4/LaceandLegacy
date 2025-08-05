import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, ChevronDown, Sun, Moon } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`absolute w-full z-[1] transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.jpg" alt="Logo" className="h-10 w-10 object-contain" />
            <span className="text-3xl font-bold text-black font-mono tracking-wider">
              Lace and Legacy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-black hover:text-gray-700 transition-colors duration-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Home
            </Link>
            <Link to="/catalog" className="text-black hover:text-gray-700 transition-colors duration-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Shop
            </Link>
            <Link to="/reviews" className="text-black hover:text-gray-700 transition-colors duration-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Reviews
            </Link>
            <Link to="/about" className="text-black hover:text-gray-700 transition-colors duration-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Our Story
            </Link>
            <Link to="/contact" className="text-black hover:text-gray-700 transition-colors duration-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Contact
            </Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <Link
                to="/account"
                className="text-amber-900 hover:text-amber-600 transition-colors duration-300 font-mono"
              >
                My Account
              </Link>
            ) : (
              <div className="hidden lg:flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-amber-900 hover:text-amber-600 transition-colors duration-300 font-mono"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-black px-4 py-2 rounded-lg border border-black hover:bg-gray-100 transition-colors duration-300"
                  style={{ fontFamily: 'Times New Roman, Times, serif' }}
                >
                  Register
                </Link>
              </div>
            )}
            <Link to="/cart" className="text-amber-900 hover:text-amber-600 transition-colors duration-300 relative">
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-amber-900 hover:text-amber-600 transition-colors duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t-2 border-amber-200">
          <div className="px-4 py-3 space-y-3">
            <Link to="/" className="block text-black hover:text-gray-700 transition-colors duration-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Home
            </Link>
            <Link to="/catalog" className="block text-black hover:text-gray-700 transition-colors duration-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Shop
            </Link>
            <Link to="/reviews" className="block text-black hover:text-gray-700 transition-colors duration-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Reviews
            </Link>
            <Link to="/about" className="block text-black hover:text-gray-700 transition-colors duration-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Our Story
            </Link>
            <Link to="/contact" className="block text-black hover:text-gray-700 transition-colors duration-300" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Contact
            </Link>
            {user ? (
              <Link
                to="/account"
                className="block text-amber-900 hover:text-amber-600 transition-colors duration-300 font-mono"
              >
                My Account
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="block bg-white text-black px-4 py-2 rounded-lg border border-black hover:bg-gray-100 transition-colors duration-300 text-center"
                  style={{ fontFamily: 'Times New Roman, Times, serif' }}
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="block text-amber-900 hover:text-amber-600 transition-colors duration-300 font-mono"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 