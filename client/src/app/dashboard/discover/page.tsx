import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DiscoverSection } from "@/components/dashboard/discover-section"

export default function DiscoverPage() {
  return (
    <>
      <DashboardHeader title="Discover" breadcrumbs={[{ label: "Discover" }]} />
      <div className="flex-1 overflow-auto">
        <DiscoverSection />
      </div>
    </>
  )
}
