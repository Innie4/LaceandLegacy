import { Link } from "react-router-dom"
import FooterLinks from "./FooterLinks"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-bold text-white">
              E-Commerce
            </Link>
            <p className="mt-4 text-gray-400 max-w-md">
              Your trusted online shopping destination. Quality products, great prices, and exceptional service.
            </p>
          </div>

          {/* Links */}
          <FooterLinks />
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 E-Commerce. All rights reserved.</p>
          <div className="mt-4 sm:mt-0 flex space-x-6">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
