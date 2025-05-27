import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import { ProductProvider } from "./context/ProductContext"
import { UIProvider } from "./context/UIContext"
import MainLayout from "./components/common/Layout/MainLayout"
import AuthLayout from "./components/common/Layout/AuthLayout"
import ProtectedRoute from "./components/common/ProtectedRoute"

// Pages
import HomePage from "./pages/Home/HomePage"
import ProductCatalogPage from "./pages/Products/ProductCatalogPage"
import ProductDetailPage from "./pages/Products/ProductDetailPage"
import CartPage from "./pages/Cart/CartPage"
import CheckoutPage from "./pages/Checkout/CheckoutPage"
import OrderConfirmationPage from "./pages/Checkout/OrderConfirmationPage"
import ThankYouPage from "./pages/Checkout/ThankYouPage"
import LoginPage from "./pages/Auth/LoginPage"
import RegisterPage from "./pages/Auth/RegisterPage"
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage"
import ProfilePage from "./pages/Profile/ProfilePage"
import OrderTrackingPage from "./pages/Profile/OrderTrackingPage"
import WishlistPage from "./pages/Profile/WishlistPage"
import ContactPage from "./pages/Support/ContactPage"
import FAQPage from "./pages/Support/FAQPage"
import ReturnPolicyPage from "./pages/Support/ReturnPolicyPage"
import NotFoundPage from "./pages/Error/NotFoundPage"

function App() {
  return (
    <UIProvider>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <Routes>
              {/* Public routes with main layout */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="products" element={<ProductCatalogPage />} />
                <Route path="products/:id" element={<ProductDetailPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="faq" element={<FAQPage />} />
                <Route path="return-policy" element={<ReturnPolicyPage />} />

                {/* Protected routes */}
                <Route
                  path="checkout"
                  element={
                    <ProtectedRoute>
                      <CheckoutPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="order-confirmation"
                  element={
                    <ProtectedRoute>
                      <OrderConfirmationPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="thank-you"
                  element={
                    <ProtectedRoute>
                      <ThankYouPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="orders"
                  element={
                    <ProtectedRoute>
                      <OrderTrackingPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="wishlist"
                  element={
                    <ProtectedRoute>
                      <WishlistPage />
                    </ProtectedRoute>
                  }
                />
              </Route>

              {/* Auth routes with auth layout */}
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="forgot-password" element={<ForgotPasswordPage />} />
              </Route>

              {/* 404 route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </UIProvider>
  )
}

export default App
