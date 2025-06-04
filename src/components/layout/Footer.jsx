import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-amber-50 border-t-2 border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="text-3xl font-bold text-amber-900 font-mono tracking-wider">
              ThrowbackTee
            </Link>
            <p className="text-amber-800">
              Your destination for authentic vintage t-shirts from the most iconic moments in history.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-amber-600 hover:text-amber-800 transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-amber-600 hover:text-amber-800 transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-amber-600 hover:text-amber-800 transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="mailto:contact@throwbacktee.com" className="text-amber-600 hover:text-amber-800 transition-colors duration-300">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-amber-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog" className="text-amber-800 hover:text-amber-600 transition-colors duration-300">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-amber-800 hover:text-amber-600 transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-amber-800 hover:text-amber-600 transition-colors duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-amber-800 hover:text-amber-600 transition-colors duration-300">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-amber-900 mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping" className="text-amber-800 hover:text-amber-600 transition-colors duration-300">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-amber-800 hover:text-amber-600 transition-colors duration-300">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/care-guide" className="text-amber-800 hover:text-amber-600 transition-colors duration-300">
                  Care Guide
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-amber-800 hover:text-amber-600 transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-amber-900 mb-4">Stay Updated</h3>
            <p className="text-amber-800 mb-4">
              Subscribe to our newsletter for exclusive offers and vintage finds.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-600"
              />
              <button
                type="submit"
                className="w-full bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-amber-200">
          <p className="text-center text-amber-800">
            © {new Date().getFullYear()} ThrowbackTee. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 