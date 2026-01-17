import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { CreateTripForm } from "@/components/dashboard/create-trip-form"

export default function NewTripPage() {
  return (
    <>
      <DashboardHeader
        title="Create Trip"
        breadcrumbs={[{ label: "My Trips", href: "/dashboard/trips" }, { label: "New Trip" }]}
      />
      <div className="flex-1 overflow-auto">
        <CreateTripForm />
      </div>
    </>
  )
}
