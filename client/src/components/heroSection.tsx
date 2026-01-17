"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Calendar, Users } from "lucide-react"

export function HeroSection() {
  const [destination, setDestination] = useState("")

  return (
    <section className="relative overflow-hidden bg-secondary/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
            Plan your next adventure <span className="text-primary">together</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover breathtaking destinations, create collaborative itineraries, and let AI help you plan the perfect
            trip with friends and family.
          </p>

          {/* Search Bar */}
          <div className="mt-10 bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Where to?"
                  className="pl-10 h-12"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input type="date" className="pl-10 h-12" />
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input placeholder="Travelers" className="pl-10 h-12" />
              </div>
              <Button size="lg" className="h-12 gap-2">
                <Search className="w-5 h-5" />
                Explore
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 lg:gap-16">
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">2.5M+</p>
              <p className="text-muted-foreground">Travelers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">150+</p>
              <p className="text-muted-foreground">Countries</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">50K+</p>
              <p className="text-muted-foreground">Trips Planned</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">4.9</p>
              <p className="text-muted-foreground">User Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
