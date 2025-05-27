"use client"
import { Link } from "react-router-dom"
import Navigation from "./Navigation"
import SearchBar from "./SearchBar"
import UserMenu from "./UserMenu"
import { ShoppingCart, Menu } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useUI } from "@/context/UIContext"

const Header = () => {
  const { totalItems, toggleCart } = useCart()
  const { toggleSidebar } = useUI()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button onClick={toggleSidebar} className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500">
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-primary-600">E-Commerce</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <Navigation />
          </div>

          {/* Search Bar */}
          <div className="hidden sm:block flex-1 max-w-lg mx-8">
            <SearchBar />
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <button onClick={toggleCart} className="relative p-2 text-gray-400 hover:text-gray-500">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Menu */}
            <UserMenu />
          </div>
        </div>

        {/* Mobile Search */}
        <div className="sm:hidden pb-4">
          <SearchBar />
        </div>
      </div>
    </header>
  )
}

export default Header
