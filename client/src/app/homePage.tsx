import { Header } from "../components/header"
import { HeroSection } from "../components/heroSection"
import { DestinationGrid } from "../components/destinationGrid"
import { FeaturesSection } from "../components/featuresSection"
import { TrendingTrips } from "../components/trendingTrips"
import { Footer } from "../components/footer"

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
