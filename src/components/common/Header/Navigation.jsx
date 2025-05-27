import { Link, useLocation } from "react-router-dom"
import clsx from "clsx"

const Navigation = () => {
  const location = useLocation()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav className="flex space-x-8">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={clsx(
            "text-sm font-medium transition-colors duration-200",
            location.pathname === item.href
              ? "text-primary-600 border-b-2 border-primary-600"
              : "text-gray-500 hover:text-gray-900",
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}

export default Navigation
