import React from 'react'

const NotFoundPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
      <p className="mb-8">The page you're looking for doesn't exist or has been moved.</p>
      {/* Add a link to return to home page */}
    </div>
  )
}

export default NotFoundPage