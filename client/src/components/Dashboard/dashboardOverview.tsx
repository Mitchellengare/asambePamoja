"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Map, Calendar, Users, Sparkles, ArrowRight, TrendingUp, Clock, MapPin, Plus, Plane } from "lucide-react"

const upcomingTrips = [
  {
    id: "1",
    title: "Japan Cherry Blossom Tour",
    destination: "Tokyo, Kyoto, Osaka",
    startDate: "Mar 25, 2026",
    daysUntil: 69,
    image: "/japan-cherry-blossom-temple.png",
    progress: 75,
    collaborators: 3,
  },
  {
    id: "2",
    title: "Greek Island Hopping",
    destination: "Santorini, Mykonos, Crete",
    startDate: "Jun 15, 2026",
    daysUntil: 151,
    image: "/greece-santorini-white-buildings.jpg",
    progress: 40,
    collaborators: 2,
  },
]

const recentActivity = [
  {
    id: "1",
    user: { name: "Mike Chen", avatar: "/diverse-person-avatar-2.png" },
    action: "added an activity to",
    trip: "Japan Cherry Blossom Tour",
    time: "2 hours ago",
  },
  {
    id: "2",
    user: { name: "Sarah Johnson", avatar: "/person-avatar-3.png" },
    action: "commented on",
    trip: "Greek Island Hopping",
    time: "5 hours ago",
  },
  {
    id: "3",
    user: { name: "You", avatar: "/person-avatar-1.png" },
    action: "updated the budget for",
    trip: "Japan Cherry Blossom Tour",
    time: "1 day ago",
  },
]

const aiSuggestions = [
  {
    id: "1",
    title: "Best time to visit Kyoto temples",
    description: "Early morning visits avoid crowds and offer the best lighting for photos.",
    type: "tip",
  },
  {
    id: "2",
    title: "Local restaurant recommendation",
    description: "Try Kikunoi for authentic kaiseki cuisine in Kyoto.",
    type: "recommendation",
  },
]

const stats = [
  { label: "Total Trips", value: "12", icon: Map, change: "+2 this month" },
  { label: "Countries Visited", value: "8", icon: Plane, change: "+1 this year" },
  { label: "Collaborators", value: "15", icon: Users, change: "5 active now" },
  { label: "AI Suggestions Used", value: "24", icon: Sparkles, change: "92% helpful" },
]

export function DashboardOverview() {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, John!</h1>
          <p className="text-muted-foreground mt-1">
            Your Japan trip is coming up in 69 days. Let&apos;s finish planning!
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/ai-planner">
              <Sparkles className="mr-2 h-4 w-4" />
              AI Suggestions
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/trips/new">
              <Plus className="mr-2 h-4 w-4" />
              New Trip
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upcoming Trips */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Upcoming Trips</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/trips">
                View all
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4">
            {upcomingTrips.map((trip) => (
              <Card key={trip.id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-48 h-32 sm:h-auto">
                    <Image src={trip.image || "/placeholder.svg"} alt={trip.title} fill className="object-cover" />
                  </div>
                  <CardContent className="flex-1 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link href={`/dashboard/trips/${trip.id}`}>
                          <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                            {trip.title}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {trip.destination}
                        </div>
                      </div>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {trip.daysUntil} days
                      </Badge>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Planning progress</span>
                        <span className="font-medium">{trip.progress}%</span>
                      </div>
                      <Progress value={trip.progress} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        {trip.startDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{trip.collaborators} travelers</span>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* AI Suggestions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-4 w-4 text-primary" />
                AI Suggestions
              </CardTitle>
              <CardDescription>Personalized tips for your trips</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="text-xs shrink-0">
                      {suggestion.type}
                    </Badge>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">{suggestion.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{suggestion.description}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link href="/dashboard/ai-planner">
                  Get more suggestions
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recent Activity</CardTitle>
              <CardDescription>Updates from your travel crew</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-sm">
                    <p className="text-foreground">
                      <span className="font-medium">{activity.user.name}</span>{" "}
                      <span className="text-muted-foreground">{activity.action}</span>{" "}
                      <span className="font-medium">{activity.trip}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
