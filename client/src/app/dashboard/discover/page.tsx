import { DashboardHeader } from "../components/dashboard/dashboardHeader"
import { DiscoverSection } from "../components/dashboard/discoverSection"

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
