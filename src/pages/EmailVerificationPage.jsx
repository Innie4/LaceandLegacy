import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Loader2, ArrowLeft, RefreshCw } from 'lucide-react';
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

const EmailVerificationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // TODO: Implement verification logic
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      setIsVerified(true);
      toast.success('Email verified successfully!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      toast.error('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCountdown > 0) return;
    
    try {
      // TODO: Implement resend logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setResendCountdown(60);
      const timer = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      toast.success('Verification code resent!');
    } catch (error) {
      toast.error('Failed to resend code. Please try again.');
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
            Verify Your Email
          </h2>
          <p className="mt-2 text-amber-600">
            Enter the verification code sent to your email address
          </p>
        </div>

        {!isVerified ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-amber-900">
                Verification Code
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-amber-400" />
                </div>
                <input
                  id="code"
                  type="text"
                  {...register('code', {
                    required: 'Verification code is required',
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message: 'Code must be 6 digits'
                    }
                  })}
                  className={`block w-full pl-10 pr-3 py-2 border-2 ${
                    errors.code ? 'border-red-300' : 'border-amber-300'
                  } rounded-lg focus:outline-none focus:border-amber-600 text-amber-900 placeholder-amber-400`}
                  placeholder="123456"
                  maxLength={6}
                />
                {errors.code && (
                  <p className="mt-1 text-sm text-red-600 font-mono">
                    {errors.code.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  'Verify Email'
                )}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleResendCode}
                disabled={resendCountdown > 0}
                className="inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`h-4 w-4 mr-1 ${resendCountdown > 0 ? 'animate-spin' : ''}`} />
                {resendCountdown > 0
                  ? `Resend code in ${resendCountdown}s`
                  : 'Resend verification code'}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-8 text-center space-y-4">
            <div className="rounded-full bg-amber-100 p-3 inline-block">
              <Mail className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-medium text-amber-900">
              Email Verified!
            </h3>
            <p className="text-amber-600">
              Your email has been successfully verified. Redirecting to login...
            </p>
          </div>
        )}

        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-800 transition-colors duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Login
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default EmailVerificationPage; 