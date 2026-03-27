import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTrip, joinTrip, leaveTrip, getReviews, createReview, addToBucket } from "../services/api";
import { CURRENT_USER } from "../App";

export default function TripDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({ rating: 5, body: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState("");

  const isMember = trip?.members?.some(m => m.id === CURRENT_USER.id);

  useEffect(() => {
    Promise.all([getTrip(id), getReviews(id)])
      .then(([t, r]) => { setTrip(t); setReviews(r); })
      .finally(() => setLoading(false));
  }, [id]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const handleJoin = async () => {
    const updated = await joinTrip(id, CURRENT_USER.id);
    setTrip(updated.trip);
    showToast("Joined! Welcome to the trip.");
  };

  const handleLeave = async () => {
    await leaveTrip(id, CURRENT_USER.id);
    setTrip(t => ({ ...t, members: t.members.filter(m => m.id !== CURRENT_USER.id) }));
    showToast("Left the trip.");
  };

  const handleBucket = async () => {
    await addToBucket({ user_id: CURRENT_USER.id, trip_id: Number(id) });
    showToast("Added to bucket list!");
  };

  const handleReview = async () => {
    if (!review.body.trim()) return;
    setSubmitting(true);
    try {
      const r = await createReview({ trip_id: Number(id), author_id: CURRENT_USER.id, ...review });
      setReviews(prev => [r, ...prev]);
      setReview({ rating: 5, body: "" });
      showToast("Review posted!");
    } catch (e) {
      showToast(e.message || "Could not post review.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Loading trip...</div>;
  if (!trip) return <div className="empty">Trip not found.</div>;

  const bg = { beach: "#E1F5EE", culture: "#EEEDFE", africa: "#FAECE7", europe: "#E6F1FB" }[trip.tags?.[0]] || "#F1EFE8";

  return (
    <div className="page" style={{ maxWidth: 720 }}>
      {/* Hero */}
      <div style={{ background: bg, borderRadius: "var(--radius-lg)", padding: "2rem", textAlign: "center", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: 64, marginBottom: 12 }}>{trip.emoji}</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>{trip.title}</h1>
        <p style={{ color: "var(--muted)", fontSize: 14 }}>{trip.destination} · {trip.start_date || "Dates TBD"}{trip.end_date ? ` – ${trip.end_date}` : ""}</p>
        {trip.description && <p style={{ marginTop: 12, fontSize: 15, color: "var(--text)", lineHeight: 1.6, maxWidth: 480, margin: "12px auto 0" }}>{trip.description}</p>}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20 }}>
          {!isMember && trip.visibility === "open" && <button className="btn-primary" onClick={handleJoin}>Join this trip</button>}
          {isMember && <button className="btn-outline" onClick={handleLeave}>Leave trip</button>}
          <button className="btn-outline" onClick={handleBucket}>+ Bucket list</button>
        </div>
      </div>

      {/* Members */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div className="section-header"><div className="section-title">Members ({trip.member_count})</div></div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {trip.members.map(m => (
            <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--surface)", border: "0.5px solid var(--border)", borderRadius: 100, padding: "5px 12px 5px 6px" }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: m.avatar_color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500, color: "#fff" }}>{m.username[0]}</div>
              <span style={{ fontSize: 13 }}>{m.username}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div>
        <div className="section-header">
          <div className="section-title">Reviews {trip.rating && <span style={{ fontSize: 15, color: "var(--muted)", fontFamily: "DM Sans" }}>· ★ {trip.rating}</span>}</div>
        </div>

        {isMember && (
          <div className="form-card" style={{ marginBottom: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Your rating</label>
              <div style={{ display: "flex", gap: 6 }}>
                {[1,2,3,4,5].map(n => (
                  <button key={n} onClick={() => setReview(r => ({ ...r, rating: n }))} style={{ fontSize: 20, background: "none", border: "none", cursor: "pointer", opacity: review.rating >= n ? 1 : 0.3 }}>★</button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <textarea className="form-input" rows={3} placeholder="Share your experience..." value={review.body} onChange={e => setReview(r => ({ ...r, body: e.target.value }))} style={{ resize: "vertical" }} />
            </div>
            <div className="form-actions">
              <button className="btn-primary" onClick={handleReview} disabled={submitting}>{submitting ? "Posting..." : "Post review"}</button>
            </div>
          </div>
        )}

        {reviews.length === 0 ? (
          <div className="empty">No reviews yet. {isMember ? "Be the first!" : "Join the trip to leave a review."}</div>
        ) : reviews.map(r => (
          <div key={r.id} className="review-card">
            <div className="review-header">
              <div className="review-av" style={{ background: r.author_color }}>{r.author?.[0] || "?"}</div>
              <div>
                <div className="review-name">{r.author}</div>
                <div className="review-trip">{r.trip_title}</div>
              </div>
              <div className="review-stars">{Array(r.rating).fill(null).map((_, i) => <span key={i} className="star">★</span>)}</div>
            </div>
            <div className="review-body">{r.body}</div>
          </div>
        ))}
      </div>

      {toast && (
        <div style={{ position: "fixed", bottom: 24, right: 24, background: "var(--brand-dark)", color: "#fff", padding: "10px 18px", borderRadius: "var(--radius)", fontSize: 13 }}>
          {toast}
        </div>
      )}
    </div>
  );
}
