import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTrendingTrips, getUserSuggestions, addToBucket } from "../services/api";
import { CURRENT_USER } from "../App";

const TAGS = ["All", "Africa", "Europe", "Asia", "Americas", "Beach", "Culture"];
const BG_MAP = { beach: "#E1F5EE", culture: "#EEEDFE", africa: "#FAECE7", europe: "#E6F1FB", asia: "#EAF3DE", americas: "#FAEEDA" };

function TripCard({ trip, onBucket }) {
  const bg = trip.tags?.[0] ? BG_MAP[trip.tags[0]] || "#F1EFE8" : "#F1EFE8";
  return (
    <Link to={`/trips/${trip.id}`} className="trip-card">
      <div className="trip-img" style={{ background: bg }}>
        {trip.emoji}
        <div className={`trip-badge ${trip.visibility === "open" ? "open" : ""}`}>
          {trip.visibility === "open" ? "Open to join" : "Invite only"}
        </div>
      </div>
      <div className="trip-body">
        <div className="trip-title">{trip.title}</div>
        <div className="trip-meta">{trip.destination} · {trip.start_date || "Dates TBD"}</div>
        <div className="trip-footer">
          <div style={{ fontSize: 12, color: "var(--muted)" }}>{trip.member_count} members</div>
          {trip.rating && (
            <div className="trip-rating">
              <span className="star">★</span> {trip.rating}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function Explore() {
  const [trips, setTrips] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [activeTag, setActiveTag] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrendingTrips().then(setTrips).finally(() => setLoading(false));
    getUserSuggestions(CURRENT_USER.id).then(setSuggestions).catch(() => {});
  }, []);

  const filtered = activeTag === "All"
    ? trips
    : trips.filter(t => t.tags?.includes(activeTag.toLowerCase()));

  const handleBucket = async (trip) => {
    try {
      await addToBucket({ user_id: CURRENT_USER.id, trip_id: trip.id });
    } catch (e) {}
  };

  return (
    <>
      <div className="hero">
        <div className="hero-eyebrow">Travel together</div>
        <h1>Plan trips. Build<br /><em>memories</em> together.</h1>
        <p>Create trips, invite friends, discover destinations, and review each other's adventures.</p>
        <div className="hero-btns">
          <Link to="/create" className="btn-primary">Plan your next trip</Link>
          <Link to="/bucket" className="btn-outline">My bucket list</Link>
        </div>
      </div>

      <div className="page">
        <div className="stats-row">
          <div className="stat-card"><div className="stat-label">Active trips</div><div className="stat-val">{trips.length}</div></div>
          <div className="stat-card"><div className="stat-label">Open to join</div><div className="stat-val">{trips.filter(t => t.visibility === "open").length}</div></div>
          <div className="stat-card"><div className="stat-label">Destinations</div><div className="stat-val">{new Set(trips.map(t => t.destination)).size}</div></div>
        </div>

        {suggestions.length > 0 && (
          <div className="suggestion-banner">
            <div style={{ fontSize: 24 }}>✨</div>
            <div className="suggestion-text">
              <strong>Suggested for you — {suggestions[0].destination}</strong>
              <span>{suggestions[0].reason || "Based on your interests and location"}</span>
            </div>
            <Link to={`/trips/${suggestions[0].id}`} className="btn-primary" style={{ fontSize: 13, padding: "7px 14px", flexShrink: 0 }}>Explore</Link>
          </div>
        )}

        <div className="section-header">
          <div className="section-title">Trending trips</div>
        </div>

        <div className="tags-row">
          {TAGS.map(tag => (
            <button key={tag} className={`tag ${activeTag === tag ? "active" : ""}`} onClick={() => setActiveTag(tag)}>
              {tag}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading">Loading trips...</div>
        ) : filtered.length === 0 ? (
          <div className="empty">No trips found. <Link to="/create" style={{ color: "var(--brand)" }}>Create the first one!</Link></div>
        ) : (
          <div className="cards-grid">
            {filtered.map(trip => <TripCard key={trip.id} trip={trip} onBucket={handleBucket} />)}
          </div>
        )}
      </div>
    </>
  );
}
