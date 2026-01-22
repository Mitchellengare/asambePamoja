import { DashboardHeader } from "@/components/dashboard/dashboardHeader"
import { TripDetail } from "@/components/tripDetail"

export default async function TripDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <>
      <DashboardHeader
        title="Trip Details"
        breadcrumbs={[{ label: "My Trips", href: "/dashboard/trips" }, { label: "Trip Details" }]}
      />
      <div className="flex-1 overflow-auto">
        <TripDetail tripId={id} />
      </div>
    </>
  )
}
