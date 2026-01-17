"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  MapPin,
  Star,
  Heart,
  Sparkles,
  TrendingUp,
  Globe,
  Sun,
  Snowflake,
  DollarSign,
  ArrowRight,
} from "lucide-react"

const trendingDestinations = [
  {
    id: "1",
    name: "Kyoto, Japan",
    country: "Japan",
    image: "/kyoto-japan-bamboo-forest.jpg",
    rating: 4.9,
    reviews: 2341,
    description: "Ancient temples, cherry blossoms, and traditional tea houses",
    tags: ["Cultural", "Photography", "Nature"],
    bestSeason: "Spring",
    avgBudget: "$150/day",
    aiScore: 98,
  },
  {
    id: "2",
    name: "Santorini, Greece",
    country: "Greece",
    image: "/greece-santorini-white-buildings.jpg",
    rating: 4.8,
    reviews: 1876,
    description: "Stunning sunsets, white-washed buildings, and crystal-clear waters",
    tags: ["Romantic", "Beach", "Photography"],
    bestSeason: "Summer",
    avgBudget: "$200/day",
    aiScore: 95,
  },
  {
    id: "3",
    name: "Reykjavik, Iceland",
    country: "Iceland",
    image: "/iceland-northern-lights-aurora.png",
    rating: 4.7,
    reviews: 1234,
    description: "Northern lights, geysers, and dramatic landscapes",
    tags: ["Adventure", "Nature", "Photography"],
    bestSeason: "Winter",
    avgBudget: "$180/day",
    aiScore: 92,
  },
  {
    id: "4",
    name: "Bali, Indonesia",
    country: "Indonesia",
    image: "/bali-indonesia-rice-terraces.jpg",
    rating: 4.8,
    reviews: 3456,
    description: "Rice terraces, ancient temples, and vibrant culture",
    tags: ["Relaxation", "Cultural", "Beach"],
    bestSeason: "Dry Season",
    avgBudget: "$80/day",
    aiScore: 94,
  },
]

const aiRecommendations = [
  {
    id: "1",
    title: "Hidden Gem: Luang Prabang, Laos",
    description:
      "Based on your love for cultural experiences and budget-friendly travel, this UNESCO World Heritage city offers incredible value.",
    image: "/luang-prabang-laos-temple.jpg",
    matchScore: 96,
    reason: "Matches your cultural + budget preferences",
  },
  {
    id: "2",
    title: "Perfect Timing: Norway Fjords",
    description:
      "The midnight sun season is approaching. Given your photography interest, this would be ideal for capturing unique light.",
    image: "/norway-fjords-landscape.jpg",
    matchScore: 91,
    reason: "Optimal season for photography",
  },
]

const categories = [
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "beach", label: "Beach", icon: Sun },
  { id: "adventure", label: "Adventure", icon: Globe },
  { id: "winter", label: "Winter", icon: Snowflake },
]

export function DiscoverSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }

  return (
    <div className="p-6 space-y-8">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Discover Destinations</h1>
          <p className="text-muted-foreground mt-1">Find your next adventure with AI-powered recommendations</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search destinations..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* AI Recommendations Banner */}
      <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Picks for You
          </CardTitle>
          <CardDescription>Personalized recommendations based on your travel history and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {aiRecommendations.map((rec) => (
              <div
                key={rec.id}
                className="flex gap-4 p-4 rounded-xl bg-card border border-border hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                  <Image src={rec.image || "/placeholder.svg"} alt={rec.title} fill className="object-cover" />
                  <div className="absolute top-1 right-1 bg-primary text-primary-foreground text-xs font-bold px-1.5 py-0.5 rounded">
                    {rec.matchScore}%
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {rec.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{rec.description}</p>
                  <Badge variant="secondary" className="mt-2 text-xs">
                    {rec.reason}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-4" asChild>
            <Link href="/dashboard/ai-planner">
              Get More Personalized Recommendations
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <Tabs defaultValue="trending">
        <TabsList>
          {categories.map((cat) => (
            <TabsTrigger key={cat.id} value={cat.id} className="gap-2">
              <cat.icon className="h-4 w-4" />
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="trending" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingDestinations.map((dest) => (
              <Card key={dest.id} className="overflow-hidden group">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={dest.image || "/placeholder.svg"}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <button
                    onClick={() => toggleFavorite(dest.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
                  >
                    <Heart
                      className={`h-4 w-4 ${favorites.includes(dest.id) ? "fill-red-500 text-red-500" : "text-foreground"}`}
                    />
                  </button>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-semibold text-card text-lg">{dest.name}</h3>
                    <div className="flex items-center gap-2 text-card/90 text-sm">
                      <MapPin className="h-3.5 w-3.5" />
                      {dest.country}
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{dest.description}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {dest.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium text-sm">{dest.rating}</span>
                      <span className="text-xs text-muted-foreground">({dest.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <DollarSign className="h-3.5 w-3.5" />
                      {dest.avgBudget}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex-1 bg-secondary rounded-full h-1.5">
                      <div className="bg-primary h-full rounded-full" style={{ width: `${dest.aiScore}%` }} />
                    </div>
                    <span className="text-xs font-medium text-primary">{dest.aiScore}% match</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {["beach", "adventure", "winter"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Explore {tab} destinations coming soon...</p>
              <Button variant="outline" className="mt-4 bg-transparent" asChild>
                <Link href="/dashboard/ai-planner">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Get AI Recommendations
                </Link>
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
