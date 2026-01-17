import { Header } from "../../components/header"
import { HeroSection } from "@/components/hero-section"
import { DestinationGrid } from "@/components/destination-grid"
import { FeaturesSection } from "@/components/features-section"
import { TrendingTrips } from "@/components/trending-trips"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <DestinationGrid />
        <FeaturesSection />
        <TrendingTrips />
      </main>
      <Footer />
    </div>
  )
}
