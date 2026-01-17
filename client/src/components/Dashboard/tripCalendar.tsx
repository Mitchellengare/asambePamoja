"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { ChevronLeft, ChevronRight, MapPin, Users, Clock } from "lucide-react"

const trips = [
  {
    id: "1",
    title: "Japan Cherry Blossom Tour",
    startDate: new Date(2026, 2, 25),
    endDate: new Date(2026, 3, 8),
    destinations: ["Tokyo", "Kyoto", "Osaka"],
    color: "bg-primary",
    collaborators: 3,
  },
  {
    id: "2",
    title: "Greek Island Hopping",
    startDate: new Date(2026, 5, 15),
    endDate: new Date(2026, 5, 28),
    destinations: ["Santorini", "Mykonos", "Crete"],
    color: "bg-accent",
    collaborators: 2,
  },
]

export function TripCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const getTripForDate = (date: Date) => {
    return trips.find((trip) => date >= trip.startDate && date <= trip.endDate)
  }

  const selectedTrip = selectedDate ? getTripForDate(selectedDate) : null

  const tripDates = trips.flatMap((trip) => {
    const dates: Date[] = []
    const currentDate = new Date(trip.startDate)
    while (currentDate <= trip.endDate) {
      dates.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return dates
  })

  return (
    <div className="p-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Trip Calendar</CardTitle>
                <CardDescription>View and manage your upcoming trips</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium min-w-[120px] text-center">
                  {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              className="rounded-md border w-full"
              modifiers={{
                trip: tripDates,
              }}
              modifiersStyles={{
                trip: {
                  backgroundColor: "hsl(var(--primary) / 0.2)",
                  borderRadius: "0",
                },
              }}
            />
          </CardContent>
        </Card>

        {/* Selected Date Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {selectedDate?.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedTrip ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-3 h-3 rounded-full ${selectedTrip.color} mt-1.5`} />
                    <div className="flex-1">
                      <Link href={`/dashboard/trips/${selectedTrip.id}`}>
                        <h4 className="font-semibold text-foreground hover:text-primary transition-colors">
                          {selectedTrip.title}
                        </h4>
                      </Link>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {selectedTrip.destinations.join(" → ")}
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {Math.ceil(
                            (selectedTrip.endDate.getTime() - selectedTrip.startDate.getTime()) / (1000 * 60 * 60 * 24),
                          )}{" "}
                          days
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          {selectedTrip.collaborators} travelers
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href={`/dashboard/trips/${selectedTrip.id}`}>View Trip Details</Link>
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground text-sm">No trips scheduled for this date</p>
                  <Button variant="outline" className="mt-4 bg-transparent" asChild>
                    <Link href="/dashboard/trips/new">Plan a Trip</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Trips Legend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Upcoming Trips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {trips.map((trip) => (
                <Link
                  key={trip.id}
                  href={`/dashboard/trips/${trip.id}`}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  <div className={`w-3 h-3 rounded-full ${trip.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">{trip.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {trip.startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} -{" "}
                      {trip.endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {Math.ceil((trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 60 * 60 * 24))}d
                  </Badge>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
