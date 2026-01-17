"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Sparkles,
  Plus,
  X,
  Plane,
  Mountain,
  Palmtree,
  Building,
  Heart,
  Camera,
  Utensils,
  Music,
  Loader2,
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

const suggestedDestinations = [
  { name: "Kyoto, Japan", image: "/kyoto-japan-bamboo-forest.jpg" },
  { name: "Santorini, Greece", image: "/greece-santorini-white-buildings.jpg" },
  { name: "Bali, Indonesia", image: "/bali-indonesia-rice-terraces.jpg" },
  { name: "Paris, France", image: "/paris-france-eiffel-tower.jpg" },
]

export function CreateTripForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [destinations, setDestinations] = useState<string[]>([])
  const [newDestination, setNewDestination] = useState("")
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    budget: "",
    travelers: 2,
  })

  const addDestination = () => {
    if (newDestination.trim() && !destinations.includes(newDestination.trim())) {
      setDestinations([...destinations, newDestination.trim()])
      setNewDestination("")
    }
  }

  const removeDestination = (dest: string) => {
    setDestinations(destinations.filter((d) => d !== dest))
  }

  const toggleStyle = (styleId: string) => {
    setSelectedStyles((prev) => (prev.includes(styleId) ? prev.filter((s) => s !== styleId) : [...prev, styleId]))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    router.push("/dashboard/trips")
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                step === s
                  ? "bg-primary text-primary-foreground"
                  : s < step
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {s}
            </div>
            <span
              className={`text-sm hidden sm:block ${step === s ? "text-foreground font-medium" : "text-muted-foreground"}`}
            >
              {s === 1 ? "Basics" : s === 2 ? "Destinations" : "Preferences"}
            </span>
            {s < 3 && <div className="w-8 lg:w-16 h-0.5 bg-border" />}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5 text-primary" />
              Trip Details
            </CardTitle>
            <CardDescription>Let&apos;s start with the basics of your trip</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Trip Name</Label>
              <Input
                id="title"
                placeholder="e.g., Summer Adventure in Japan"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="What's this trip about? Add any notes or ideas..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  End Date
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Budget (per person)
                </Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="e.g., 3000"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Number of Travelers
                </Label>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setFormData({ ...formData, travelers: Math.max(1, formData.travelers - 1) })}
                  >
                    -
                  </Button>
                  <span className="text-lg font-semibold w-8 text-center">{formData.travelers}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setFormData({ ...formData, travelers: formData.travelers + 1 })}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={() => setStep(2)} disabled={!formData.title || !formData.startDate}>
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Destinations */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Destinations
            </CardTitle>
            <CardDescription>Where do you want to go? Add one or more destinations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Add Destinations</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., Tokyo, Japan"
                  value={newDestination}
                  onChange={(e) => setNewDestination(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addDestination())}
                />
                <Button type="button" onClick={addDestination}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {destinations.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Destinations</Label>
                <div className="flex flex-wrap gap-2">
                  {destinations.map((dest) => (
                    <Badge key={dest} variant="secondary" className="px-3 py-1.5 text-sm">
                      {dest}
                      <button
                        type="button"
                        onClick={() => removeDestination(dest)}
                        className="ml-2 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Popular Destinations
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {suggestedDestinations.map((dest) => (
                  <button
                    key={dest.name}
                    type="button"
                    onClick={() => {
                      if (!destinations.includes(dest.name)) {
                        setDestinations([...destinations, dest.name])
                      }
                    }}
                    className={`relative aspect-square rounded-lg overflow-hidden group ${
                      destinations.includes(dest.name) ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <Image src={dest.image || "/placeholder.svg"} alt={dest.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                    <span className="absolute bottom-2 left-2 right-2 text-sm font-medium text-card text-left">
                      {dest.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={() => setStep(3)} disabled={destinations.length === 0}>
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Preferences */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Travel Style
            </CardTitle>
            <CardDescription>What kind of experience are you looking for?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {travelStyles.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => toggleStyle(style.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    selectedStyles.includes(style.id)
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <style.icon className="h-6 w-6" />
                  <span className="text-sm font-medium">{style.label}</span>
                </button>
              ))}
            </div>

            {/* Summary */}
            <div className="rounded-lg bg-secondary/50 p-4 space-y-3">
              <h4 className="font-semibold text-foreground">Trip Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Trip Name:</span>
                  <p className="font-medium">{formData.title}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Dates:</span>
                  <p className="font-medium">
                    {formData.startDate} - {formData.endDate}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Destinations:</span>
                  <p className="font-medium">{destinations.join(", ")}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Travelers:</span>
                  <p className="font-medium">{formData.travelers} people</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Trip...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Create Trip
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
