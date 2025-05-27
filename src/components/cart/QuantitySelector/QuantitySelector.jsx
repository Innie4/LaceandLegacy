"use client"
import { Minus, Plus } from "lucide-react"

const QuantitySelector = ({ quantity, onQuantityChange, min = 1, max = 99 }) => {
  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1)
    }
  }

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1)
    }
  }

  const handleInputChange = (e) => {
    const value = Number.parseInt(e.target.value) || min
    if (value >= min && value <= max) {
      onQuantityChange(value)
    }
  }

  return (
    <div className="flex items-center border border-gray-300 rounded-md">
      <button
        onClick={handleDecrease}
        disabled={quantity <= min}
        className="p-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Minus className="h-4 w-4" />
      </button>

      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        min={min}
        max={max}
        className="w-12 text-center border-0 focus:ring-0 text-sm"
      />

      <button
        onClick={handleIncrease}
        disabled={quantity >= max}
        className="p-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}

export default QuantitySelector
