import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AiPlanner } from "@/components/ai-planner"

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
