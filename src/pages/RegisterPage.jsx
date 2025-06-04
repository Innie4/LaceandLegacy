import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Lock, User, Loader2, Globe } from 'lucide-react';
import { toast } from 'react-hot-toast';

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

const countries = [
  { code: 'US', name: 'United States', language: 'en' },
  { code: 'GB', name: 'United Kingdom', language: 'en' },
  { code: 'CA', name: 'Canada', language: 'en' },
  { code: 'AU', name: 'Australia', language: 'en' },
  { code: 'FR', name: 'France', language: 'fr' },
  { code: 'DE', name: 'Germany', language: 'de' },
  { code: 'ES', name: 'Spain', language: 'es' },
  { code: 'IT', name: 'Italy', language: 'it' },
  { code: 'JP', name: 'Japan', language: 'ja' },
  { code: 'CN', name: 'China', language: 'zh' }
];

const PasswordStrengthIndicator = ({ password }) => {
  const getStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = getStrength(password);
  const strengthText = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
  const strengthColors = ['red', 'orange', 'yellow', 'lime', 'green'];

  return (
    <div className="mt-2">
      <div className="flex gap-1 h-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`flex-1 rounded-full ${
              i < strength ? `bg-${strengthColors[i]}-500` : 'bg-amber-100'
            }`}
          />
        ))}
      </div>
      <p className={`mt-1 text-sm font-mono text-${strengthColors[strength - 1]}-600`}>
        {strengthText[strength - 1]}
      </p>
    </div>
  );
};

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('US');
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch('password', '');

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // TODO: Implement registration logic
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      toast.success('Account created successfully!');
      navigate('/verify-email');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen bg-amber-50 flex items-center justify-center px-4 py-12"
    >
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border-2 border-amber-200">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-amber-900 font-mono">
            Create Account
          </h2>
          <p className="mt-2 text-amber-600">
            Join our community of vintage fashion enthusiasts
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-amber-900">
                First Name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-amber-400" />
                </div>
                <input
                  id="firstName"
                  type="text"
                  {...register('firstName', {
                    required: 'First name is required'
                  })}
                  className={`block w-full pl-10 pr-3 py-2 border-2 ${
                    errors.firstName ? 'border-red-300' : 'border-amber-300'
                  } rounded-lg focus:outline-none focus:border-amber-600 text-amber-900 placeholder-amber-400`}
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600 font-mono">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-amber-900">
                Last Name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-amber-400" />
                </div>
                <input
                  id="lastName"
                  type="text"
                  {...register('lastName', {
                    required: 'Last name is required'
                  })}
                  className={`block w-full pl-10 pr-3 py-2 border-2 ${
                    errors.lastName ? 'border-red-300' : 'border-amber-300'
                  } rounded-lg focus:outline-none focus:border-amber-600 text-amber-900 placeholder-amber-400`}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600 font-mono">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-amber-900">
              Email Address
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-amber-400" />
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
                  errors.email ? 'border-red-300' : 'border-amber-300'
                } rounded-lg focus:outline-none focus:border-amber-600 text-amber-900 placeholder-amber-400`}
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
            <label htmlFor="country" className="block text-sm font-medium text-amber-900">
              Country
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-amber-400" />
              </div>
              <select
                id="country"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-600 text-amber-900"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-amber-900">
              Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-amber-400" />
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
                  errors.password ? 'border-red-300' : 'border-amber-300'
                } rounded-lg focus:outline-none focus:border-amber-600 text-amber-900 placeholder-amber-400`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 font-mono">
                  {errors.password.message}
                </p>
              )}
            </div>
            <PasswordStrengthIndicator password={password} />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-amber-900">
              Confirm Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-amber-400" />
              </div>
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
                className={`block w-full pl-10 pr-3 py-2 border-2 ${
                  errors.confirmPassword ? 'border-red-300' : 'border-amber-300'
                } rounded-lg focus:outline-none focus:border-amber-600 text-amber-900 placeholder-amber-400`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600 font-mono">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              {...register('terms', {
                required: 'You must accept the terms and conditions'
              })}
              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-amber-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-amber-900">
              I agree to the{' '}
              <Link to="/terms" className="text-amber-600 hover:text-amber-800">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-amber-600 hover:text-amber-800">
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.terms && (
            <p className="text-sm text-red-600 font-mono">
              {errors.terms.message}
            </p>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-amber-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-amber-600 hover:text-amber-800 transition-colors duration-300"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default RegisterPage; 