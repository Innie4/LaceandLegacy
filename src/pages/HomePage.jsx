import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, ArrowRight } from 'lucide-react';
import { mockProducts } from '../data/mockProducts';

const HomePage = () => {
  const [typewriterText, setTypewriterText] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Typewriter effect for hero section
  useEffect(() => {
    const texts = [
      "Discover Vintage Treasures",
      "Timeless Style, Modern Comfort",
      "Curated Collections from Every Era"
    ];
    let i = 0;
    let j = 0;
    let isDeleting = false;
    let timer;

    const type = () => {
      const currentText = texts[i];
      if (isDeleting) {
        setTypewriterText(currentText.slice(0, j - 1));
        j--;
      } else {
        setTypewriterText(currentText.slice(0, j + 1));
        j++;
      }

      if (!isDeleting && j === currentText.length) {
        isDeleting = true;
        timer = setTimeout(type, 2000);
      } else if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % texts.length;
        timer = setTimeout(type, 500);
      } else {
        timer = setTimeout(type, isDeleting ? 50 : 100);
      }
    };

    timer = setTimeout(type, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Hero carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop&auto=format",
      title: "70s Rock Collection",
      description: "Iconic band tees from the golden era of rock"
    },
    {
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&h=600&fit=crop&auto=format",
      title: "80s Sports Classics",
      description: "Vintage sports memorabilia and team wear"
    },
    {
      image: "https://images.unsplash.com/photo-1583743814966-8936f37f630e?w=1200&h=600&fit=crop&auto=format",
      title: "90s Grunge Revival",
      description: "Authentic grunge style from the Seattle scene"
    }
  ];

  const categories = [
    { name: "Band Tees", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&auto=format", decade: "70s" },
    { name: "Sports Classics", image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop&auto=format", decade: "80s" },
    { name: "Surf & Skate", image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5b?w=400&h=400&fit=crop&auto=format", decade: "80s" },
    { name: "Movie Classics", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=400&fit=crop&auto=format", decade: "70s" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/40" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover filter sepia-[0.2]"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 font-mono tracking-wider">
                  {typewriterText}
                </h1>
                <p className="text-xl md:text-2xl mb-8 font-mono">
                  {slide.description}
                </p>
                <div className="space-x-4">
                  <Link
                    to="/catalog"
                    className="inline-block bg-amber-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-700 transition-colors duration-300"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Product Categories Showcase */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-amber-900 mb-12 text-center font-mono">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/catalog?category=${category.name}`}
                className="group relative overflow-hidden rounded-xl border-4 border-amber-800"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full aspect-square object-cover filter sepia-[0.1] group-hover:sepia-[0.3] transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                  <span className="text-amber-400 text-sm font-mono mb-2">
                    {category.decade}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  <div className="flex items-center text-amber-400">
                    <span className="text-sm font-mono">Explore Collection</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Throwback Finds Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-amber-900 mb-12 text-center font-mono">
              Latest Throwback Finds
            </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockProducts.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-amber-200"
              >
                <div className="relative overflow-hidden aspect-square">
                  {product.isNew && (
                    <div className="absolute top-3 left-3 z-10 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      NEW IN
                    </div>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter sepia-[0.1] group-hover:sepia-[0.3]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-3">
                      <button className="bg-white text-amber-800 p-2 rounded-full hover:bg-amber-100 transition-colors duration-300">
                        <Heart className="h-5 w-5" />
                      </button>
                      <button className="bg-white text-amber-800 p-2 rounded-full hover:bg-amber-100 transition-colors duration-300">
                        <ShoppingCart className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
                      {product.decade}
                    </span>
                    <span className="text-amber-600 text-sm font-mono">
                      {product.condition}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-amber-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-amber-600 text-sm mb-3 font-mono">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-amber-900">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                      <span className="text-amber-500 line-through">
                          ${product.originalPrice.toFixed(2)}
                      </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-amber-900 font-mono">
                Our Vintage Journey
              </h2>
              <div className="space-y-6">
                <div className="relative pl-8 border-l-4 border-amber-600">
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-amber-600 rounded-full" />
                  <h3 className="text-2xl font-bold text-amber-900 mb-2">2018</h3>
                  <p className="text-amber-700">
                    Started as a small vintage shop in downtown, curating the finest collection of retro tees.
                </p>
              </div>
                <div className="relative pl-8 border-l-4 border-amber-600">
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-amber-600 rounded-full" />
                  <h3 className="text-2xl font-bold text-amber-900 mb-2">2020</h3>
                  <p className="text-amber-700">
                    Expanded our collection to include rare finds from the 50s to the 90s.
                </p>
              </div>
                <div className="relative pl-8 border-l-4 border-amber-600">
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-amber-600 rounded-full" />
                  <h3 className="text-2xl font-bold text-amber-900 mb-2">2023</h3>
                  <p className="text-amber-700">
                    Launched our online store, bringing vintage fashion to enthusiasts worldwide.
                </p>
              </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&auto=format"
                alt="Vintage Collection"
                className="rounded-lg filter sepia-[0.2]"
              />
              <img
                src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop&auto=format"
                alt="Store Front"
                className="rounded-lg filter sepia-[0.2] mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-amber-900 mb-4 font-mono">
            Join Our Vintage Community
          </h2>
          <p className="text-amber-600 mb-8 font-mono">
            Subscribe to get exclusive access to new arrivals and special offers
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-600 transition-colors duration-300 font-mono bg-white"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 font-mono">ThrowbackTee</h3>
              <p className="text-amber-200 mb-4">
                Curating the finest vintage t-shirts from every era.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-amber-200 hover:text-white transition-colors duration-300">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-amber-200 hover:text-white transition-colors duration-300">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
                <a href="#" className="text-amber-200 hover:text-white transition-colors duration-300">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 font-mono">Shop</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/catalog" className="text-amber-200 hover:text-white transition-colors duration-300">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link to="/catalog" className="text-amber-200 hover:text-white transition-colors duration-300">
                    Best Sellers
                  </Link>
                </li>
                <li>
                  <Link to="/catalog" className="text-amber-200 hover:text-white transition-colors duration-300">
                    Collections
                  </Link>
                </li>
                <li>
                  <Link to="/catalog" className="text-amber-200 hover:text-white transition-colors duration-300">
                    Sale
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 font-mono">About</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-amber-200 hover:text-white transition-colors duration-300">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-amber-200 hover:text-white transition-colors duration-300">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-amber-200 hover:text-white transition-colors duration-300">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-amber-200 hover:text-white transition-colors duration-300">
                    Contact
                  </Link>
                  </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 font-mono">Help</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/faq" className="text-amber-200 hover:text-white transition-colors duration-300">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/shipping" className="text-amber-200 hover:text-white transition-colors duration-300">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link to="/returns" className="text-amber-200 hover:text-white transition-colors duration-300">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link to="/size-guide" className="text-amber-200 hover:text-white transition-colors duration-300">
                    Size Guide
                  </Link>
                  </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-amber-800 text-center">
            <p className="text-amber-200 font-mono">
              © {new Date().getFullYear()} ThrowbackTee. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
