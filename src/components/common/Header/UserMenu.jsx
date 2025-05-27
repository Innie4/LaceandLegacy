"use client"

import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { User, LogOut, Settings, Heart, Package } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-2">
        <Link to="/auth/login" className="text-sm font-medium text-gray-500 hover:text-gray-900">
          Sign In
        </Link>
        <Link to="/auth/register" className="btn-primary text-sm">
          Sign Up
        </Link>
      </div>
    )
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
      >
        <User className="h-5 w-5 text-gray-400" />
        <span className="hidden sm:block text-sm font-medium text-gray-700">{user?.name || "Account"}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          <Link
            to="/profile"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <Settings className="h-4 w-4 mr-3" />
            Profile
          </Link>
          <Link
            to="/orders"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <Package className="h-4 w-4 mr-3" />
            Orders
          </Link>
          <Link
            to="/wishlist"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <Heart className="h-4 w-4 mr-3" />
            Wishlist
          </Link>
          <hr className="my-1" />
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}

export default UserMenu
