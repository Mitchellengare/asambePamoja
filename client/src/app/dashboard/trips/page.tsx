import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MyTrips } from "@/components/my-trips"

export default function TripsPage() {
  return (
    <>
      <DashboardHeader title="My Trips" breadcrumbs={[{ label: "My Trips" }]} />
      <div className="flex-1 overflow-auto">
        <MyTrips />
      </div>
    </>
  )
}
