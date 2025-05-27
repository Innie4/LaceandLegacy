"use client"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import Spinner from "./Loading/Spinner"

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute
