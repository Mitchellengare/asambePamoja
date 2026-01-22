"use client"

import { useState } from "react"
//import Image from "next/image"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {Dialog,  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Calendar, MapPin, Users, Search, MoreHorizontal, Edit, Trash2, Share } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const myTrips = [
  {
    id: "1",
    title: "Japan Cherry Blossom Tour",
    description: "Exploring Tokyo, Kyoto, and Osaka during sakura season",
    startDate: "2026-03-25",
    endDate: "2026-04-08",
    destinations: ["Tokyo", "Kyoto", "Osaka"],
    image: "/japan-cherry-blossom-temple.png",
    status: "upcoming",
    collaborators: [
      { name: "You", avatar: "/person-avatar-1.png" },
      { name: "Mike", avatar: "/diverse-person-avatar-2.png" },
      { name: "Sarah", avatar: "/person-avatar-3.png" },
    ],
    activities: 24,
  },
  {
    id: "2",
    title: "Greek Island Hopping",
    description: "Santorini, Mykonos, and Crete adventure",
    startDate: "2026-06-15",
    endDate: "2026-06-28",
    destinations: ["Santorini", "Mykonos", "Crete"],
    image: "/greece-santorini-white-buildings.jpg",
    status: "planning",
    collaborators: [
      { name: "You", avatar: "/person-avatar-1.png" },
      { name: "Emma", avatar: "/person-avatar-4.png" },
    ],
    activities: 12,
  },
  {
    id: "3",
    title: "Iceland Northern Lights",
    description: "Winter adventure to see the aurora borealis",
    startDate: "2025-12-10",
    endDate: "2025-12-18",
    destinations: ["Reykjavik", "Golden Circle", "Vik"],
    image: "/iceland-northern-lights-aurora.png",
    status: "completed",
    collaborators: [
      { name: "You", avatar: "/person-avatar-1.png" },
      { name: "John", avatar: "/diverse-person-avatars.png" },
      { name: "Lisa", avatar: "/person-avatar-6.png" },
      { name: "Tom", avatar: "/person-avatar-7.png" },
    ],
    activities: 18,
  },
]

export function MyTrips() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "planning" | "completed">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const filteredTrips = myTrips.filter((trip) => {
    const matchesFilter = filter === "all" || trip.status === filter
    const matchesSearch =
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.destinations.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-accent text-accent-foreground"
      case "planning":
        return "bg-primary/10 text-primary"
      case "completed":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  return (
    <section className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">My Trips</h1>
            <p className="mt-2 text-muted-foreground">Manage and track all your travel plans</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Trip
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create New Trip</DialogTitle>
                <DialogDescription>Start planning your next adventure</DialogDescription>
              </DialogHeader>
              <form className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="title">Trip Name</Label>
                  <Input id="title" placeholder="e.g., Summer Europe Adventure" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Brief description of your trip..." className="mt-1.5" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="date" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input id="endDate" type="date" className="mt-1.5" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="destinations">Destinations</Label>
                  <Input id="destinations" placeholder="e.g., Paris, Rome, Barcelona" className="mt-1.5" />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Trip</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search trips..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {(["all", "planning", "upcoming", "completed"] as const).map((status) => (
              <Button
                key={status}
                variant={filter === status ? "default" : "secondary"}
                size="sm"
                onClick={() => setFilter(status)}
                className="capitalize"
              >
                {status}
              </Button>
            ))}
          </div>
        </div>

        {/* Trips Grid */}
        {filteredTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip) => (
              <div
                key={trip.id}
                className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 group"
              >
                <Link to={`/trips/${trip.id}`}>
                  <div className="relative aspect-video">
                    <img
                      src={trip.image || "/placeholder.svg"}
                      alt={trip.title}
                
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"

                    />
                    <Badge className={`absolute top-4 left-4 ${getStatusColor(trip.status)}`}>{trip.status}</Badge>
                  </div>
                </Link>
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <Link to={`/trips/${trip.id}`}>
                      <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                        {trip.title}
                      </h3>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Trip
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="w-4 h-4 mr-2" />
                          Share Trip
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Trip
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{trip.description}</p>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {trip.destinations.map((dest) => (
                      <Badge key={dest} variant="secondary" className="text-xs">
                        {dest}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(trip.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {trip.activities} activities
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-muted-foreground mr-1" />
                      <div className="flex -space-x-2">
                        {trip.collaborators.slice(0, 3).map((collab, idx) => (
                          <Avatar key={idx} className="w-7 h-7 border-2 border-card">
                            <AvatarImage src={collab.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs">{collab.name[0]}</AvatarFallback>
                          </Avatar>
                        ))}
                        {trip.collaborators.length > 3 && (
                          <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium border-2 border-card">
                            +{trip.collaborators.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                    <Link to={`/trips/${trip.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No trips found</h3>
            <p className="text-muted-foreground mb-6">Start planning your next adventure today!</p>
            <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Create Your First Trip
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
