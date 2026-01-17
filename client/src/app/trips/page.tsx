import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MyTrips } from "@/components/my-trips"

export default function TripsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <MyTrips />
      </main>
      <Footer />
    </div>
  )
}
