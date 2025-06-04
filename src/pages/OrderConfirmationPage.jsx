import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Calendar,
  MapPin,
  CreditCard,
  Share2,
  Printer,
  Mail,
  UserPlus,
  Phone,
  Clock,
  Package,
  Truck,
  Home,
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const OrderConfirmationPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Mock order data
  const orderData = {
    orderNumber: 'THB-2024-1234',
    orderDate: '2024-03-20',
    estimatedDelivery: '2024-03-25',
    items: [
      {
        id: 1,
        name: 'Vintage 70s Rock Band Tee',
        price: 49.99,
        quantity: 2,
        image: '/images/products/rock-band-tee.jpg',
        size: 'M',
        color: 'Black',
      },
      {
        id: 2,
        name: 'Retro 80s Neon Jacket',
        price: 89.99,
        quantity: 1,
        image: '/images/products/neon-jacket.jpg',
        size: 'L',
        color: 'Neon Pink',
      },
    ],
    shipping: {
      name: 'John Doe',
      address: '123 Retro Street',
      city: 'Vintage City',
      state: 'VC',
      zip: '12345',
      country: 'United States',
      phone: '+1 (555) 123-4567',
    },
    billing: {
      name: 'John Doe',
      address: '123 Retro Street',
      city: 'Vintage City',
      state: 'VC',
      zip: '12345',
      country: 'United States',
    },
    payment: {
      method: 'Credit Card',
      last4: '4242',
      type: 'Visa',
    },
    totals: {
      subtotal: 189.97,
      shipping: 9.99,
      tax: 15.00,
      total: 214.96,
    },
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    try {
      const shareData = {
        title: 'My ThrowbackTee Order',
        text: `I just ordered some vintage fashion from ThrowbackTee! Order #${orderData.orderNumber}`,
        url: window.location.href,
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Order link copied to clipboard');
      }
    } catch (error) {
      toast.error('Failed to share order');
    }
  };

  const handleCreateAccount = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Account creation email sent');
    } catch (error) {
      toast.error('Failed to send account creation email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Confirmation Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-4"
          >
            <CheckCircle2 className="h-16 w-16 text-amber-600 mx-auto" />
          </motion.div>
          <h1 className="text-3xl font-bold text-amber-900 font-mono mb-2">
            Order Confirmed!
          </h1>
          <p className="text-amber-600">
            Thank you for your purchase. We're excited to bring some vintage style
            to your wardrobe!
          </p>
        </motion.div>

        {/* Order Number and Delivery */}
        <div className="bg-white rounded-xl border-2 border-amber-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-medium text-amber-900 font-mono mb-2">
                Order Number
              </h2>
              <p className="text-2xl font-bold text-amber-600">
                {orderData.orderNumber}
              </p>
            </div>
            <div>
              <h2 className="text-lg font-medium text-amber-900 font-mono mb-2">
                Estimated Delivery
              </h2>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-amber-600" />
                <p className="text-amber-900">
                  {new Date(orderData.estimatedDelivery).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl border-2 border-amber-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-amber-900 font-mono mb-4">
            Order Summary
          </h2>
          <div className="space-y-4">
            {orderData.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 border-2 border-amber-100 rounded-lg"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-amber-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-amber-900 font-medium">{item.name}</h3>
                  <p className="text-sm text-amber-600">
                    Size: {item.size} | Color: {item.color}
                  </p>
                  <p className="text-sm text-amber-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-amber-900 font-mono">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Totals */}
          <div className="mt-6 pt-6 border-t-2 border-amber-200">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-amber-600">Subtotal</span>
                <span className="text-amber-900 font-mono">
                  ${orderData.totals.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-600">Shipping</span>
                <span className="text-amber-900 font-mono">
                  ${orderData.totals.shipping.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-600">Tax</span>
                <span className="text-amber-900 font-mono">
                  ${orderData.totals.tax.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span className="text-amber-900">Total</span>
                <span className="text-amber-900 font-mono">
                  ${orderData.totals.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Shipping Address */}
          <div className="bg-white rounded-xl border-2 border-amber-200 p-6">
            <h2 className="text-xl font-bold text-amber-900 font-mono mb-4">
              Shipping Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-amber-600 mt-1" />
                <div>
                  <p className="text-amber-900 font-medium">
                    {orderData.shipping.name}
                  </p>
                  <p className="text-amber-600">{orderData.shipping.address}</p>
                  <p className="text-amber-600">
                    {orderData.shipping.city}, {orderData.shipping.state}{' '}
                    {orderData.shipping.zip}
                  </p>
                  <p className="text-amber-600">{orderData.shipping.country}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-amber-600" />
                <p className="text-amber-600">{orderData.shipping.phone}</p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-xl border-2 border-amber-200 p-6">
            <h2 className="text-xl font-bold text-amber-900 font-mono mb-4">
              Payment Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-amber-900">
                    {orderData.payment.type} ending in {orderData.payment.last4}
                  </p>
                  <p className="text-sm text-amber-600">
                    {orderData.payment.method}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl border-2 border-amber-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-amber-900 font-mono mb-4">
            What's Next?
          </h2>
          <div className="space-y-6">
            {/* Timeline */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-amber-100 rounded-full">
                  <Package className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-amber-900 font-medium">
                    Order Processing
                  </h3>
                  <p className="text-amber-600">
                    We're preparing your order for shipment
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-amber-100 rounded-full">
                  <Truck className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-amber-900 font-medium">Shipping</h3>
                  <p className="text-amber-600">
                    Your order will be shipped within 2 business days
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-amber-100 rounded-full">
                  <Home className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-amber-900 font-medium">Delivery</h3>
                  <p className="text-amber-600">
                    Estimated delivery: {new Date(orderData.estimatedDelivery).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Creation */}
            <div className="p-4 bg-amber-50 rounded-lg border-2 border-amber-200">
              <div className="flex items-start gap-4">
                <UserPlus className="h-5 w-5 text-amber-600 mt-1" />
                <div>
                  <h3 className="text-amber-900 font-medium">
                    Create an Account
                  </h3>
                  <p className="text-amber-600 mb-4">
                    Create an account to track your order and save your information
                    for future purchases
                  </p>
                  <button
                    onClick={handleCreateAccount}
                    disabled={isLoading}
                    className="inline-flex items-center px-4 py-2 border-2 border-amber-600 rounded-lg text-amber-900 hover:bg-amber-600 hover:text-white transition-colors duration-300"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={handlePrint}
            className="inline-flex items-center px-4 py-2 border-2 border-amber-300 rounded-lg text-amber-900 hover:border-amber-600 transition-colors duration-300"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print Order
          </button>
          <button
            onClick={handleShare}
            className="inline-flex items-center px-4 py-2 border-2 border-amber-300 rounded-lg text-amber-900 hover:border-amber-600 transition-colors duration-300"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share Order
          </button>
          <a
            href="/support/contact"
            className="inline-flex items-center px-4 py-2 border-2 border-amber-300 rounded-lg text-amber-900 hover:border-amber-600 transition-colors duration-300"
          >
            <Mail className="h-4 w-4 mr-2" />
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage; 