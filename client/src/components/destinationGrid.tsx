"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, ArrowRight } from "lucide-react"

const destinations = [
  {
    id: 1,
    name: "Santorini, Greece",
    image: "/santorini-sunset-white-buildings.png",
    rating: 4.9,
    reviews: 2840,
    category: "Romantic",
    price: "$1,200",
  },
  {
    id: 2,
    name: "Kyoto, Japan",
    image: "/kyoto-temple-cherry-blossoms.png",
    rating: 4.8,
    reviews: 3210,
    category: "Cultural",
    price: "$1,450",
  },
  {
    id: 3,
    name: "Bali, Indonesia",
    image: "/bali-indonesia-rice-terraces-tropical.jpg",
    rating: 4.7,
    reviews: 4150,
    category: "Adventure",
    price: "$890",
  },
  {
    id: 4,
    name: "Machu Picchu, Peru",
    image: "/machu-picchu-ancient-ruins.png",
    rating: 4.9,
    reviews: 1980,
    category: "Adventure",
    price: "$1,680",
  },
  {
    id: 5,
    name: "Amalfi Coast, Italy",
    image: "/amalfi-coast-italy-colorful-buildings-sea.jpg",
    rating: 4.8,
    reviews: 2560,
    category: "Romantic",
    price: "$1,350",
  },
  {
    id: 6,
    name: "Reykjavik, Iceland",
    image: "/iceland-northern-lights-aurora-landscape.jpg",
    rating: 4.7,
    reviews: 1420,
    category: "Adventure",
    price: "$1,890",
  },
]

const categories = ["All", "Romantic", "Adventure", "Cultural", "Beach", "Urban"]

export function DestinationGrid() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [favorites, setFavorites] = useState<number[]>([])

  const filteredDestinations =
    activeCategory === "All" ? destinations : destinations.filter((d) => d.category === activeCategory)

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Discover Destinations</h2>
            <p className="mt-2 text-muted-foreground">Explore our handpicked selection of amazing places</p>
          </div>
          <Link href="/discover">
            <Button variant="outline" className="gap-2 bg-transparent">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "secondary"}
              size="sm"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((destination) => (
            <Link key={destination.id} href={`/destination/${destination.id}`} className="group">
              <div className="bg-card rounded-2xl overflow-hidden border border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      toggleFavorite(destination.id)
                    }}
                    className="absolute top-4 right-4 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors hover:bg-card"
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${
                        favorites.includes(destination.id) ? "fill-primary text-primary" : "text-foreground"
                      }`}
                    />
                  </button>
                  <Badge className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm text-foreground">
                    {destination.category}
                  </Badge>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                      {destination.name}
                    </h3>
                    <p className="font-bold text-primary">{destination.price}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium text-foreground">{destination.rating}</span>
                    <span className="text-muted-foreground">({destination.reviews.toLocaleString()} reviews)</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
