import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Lock, Chrome, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import ErrorBanner from '../components/feedback/ErrorBanner';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }, 
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn'
    }
  }
};

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { addToCart } = useCart();
  const { login } = useUser();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Use UserContext to perform login and set auth state/token
      await login({ email: data.email, password: data.password });
      toast.success('Login successful!');

      // Consume any pending cart item saved pre-login
      const pendingCartItem = localStorage.getItem('pendingCartItem');
      if (pendingCartItem) {
        try {
          const cartItem = JSON.parse(pendingCartItem);
          await addToCart(cartItem);
          localStorage.removeItem('pendingCartItem');
          toast.success('Item added to cart after login!');
        } catch (error) {
          console.error('Failed to add pending cart item:', error);
          toast.error('Failed to add item to cart');
        }
      }

      // Redirect to return path if present, else personal info
      const returnTo =
        location.state?.returnTo ||
        (location.state?.from?.pathname ?? null) ||
        '/account/personal-info';
      navigate(returnTo, { replace: true });
    } catch (error) {
      const message = error?.response?.data?.message || 'Login failed. Please try again.';
      toast.error(message);
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    toast.loading(`Connecting to ${provider}...`);
    // TODO: Implement social login
  };

  return (    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen bg-white flex items-center justify-center px-4 py-12"
    >
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200">
        {errorMessage && (
          <ErrorBanner message={errorMessage} onClose={() => setErrorMessage('')} />
        )}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black font-mono">
            Welcome Back
          </h2>
          <p className="mt-2 text-gray-700">
            Sign in to your account to continue
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black">
                Email Address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className={`block w-full pl-10 pr-3 py-2 border-2 ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:border-black text-black placeholder-gray-400`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 font-mono">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    }
                  })}
                  className={`block w-full pl-10 pr-3 py-2 border-2 ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:border-black text-black placeholder-gray-400`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 font-mono">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                {...register('rememberMe')}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-black">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-black hover:text-gray-900 transition-colors duration-300"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-700">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSocialLogin('Google')}
              className="w-full inline-flex justify-center py-2 px-4 border-2 border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-black hover:bg-gray-100 transition-colors duration-300"
            >
              <Chrome className="h-5 w-5" />
              <span className="ml-2">Google</span>
            </button>
            <button
              onClick={() => handleSocialLogin('Facebook')}
              className="w-full inline-flex justify-center py-2 px-4 border-2 border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-black hover:bg-gray-100 transition-colors duration-300"
            >
              <Mail className="h-5 w-5" />
              <span className="ml-2">Facebook</span>
            </button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-700">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-black hover:text-gray-900 transition-colors duration-300"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;