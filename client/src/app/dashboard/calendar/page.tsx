import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { TripCalendar } from "@/components/dashboard/trip-calendar"

export default function CalendarPage() {
  return (
    <>
      <DashboardHeader title="Calendar" breadcrumbs={[{ label: "Calendar" }]} />
      <div className="flex-1 overflow-auto">
        <TripCalendar />
      </div>
    </>
  )
}
