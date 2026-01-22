import { DashboardHeader } from "../../../components/Dashboard/dashboardHeader"
import { DiscoverSection } from "../../../components/Dashboard/discoverSection"

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
