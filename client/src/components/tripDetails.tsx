"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  MapPin,
  Users,
  Plus,
  Clock,
  DollarSign,
  GripVertical,
  Edit,
  Trash2,
  MessageSquare,
  Send,
  UserPlus,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

interface TripDetailProps {
  tripId: string
}

const tripData = {
  id: "1",
  title: "Japan Cherry Blossom Tour",
  description: "Exploring Tokyo, Kyoto, and Osaka during sakura season",
  startDate: "2026-03-25",
  endDate: "2026-04-08",
  image: "/japan-cherry-blossom-mount-fuji.jpg",
  budget: 5000,
  spent: 2340,
  collaborators: [
    { id: "1", name: "You", avatar: "/person-avatar-1.png", role: "owner" },
    { id: "2", name: "Mike Chen", avatar: "/diverse-person-avatar-2.png", role: "editor" },
    {
      id: "3",
      name: "Sarah Johnson",
      avatar: "/person-avatar-3.png",
      role: "viewer",
    },
  ],
  itinerary: [
    {
      date: "2026-03-25",
      location: "Tokyo",
      activities: [
        {
          id: "a1",
          time: "09:00",
          title: "Arrive at Narita Airport",
          type: "transport",
          duration: "2h",
          cost: 0,
          notes: "Flight JL002 from LAX",
        },
        {
          id: "a2",
          time: "14:00",
          title: "Check in at Park Hyatt Tokyo",
          type: "accommodation",
          duration: "1h",
          cost: 450,
          notes: "Room with Mt. Fuji view",
        },
        {
          id: "a3",
          time: "16:00",
          title: "Explore Shinjuku Gyoen",
          type: "activity",
          duration: "3h",
          cost: 15,
          notes: "Famous cherry blossom spot",
        },
      ],
    },
    {
      date: "2026-03-26",
      location: "Tokyo",
      activities: [
        {
          id: "a4",
          time: "08:00",
          title: "Tsukiji Outer Market Breakfast",
          type: "food",
          duration: "2h",
          cost: 50,
          notes: "Try fresh sushi and tamagoyaki",
        },
        {
          id: "a5",
          time: "11:00",
          title: "TeamLab Borderless",
          type: "activity",
          duration: "3h",
          cost: 30,
          notes: "Book tickets in advance",
        },
        {
          id: "a6",
          time: "15:00",
          title: "Senso-ji Temple",
          type: "activity",
          duration: "2h",
          cost: 0,
          notes: "Oldest temple in Tokyo",
        },
        {
          id: "a7",
          time: "19:00",
          title: "Dinner in Shibuya",
          type: "food",
          duration: "2h",
          cost: 80,
          notes: "Reservation at Gonpachi",
        },
      ],
    },
    {
      date: "2026-03-27",
      location: "Kyoto",
      activities: [
        {
          id: "a8",
          time: "07:00",
          title: "Shinkansen to Kyoto",
          type: "transport",
          duration: "2.5h",
          cost: 130,
          notes: "Reserved seats on Nozomi",
        },
        {
          id: "a9",
          time: "10:30",
          title: "Check in at Ritz-Carlton Kyoto",
          type: "accommodation",
          duration: "1h",
          cost: 520,
          notes: "River view room",
        },
        {
          id: "a10",
          time: "13:00",
          title: "Fushimi Inari Shrine",
          type: "activity",
          duration: "3h",
          cost: 0,
          notes: "Famous torii gates",
        },
      ],
    },
  ],
  messages: [
    {
      id: "m1",
      user: { name: "Mike Chen", avatar: "/diverse-person-avatar-2.png" },
      text: "Should we add a day trip to Nara? The deer park looks amazing!",
      time: "2 hours ago",
    },
    {
      id: "m2",
      user: { name: "You", avatar: "/person-avatar-1.png" },
      text: "Great idea! I'll add it to day 4. We can take the train from Kyoto.",
      time: "1 hour ago",
    },
    {
      id: "m3",
      user: { name: "Sarah Johnson", avatar: "/person-avatar-3.png" },
      text: "Don't forget to try the mochi there! 🍡",
      time: "30 min ago",
    },
  ],
}

const activityTypes = [
  { value: "activity", label: "Activity", color: "bg-accent" },
  { value: "food", label: "Food & Dining", color: "bg-amber-500" },
  { value: "transport", label: "Transportation", color: "bg-blue-500" },
  { value: "accommodation", label: "Accommodation", color: "bg-green-500" },
]

export function TripDetail({ tripId }: TripDetailProps) {
  const [expandedDays, setExpandedDays] = useState<string[]>(tripData.itinerary.map((day) => day.date))
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")

  const toggleDay = (date: string) => {
    setExpandedDays((prev) => (prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]))
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "transport":
        return "🚄"
      case "accommodation":
        return "🏨"
      case "food":
        return "🍽️"
      default:
        return "📍"
    }
  }

  const getActivityColor = (type: string) => {
    const activityType = activityTypes.find((t) => t.value === type)
    return activityType?.color || "bg-muted"
  }

  const totalDays = Math.ceil(
    (new Date(tripData.endDate).getTime() - new Date(tripData.startDate).getTime()) / (1000 * 60 * 60 * 24),
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-64 sm:h-80 lg:h-96">
        <Image src={tripData.image || "/placeholder.svg"} alt={tripData.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 max-w-7xl mx-auto">
          <Badge className="mb-3 bg-accent text-accent-foreground">Upcoming Trip</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">{tripData.title}</h1>
          <p className="text-muted-foreground max-w-2xl">{tripData.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold text-foreground">{totalDays} days</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Destinations</p>
                  <p className="font-semibold text-foreground">3 cities</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Travelers</p>
                  <p className="font-semibold text-foreground">{tripData.collaborators.length} people</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Budget</p>
                  <p className="font-semibold text-foreground">
                    ${tripData.spent} / ${tripData.budget}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="itinerary" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="collaborators">Collaborators</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>

          {/* Itinerary Tab */}
          <TabsContent value="itinerary" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Trip Itinerary</h2>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Sparkles className="w-4 h-4" />
                  AI Suggest
                </Button>
                <Dialog open={isAddActivityOpen} onOpenChange={setIsAddActivityOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add Activity
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Activity</DialogTitle>
                      <DialogDescription>Add an activity to your itinerary</DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="activityDate">Date</Label>
                          <Select value={selectedDate || ""} onValueChange={setSelectedDate}>
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="Select date" />
                            </SelectTrigger>
                            <SelectContent>
                              {tripData.itinerary.map((day) => (
                                <SelectItem key={day.date} value={day.date}>
                                  {new Date(day.date).toLocaleDateString("en-US", {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="activityTime">Time</Label>
                          <Input id="activityTime" type="time" className="mt-1.5" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="activityTitle">Activity Name</Label>
                        <Input id="activityTitle" placeholder="e.g., Visit Tokyo Tower" className="mt-1.5" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="activityType">Type</Label>
                          <Select>
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              {activityTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="activityCost">Cost ($)</Label>
                          <Input id="activityCost" type="number" placeholder="0" className="mt-1.5" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="activityNotes">Notes</Label>
                        <Textarea id="activityNotes" placeholder="Additional details..." className="mt-1.5" />
                      </div>
                      <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsAddActivityOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">Add Activity</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Itinerary Timeline */}
            <div className="space-y-4">
              {tripData.itinerary.map((day, dayIndex) => (
                <Card key={day.date}>
                  <CardHeader
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => toggleDay(day.date)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold">
                          {dayIndex + 1}
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {new Date(day.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                            })}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <MapPin className="w-4 h-4" />
                            {day.location} · {day.activities.length} activities
                          </CardDescription>
                        </div>
                      </div>
                      {expandedDays.includes(day.date) ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </CardHeader>
                  {expandedDays.includes(day.date) && (
                    <CardContent className="pt-0">
                      <div className="space-y-3 pl-4 border-l-2 border-border ml-6">
                        {day.activities.map((activity) => (
                          <div
                            key={activity.id}
                            className="relative pl-6 py-3 bg-card rounded-lg border border-border hover:shadow-md transition-all group"
                          >
                            <div
                              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[calc(50%+1px)] w-3 h-3 rounded-full ${getActivityColor(activity.type)}`}
                            />
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                <GripVertical className="w-4 h-4 text-muted-foreground mt-1 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-lg">{getActivityIcon(activity.type)}</span>
                                    <h4 className="font-medium text-foreground">{activity.title}</h4>
                                  </div>
                                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3.5 h-3.5" />
                                      {activity.time} · {activity.duration}
                                    </span>
                                    {activity.cost > 0 && (
                                      <span className="flex items-center gap-1">
                                        <DollarSign className="w-3.5 h-3.5" />${activity.cost}
                                      </span>
                                    )}
                                  </div>
                                  {activity.notes && (
                                    <p className="text-sm text-muted-foreground mt-1">{activity.notes}</p>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                        <Button variant="ghost" size="sm" className="ml-6 text-muted-foreground">
                          <Plus className="w-4 h-4 mr-2" />
                          Add activity to this day
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Collaborators Tab */}
          <TabsContent value="collaborators">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Trip Collaborators</CardTitle>
                    <CardDescription>People planning this trip together</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <UserPlus className="w-4 h-4" />
                        Invite
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Invite Collaborators</DialogTitle>
                        <DialogDescription>Add friends and family to plan this trip together</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div>
                          <Label htmlFor="inviteEmail">Email Address</Label>
                          <Input id="inviteEmail" type="email" placeholder="friend@example.com" className="mt-1.5" />
                        </div>
                        <div>
                          <Label htmlFor="inviteRole">Role</Label>
                          <Select defaultValue="editor">
                            <SelectTrigger className="mt-1.5">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="editor">Editor - Can edit itinerary</SelectItem>
                              <SelectItem value="viewer">Viewer - Can only view</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="w-full">Send Invitation</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tripData.collaborators.map((collab) => (
                    <div
                      key={collab.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={collab.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{collab.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{collab.name}</p>
                          <p className="text-sm text-muted-foreground capitalize">{collab.role}</p>
                        </div>
                      </div>
                      {collab.role !== "owner" && (
                        <Button variant="ghost" size="sm" className="text-destructive">
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Chat Tab */}
          <TabsContent value="chat">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Trip Discussion
                </CardTitle>
                <CardDescription>Chat with your travel companions</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto">
                <div className="space-y-4">
                  {tripData.messages.map((message) => (
                    <div key={message.id} className="flex gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={message.user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{message.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="font-medium text-foreground text-sm">{message.user.name}</span>
                          <span className="text-xs text-muted-foreground">{message.time}</span>
                        </div>
                        <p className="text-foreground mt-1">{message.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button size="icon">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
