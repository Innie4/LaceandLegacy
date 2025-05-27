import CategoryCard from "./CategoryCard"

const CategoryShowcase = () => {
  const categories = [
    {
      id: 1,
      name: "Electronics",
      image: "/placeholder.svg?height=300&width=400",
      description: "Latest gadgets and tech",
      href: "/products?category=electronics",
    },
    {
      id: 2,
      name: "Fashion",
      image: "/placeholder.svg?height=300&width=400",
      description: "Trendy clothing and accessories",
      href: "/products?category=fashion",
    },
    {
      id: 3,
      name: "Home & Garden",
      image: "/placeholder.svg?height=300&width=400",
      description: "Everything for your home",
      href: "/products?category=home",
    },
    {
      id: 4,
      name: "Sports",
      image: "/placeholder.svg?height=300&width=400",
      description: "Gear for active lifestyle",
      href: "/products?category=sports",
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our wide range of categories and find exactly what you're looking for
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  )
}

export default CategoryShowcase
