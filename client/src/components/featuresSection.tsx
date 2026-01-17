import { Sparkles, Users, Calendar, MessageSquare, Map, Share2 } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Planning",
    description:
      "Get personalized destination and activity recommendations based on your preferences and travel style.",
  },
  {
    icon: Users,
    title: "Collaborative Trips",
    description: "Invite friends and family to plan together. Vote on activities and build itineraries as a team.",
  },
  {
    icon: Calendar,
    title: "Smart Itineraries",
    description: "Automatically optimize your schedule with intelligent routing and time management suggestions.",
  },
  {
    icon: MessageSquare,
    title: "Real-Time Chat",
    description:
      "Discuss plans with your travel companions directly within the app. Share ideas and make decisions together.",
  },
  {
    icon: Map,
    title: "Interactive Maps",
    description: "Visualize your entire trip on beautiful maps. See distances, travel times, and nearby attractions.",
  },
  {
    icon: Share2,
    title: "Share & Inspire",
    description: "Share your completed trips with the community. Inspire others and discover new adventures.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Everything you need to plan the perfect trip
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful features designed to make travel planning effortless and collaborative
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
