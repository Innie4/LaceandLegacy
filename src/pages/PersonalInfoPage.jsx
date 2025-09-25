import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useUser } from '../contexts/UserContext';
import { useCart } from '../contexts/CartContext';
import Heading from '../components/typography/Heading';
import Text from '../components/typography/Text';
import Button from '../components/buttons/Button';
import Spinner from '../components/loaders/Spinner';
import { mockProducts } from '../data/mockProducts';

const PersonalInfoPage = () => {
  const { user, isAuthenticated } = useUser();
  const { addToCart, isLoading: isCartLoading } = useCart();
  const navigate = useNavigate();
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [activityLoading, setActivityLoading] = useState(false);
  

  useEffect(() => {}, [user]);

  

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return toast.error('Please select an image file');
    if (file.size > 5 * 1024 * 1024) return toast.error('Image size should be less than 5MB');
    setAvatarLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Profile picture updated successfully');
    } catch {
      toast.error('Failed to update profile picture');
    } finally {
      setAvatarLoading(false);
    }
  };

  

  const handleGetProduct = async (product) => {
    if (!isAuthenticated) {
      toast.error('Please log in to add items to your cart');
      navigate('/login', { state: { returnTo: '/account/personal-info' } });
      return;
    }

    try {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: Array.isArray(product.sizes) ? product.sizes[0] : product.size,
        color: product.color || 'Default',
        era: product.era,
        quantity: 1
      };
      await addToCart(cartItem);
      navigate('/payment');
    } catch (error) {
      toast.error('Failed to proceed to payment');
    }
  };

  // Activity Summary is stubbed for now
  const handleActivityRefresh = async () => {
    setActivityLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Activity refreshed');
    } catch {
      toast.error('Failed to refresh activity');
    } finally {
      setActivityLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Summary Card */}
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6 flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200">
              <img
                src={user?.avatar || '/images/avatars/default.jpg'}
                alt={user?.firstName || 'Profile'}
                className="w-full h-full object-cover"
              />
              {avatarLoading && <Spinner size="sm" className="absolute inset-0 m-auto" />}
            </div>
            <label htmlFor="avatar" className="absolute bottom-0 right-0 p-2 bg-black text-white rounded-full cursor-pointer hover:bg-gray-900 transition-colors duration-300">
              <Camera className="h-4 w-4" />
              <input type="file" id="avatar" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </label>
          </div>
          <div>
            <Heading level={2}>{user?.firstName} {user?.lastName}</Heading>
            <Text variant="small">{user?.email}</Text>
            <div className="flex gap-4 mt-2">
              <Text variant="small">Orders: {user?.stats?.orders ?? 0}</Text>
              <Text variant="small">Wishlist: {user?.stats?.wishlist ?? 0}</Text>
              <Text variant="small">Reviews: {user?.stats?.reviews ?? 0}</Text>
            </div>
            <div className="mt-4">
              <Link to="/account/edit-profile">
                <Button>Edit Profile</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Edit Profile CTA moved sections */}
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6 space-y-2">
          <Heading level={3}>Profile Settings</Heading>
          <Text variant="small">Manage your personal info, security, addresses and preferences.</Text>
          <div className="flex justify-end">
            <Link to="/account/edit-profile">
              <Button>Open Edit Profile</Button>
            </Link>
          </div>
        </div>

        {/* Get the Product You Want */}
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <Heading level={3}>Get the product you want</Heading>
          </div>
          <Text variant="small">Click a product to add it to your cart and go straight to payment.</Text>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mockProducts.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center justify-between border-2 border-amber-200 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <img src={p.image} alt={p.name} className="w-14 h-14 object-cover rounded" />
                  <div>
                    <div className="text-amber-900 font-mono text-sm line-clamp-1">{p.name}</div>
                    <div className="text-amber-700 text-sm">${p.price.toFixed(2)}</div>
                  </div>
                </div>
                <Button onClick={() => handleGetProduct(p)} disabled={isCartLoading || p.inStock === false}>
                  {isCartLoading ? <Spinner size="sm" /> : 'Get it'}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Summary Section (Stub) */}
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <Heading level={3}>Activity Summary</Heading>
            <Button variant="secondary" size="sm" onClick={handleActivityRefresh} disabled={activityLoading}>
              {activityLoading ? <Spinner size="sm" /> : 'Refresh'}
            </Button>
          </div>
          <Text variant="small">Recent activity and stats will appear here.</Text>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoPage; 