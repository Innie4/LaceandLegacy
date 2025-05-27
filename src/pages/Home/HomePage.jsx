import HeroSection from "@/components/home/Hero/HeroSection"
import CategoryShowcase from "@/components/home/Categories/CategoryShowcase"
import FeaturedProducts from "@/components/home/FeaturedProducts/FeaturedProducts"
import LatestArrivals from "@/components/home/LatestArrivals/LatestArrivals"

const HomePage = () => {
  return (
    <div className="space-y-16">
      <HeroSection />
      <CategoryShowcase />
      <FeaturedProducts />
      <LatestArrivals />
    </div>
  )
}

export default HomePage
