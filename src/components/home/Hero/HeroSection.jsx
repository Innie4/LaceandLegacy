import { Link } from "react-router-dom"
import Button from "@/components/ui/Button/Button"

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover Amazing Products</h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
            Shop the latest trends and find everything you need in one place. Quality products at unbeatable prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Shop Now
              </Button>
            </Link>
            <Link to="/products?filter=sale">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-600"
              >
                View Sale
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
