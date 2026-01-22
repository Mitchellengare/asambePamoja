import { DashboardHeader } from "@/components/dashboard/dashboardHeader"
import { AiPlanner } from "@/components/aiPlanner"

export default function AiPlannerPage() {
  return (
    <>
      <DashboardHeader title="AI Planner" breadcrumbs={[{ label: "AI Planner" }]} />
      <div className="flex-1 overflow-auto">
        <AiPlanner />
      </div>
    </>
  )
}
