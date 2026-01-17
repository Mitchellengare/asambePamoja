import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react"

const trendingTrips = [
  {
    id: 1,
    title: "Southeast Asia Adventure",
    destinations: ["Thailand", "Vietnam", "Cambodia"],
    duration: "21 days",
    travelers: 4,
    image: "/southeast-asia-temples-boats-tropical.jpg",
    creator: {
      name: "Sarah M.",
      avatar: "/professional-woman-portrait.png",
    },
    likes: 342,
  },
  {
    id: 2,
    title: "European Summer Road Trip",
    destinations: ["France", "Spain", "Portugal"],
    duration: "14 days",
    travelers: 2,
    image: "/european-countryside-road-scenic.jpg",
    creator: {
      name: "James K.",
      avatar: "/casual-man-portrait.png",
    },
    likes: 256,
  },
  {
    id: 3,
    title: "Northern Lights Chase",
    destinations: ["Norway", "Finland", "Sweden"],
    duration: "10 days",
    travelers: 6,
    image: "/northern-lights-snowy-landscape-aurora.jpg",
    creator: {
      name: "Emma L.",
      avatar: "/woman-portrait-outdoors.jpg",
    },
    likes: 489,
  },
]

export function TrendingTrips() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Trending Trips</h2>
            <p className="mt-2 text-muted-foreground">Get inspired by trips planned by our community</p>
          </div>
          <Link href="/trips/explore">
            <Button variant="outline" className="gap-2 bg-transparent">
              Explore All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {trendingTrips.map((trip) => (
            <Link key={trip.id} href={`/trip/${trip.id}`} className="group">
              <div className="bg-card rounded-2xl overflow-hidden border border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative aspect-video">
                  <Image
                    src={trip.image || "/placeholder.svg"}
                    alt={trip.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-primary-foreground mb-2">{trip.title}</h3>
                    <div className="flex flex-wrap gap-1">
                      {trip.destinations.map((dest) => (
                        <Badge
                          key={dest}
                          variant="secondary"
                          className="bg-primary-foreground/20 text-primary-foreground border-0"
                        >
                          {dest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={trip.creator.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{trip.creator.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-foreground">{trip.creator.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{trip.likes} likes</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {trip.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {trip.travelers} travelers
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {trip.destinations.length} stops
                    </div>
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
