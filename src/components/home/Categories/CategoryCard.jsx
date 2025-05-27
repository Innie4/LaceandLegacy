import { Link } from "react-router-dom"

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={category.href}
      className="group relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="aspect-w-4 aspect-h-3">
        <img
          src={category.image || "/placeholder.svg"}
          alt={category.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-gray-600 mt-1">{category.description}</p>
      </div>
    </Link>
  )
}

export default CategoryCard
