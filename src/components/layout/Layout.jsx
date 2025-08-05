import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';
import { useTheme } from '../../contexts/ThemeContext';

const Layout = ({ children }) => {
  const location = useLocation();
  const { theme } = useTheme();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };

  return (
    <div className={`min-h-screen bg-${theme === 'light' ? 'amber-50' : 'gray-900'}`}>
      <Header />
      <motion.main
        className="pt-20"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Breadcrumbs />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default Layout; 