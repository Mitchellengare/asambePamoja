import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Slider } from "./ui/slider"
import { Textarea } from "./ui/textarea"

import {
  Sparkles,
  Send,
  Calendar,
  DollarSign,
  Users,
  Plane,
  Mountain,
  Palmtree,
  Building,
  Heart,
  Camera,
  Utensils,
  Music,
  Loader2,
  ArrowRight,
  RefreshCw,
  Plus,
} from "lucide-react"



const travelStyles = [
  { id: "adventure", icon: Mountain, label: "Adventure" },
  { id: "relaxation", icon: Palmtree, label: "Relaxation" },
  { id: "cultural", icon: Building, label: "Cultural" },
  { id: "romantic", icon: Heart, label: "Romantic" },
  { id: "photography", icon: Camera, label: "Photography" },
  { id: "foodie", icon: Utensils, label: "Foodie" },
  { id: "nightlife", icon: Music, label: "Nightlife" },
  { id: "family", icon: Users, label: "Family" },
]

const suggestedPrompts = [
  "Plan a romantic week in Paris with fine dining and art museums",
  "Create an adventure trip to New Zealand for thrill seekers",
  "Design a cultural journey through Japan during cherry blossom season",
  "Suggest a relaxing beach getaway in Southeast Asia",
]

interface Recommendation {
  id: string
  type: "destination" | "activity" | "itinerary"
  title: string
  description: string
  image: string
  details?: {
    duration?: string
    budget?: string
    bestTime?: string
    highlights?: string[]
  }
}

export function AiPlanner() {
  const [step, setStep] = useState<"preferences" | "chat" | "results">("preferences")
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [budget, setBudget] = useState([2000])
  const [duration, setDuration] = useState([7])
  const [travelers, setTravelers] = useState(2)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [notes, setNotes] = useState("")
  const makeId = () => `${Date.now()}-${Math.random()}`
  const [messages, setMessages] = useState<{ id: string; role: "user" | "assistant"; content: string }[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }
  const navigate = useNavigate()
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
  
    setMessages((prev) => [
      ...prev,
      { id: makeId(), role: "user", content: input },
    ])
  
    const userMessage = input
    setInput("")
    setIsLoading(true)
  
    // simulate AI response (until you add a real backend)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          role: "assistant",
          content: `Got it — planning around: "${userMessage}"`,
        },
      ])
      generateRecommendations()
      setIsLoading(false)
    }, 600)
  }
  
  

  const toggleStyle = (styleId: string) => {
    setSelectedStyles((prev) => (prev.includes(styleId) ? prev.filter((s) => s !== styleId) : [...prev, styleId]))
  }
  const generateRecommendations = () => {
    const prefs = {
      styles: selectedStyles,
      budget: budget[0],
      days: duration[0],
      travelers,
      notes,
    }
  
    const mockRecommendations: Recommendation[] = [
      {
        id: "1",
        type: "destination",
        title: "Kyoto, Japan",
        description: `Great for ${prefs.styles.includes("cultural") ? "culture lovers" : "a balanced trip"} — temples, food, and nature.`,
        image: "/kyoto-japan-bamboo-forest.jpg",
        details: {
          duration: `${Math.min(7, prefs.days)} days`,
          budget: `$${prefs.budget.toLocaleString()} (est.)`,
          bestTime: "March–May, Oct–Nov",
          highlights: ["Fushimi Inari", "Arashiyama", "Gion"],
        },
      },
      {
        id: "2",
        type: "destination",
        title: "Lisbon, Portugal",
        description: `Perfect for food + city vibes. Notes: ${prefs.notes ? "taken into account" : "add notes for more personalization"}.`,
        image: "/lisbon-portugal-colorful-streets.jpg",
        details: {
          duration: `${Math.min(6, prefs.days)} days`,
          budget: `$${Math.max(1200, Math.min(2500, prefs.budget)).toLocaleString()} (est.)`,
          bestTime: "Apr–Jun, Sep–Oct",
          highlights: ["Alfama", "Belém", "Sintra"],
        },
      },
      {
        id: "3",
        type: "destination",
        title: "Costa Rica",
        description: `Best if you picked Adventure/Family — rainforests, beaches, and wildlife.`,
        image: "/costa-rica-rainforest-waterfall.jpg",
        details: {
          duration: `${Math.min(10, prefs.days)} days`,
          budget: `$${Math.max(1800, Math.min(3500, prefs.budget)).toLocaleString()} (est.)`,
          bestTime: "Dec–Apr",
          highlights: ["Arenal", "Monteverde", "Zip-lining"],
        },
      },
    ]
  
    setRecommendations(mockRecommendations)
  }
  

  const handleStartPlanning = () => {
    setIsGenerating(true)
    // Simulate AI processing
    setTimeout(() => {
      generateRecommendations()
      setIsGenerating(false)
      setStep("results")
    }, 2000)
  }
  const selectedStyleLabels = selectedStyles
    .map((id) => travelStyles.find((s) => s.id === id)?.label)
    .filter(Boolean)
    .join(", ")

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-12 lg:py-20 bg-secondary/30">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Trip Planning</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Let AI plan your perfect trip
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tell us your preferences and let our AI create personalized destination recommendations and detailed
            itineraries just for you.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {["preferences", "chat", "results"].map((s, idx) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step === s
                    ? "bg-primary text-primary-foreground"
                    : idx < ["preferences", "chat", "results"].indexOf(step)
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {idx + 1}
              </div>
              <span
                className={`text-sm hidden sm:block ${step === s ? "text-foreground font-medium" : "text-muted-foreground"}`}
              >
                {s === "preferences" ? "Preferences" : s === "chat" ? "Refine" : "Results"}
              </span>
              {idx < 2 && <div className="w-8 lg:w-16 h-0.5 bg-border" />}
            </div>
          ))}
        </div>

        {/* Preferences Step */}
        {step === "preferences" && (
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Travel Styles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="w-5 h-5 text-primary" />
                  What kind of trip are you looking for?
                </CardTitle>
                <CardDescription>Select all that apply to get personalized recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {travelStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => toggleStyle(style.id)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        selectedStyles.includes(style.id)
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <style.icon className="w-6 h-6" />
                      <span className="text-sm font-medium">{style.label}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Budget */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Budget per person
                </CardTitle>
                <CardDescription>Approximate budget for your entire trip</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Slider value={budget} onValueChange={setBudget} max={10000} min={500} step={100} className="py-4" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">$500</span>
                    <span className="text-lg font-semibold text-foreground">${budget[0].toLocaleString()}</span>
                    <span className="text-muted-foreground">$10,000+</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Duration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Trip Duration
                </CardTitle>
                <CardDescription>How many days are you planning to travel?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Slider value={duration} onValueChange={setDuration} max={30} min={3} step={1} className="py-4" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">3 days</span>
                    <span className="text-lg font-semibold text-foreground">{duration[0]} days</span>
                    <span className="text-muted-foreground">30 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Travelers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Number of Travelers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setTravelers(Math.max(1, travelers - 1))}
                    disabled={travelers <= 1}
                  >
                    -
                  </Button>
                  <span className="text-2xl font-semibold text-foreground w-12 text-center">{travelers}</span>
                  <Button variant="outline" size="icon" onClick={() => setTravelers(travelers + 1)}>
                    +
                  </Button>
                  <span className="text-muted-foreground ml-2">{travelers === 1 ? "person" : "people"}</span>
                </div>
              </CardContent>
            </Card>

            {/* Additional Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Any specific preferences?</CardTitle>
                <CardDescription>Tell us more about what you are looking for</CardDescription>
              </CardHeader>
              <CardContent>
              <Textarea
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
  placeholder="e.g., I love hiking and local food. I'd prefer to avoid crowded tourist spots..."
  className="min-h-[100px]"
/>

              </CardContent>
            </Card>

            <div className="flex justify-center pt-4">
              <Button size="lg" className="gap-2 px-8" onClick={handleStartPlanning} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating recommendations...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Get AI Recommendations
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Chat Step */}
        {step === "chat" && (
          <div className="max-w-3xl mx-auto">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Refine Your Trip
                </CardTitle>
                <CardDescription>Chat with our AI to fine-tune your recommendations</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-6">Try one of these prompts to get started:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {suggestedPrompts.map((prompt, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          className="text-left h-auto py-2 px-3 bg-transparent"
                          onClick={() => setInput(prompt)}
                        >
                          {prompt}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl px-4 py-3 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Thinking...</span>
                    </div>
                  </div>
                )}
              </CardContent>
              <div className="p-4 border-t border-border">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask about destinations, activities, or itinerary..."
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={isLoading}>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </Card>
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep("preferences")} className="bg-transparent">
                Back to Preferences
              </Button>
              <Button onClick={() => setStep("results")} className="gap-2">
                View Recommendations
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Results Step */}
        {step === "results" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Your Personalized Recommendations</h2>
                <p className="text-muted-foreground mt-1">
                Based on your preferences: {selectedStyleLabels || "—"} • ${budget[0]} budget • {duration[0]} days

                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep("preferences")} className="gap-2 bg-transparent">
                  <RefreshCw className="w-4 h-4" />
                  Start Over
                </Button>
                <Button variant="outline" onClick={() => setStep("chat")} className="gap-2 bg-transparent">
                  <Sparkles className="w-4 h-4" />
                  Refine with AI
                </Button>
              </div>
            </div>

            {/* Recommendations Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {recommendations.map((rec, idx) => (
                <Card key={rec.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative aspect-video">
                    <img
                      src={rec.image || "/placeholder.svg"}
                      alt={rec.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                     />
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">#{idx + 1} Match</Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {rec.title}
                        </CardTitle>
                        <CardDescription className="mt-2">{rec.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {rec.details && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {rec.details.duration}
                          </div>
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <DollarSign className="w-4 h-4" />
                            {rec.details.budget}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">Best time: {rec.details.bestTime}</p>
                          <div className="flex flex-wrap gap-1">
                            {rec.details.highlights?.slice(0, 3).map((highlight) => (
                              <Badge key={highlight} variant="secondary" className="text-xs">
                                {highlight}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2 pt-2">
  <Button
    className="flex-1 gap-2"
    onClick={() => navigate("/dashboard/trips/new")}
  >
    <Plus className="w-4 h-4" />
    Create Trip
  </Button>

  <Button variant="outline" className="bg-transparent">
    Learn More
  </Button>
</div>

                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="bg-secondary/30">
              <CardContent className="py-8">
                <div className="text-center max-w-2xl mx-auto">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Want more personalized suggestions?</h3>
                  <p className="text-muted-foreground mb-6">
                    Chat with our AI to get more specific recommendations based on your exact needs.
                  </p>
                  <Button onClick={() => setStep("chat")} className="gap-2">
                    <Sparkles className="w-4 h-4" />
                    Chat with AI Planner
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
