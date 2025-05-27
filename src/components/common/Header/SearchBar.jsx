"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search } from "lucide-react"
import { useProducts } from "@/context/ProductContext"

const SearchBar = () => {
  const [query, setQuery] = useState("")
  const { setSearchQuery } = useProducts()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      setSearchQuery(query)
      navigate("/products")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>
    </form>
  )
}

export default SearchBar
