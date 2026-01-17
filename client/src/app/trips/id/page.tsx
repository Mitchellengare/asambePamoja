import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TripDetail } from "@/components/trip-detail"

export default async function TripDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <TripDetail tripId={id} />
      </main>
      <Footer />
    </div>
  )
}
