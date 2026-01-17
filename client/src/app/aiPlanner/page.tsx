import { Header } from "../../components/header"
import { Footer } from "../../components/footer"
import { AiPlanner } from "../../components/aiPlanner"

export default function AiPlannerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <AiPlanner />
      </main>
      <Footer />
    </div>
  )
}
