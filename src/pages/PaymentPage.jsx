import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/cards/Card';
import Input from '../components/forms/Input';
import Button from '../components/buttons/Button';
import Spinner from '../components/loaders/Spinner';
import { CreditCard, Lock } from 'lucide-react';

const PaymentPage = () => {
  const [form, setForm] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const newErrors = {};
    if (!/^\d{16}$/.test(form.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    if (!form.cardName.trim()) {
      newErrors.cardName = 'Name on card is required';
    }
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) {
      newErrors.expiry = 'Expiry must be MM/YY';
    }
    if (!/^\d{3,4}$/.test(form.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      navigate('/order-confirmation');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12">
      <Card className="max-w-md w-full p-8 rounded-xl shadow-lg border-2 border-black bg-white">
        <h1 className="text-3xl font-bold text-black font-mono mb-6 flex items-center gap-2">
          <CreditCard className="h-7 w-7" /> Payment
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Card Number"
            name="cardNumber"
            type="text"
            maxLength={16}
            value={form.cardNumber}
            onChange={handleChange}
            error={errors.cardNumber}
            placeholder="1234 5678 9012 3456"
            autoComplete="cc-number"
          />
          <Input
            label="Name on Card"
            name="cardName"
            type="text"
            value={form.cardName}
            onChange={handleChange}
            error={errors.cardName}
            placeholder="Full Name"
            autoComplete="cc-name"
          />
          <div className="flex gap-4">
            <Input
              label="Expiry (MM/YY)"
              name="expiry"
              type="text"
              maxLength={5}
              value={form.expiry}
              onChange={handleChange}
              error={errors.expiry}
              placeholder="MM/YY"
              autoComplete="cc-exp"
            />
            <Input
              label="CVV"
              name="cvv"
              type="password"
              maxLength={4}
              value={form.cvv}
              onChange={handleChange}
              error={errors.cvv}
              placeholder="123"
              autoComplete="cc-csc"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-700 mt-2">
            <Lock className="h-4 w-4" />
            <span>Your payment is secure and encrypted</span>
          </div>
          <Button type="submit" className="w-full mt-4" disabled={processing}>
            {processing ? <Spinner size="sm" color="black" /> : 'Pay Now'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default PaymentPage; 