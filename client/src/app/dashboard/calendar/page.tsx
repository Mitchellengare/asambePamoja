import { DashboardHeader } from "../../../components/Dashboard/dashboardHeader"
import { TripCalendar } from "../../../components/Dashboard/tripCalendar"

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
