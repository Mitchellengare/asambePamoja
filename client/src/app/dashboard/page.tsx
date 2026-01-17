import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardOverview } from "@/components/dashboard/dashboardOverview"

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader title="Overview" />
      <div className="flex-1 overflow-auto">
        <DashboardOverview />
      </div>
    </>
  )
}
