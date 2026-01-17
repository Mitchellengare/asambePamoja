import React, { useMemo, useState } from "react";
import { Plus, Calendar, MapPin, Users, Search, ArrowRight } from "lucide-react";

export default function Dashboard() {
  // Mock data for now (we’ll replace with backend later)
  const [trips, setTrips] = useState([
    {
      id: "1",
      name: "Cancún Getaway",
      location: "Cancún, Mexico",
      dateRange: "Jan 10–15",
      members: 5,
      status: "Upcoming",
    },
    {
      id: "2",
      name: "Nairobi Weekend",
      location: "Nairobi, Kenya",
      dateRange: "Feb 2–4",
      members: 3,
      status: "Planning",
    },
    {
      id: "3",
      name: "Boston Day Trip",
      location: "Boston, MA",
      dateRange: "Mar 9",
      members: 2,
      status: "Past",
    },
  ]);

  const [query, setQuery] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const filteredTrips = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return trips;
    return trips.filter((t) =>
      [t.name, t.location, t.status].some((v) => v.toLowerCase().includes(q))
    );
  }, [query, trips]);

  const handleCreateTrip = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const location = String(form.get("location") || "").trim();
    const dateRange = String(form.get("dateRange") || "").trim();

    if (!name || !location) return;

    setTrips((prev) => [
      {
        id: crypto.randomUUID(),
        name,
        location,
        dateRange: dateRange || "TBD",
        members: 1,
        status: "Planning",
      },
      ...prev,
    ]);

    e.currentTarget.reset();
    setShowCreate(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Top bar */}
      <header className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-black">✈️ AsambePamoja</div>
            <span className="text-sm text-white/60">Dashboard</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCreate(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-white text-slate-950 px-4 py-2 font-semibold hover:opacity-90 transition"
            >
              <Plus className="w-5 h-5" />
              Create Trip
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Greeting + Search */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold">Your Trips</h1>
            <p className="text-white/70 mt-1">
              Organize plans, invite friends, and build your itinerary.
            </p>
          </div>

          <div className="w-full md:w-80">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <Search className="w-5 h-5 text-white/60" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search trips..."
                className="w-full bg-transparent outline-none text-white placeholder:text-white/40"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <StatCard label="Total Trips" value={trips.length} />
          <StatCard
            label="Upcoming"
            value={trips.filter((t) => t.status === "Upcoming").length}
          />
          <StatCard
            label="Planning"
            value={trips.filter((t) => t.status === "Planning").length}
          />
        </div>

        {/* Trip list */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">My Trips</h2>
            <span className="text-sm text-white/60">
              Showing {filteredTrips.length} of {trips.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>

          {filteredTrips.length === 0 && (
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
              <p className="text-white/80 font-semibold">No trips found</p>
              <p className="text-white/60 mt-1">
                Try a different search or create a new trip.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Create Trip modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-950 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold">Create a Trip</h3>
                <p className="text-white/60 text-sm mt-1">
                  Start simple — you can add itinerary and friends later.
                </p>
              </div>
              <button
                onClick={() => setShowCreate(false)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTrip} className="mt-5 space-y-3">
              <Field label="Trip name" name="name" placeholder="e.g., Zanzibar Spring Break" />
              <Field label="Location" name="location" placeholder="e.g., Zanzibar, Tanzania" />
              <Field label="Dates (optional)" name="dateRange" placeholder="e.g., Mar 15–20" />

              <button className="w-full mt-2 rounded-xl bg-white text-slate-950 px-4 py-3 font-semibold hover:opacity-90 transition">
                Create
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="text-white/60 text-sm">{label}</div>
      <div className="text-3xl font-extrabold mt-1">{value}</div>
    </div>
  );
}

function TripCard({ trip }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-bold">{trip.name}</div>
          <div className="flex items-center gap-2 text-white/70 mt-1">
            <MapPin className="w-4 h-4" />
            <span>{trip.location}</span>
          </div>
        </div>
        <span className="text-xs rounded-full border border-white/15 bg-white/5 px-3 py-1">
          {trip.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4 text-sm text-white/70">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{trip.dateRange}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>{trip.members} people</span>
        </div>
      </div>

      <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white hover:opacity-90">
        Open trip <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function Field({ label, name, placeholder }) {
  return (
    <label className="block">
      <span className="text-sm text-white/70">{label}</span>
      <input
        name={name}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-white/40 focus:border-white/25"
      />
    </label>
  );
}
