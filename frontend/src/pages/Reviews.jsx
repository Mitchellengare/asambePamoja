import { useState, useEffect } from "react";
import { getReviews } from "../services/api";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReviews().then(setReviews).finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <div className="section-header">
        <div className="section-title">All trip reviews</div>
      </div>

      {loading ? (
        <div className="loading">Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div className="empty">No reviews yet. Join a trip to leave the first one!</div>
      ) : reviews.map(r => (
        <div key={r.id} className="review-card">
          <div className="review-header">
            <div className="review-av" style={{ background: r.author_color }}>{r.author?.[0] || "?"}</div>
            <div>
              <div className="review-name">{r.author}</div>
              <div className="review-trip">{r.trip_title}</div>
            </div>
            <div className="review-stars">
              {Array(r.rating).fill(null).map((_, i) => <span key={i} className="star">★</span>)}
            </div>
          </div>
          <div className="review-body">{r.body}</div>
        </div>
      ))}
    </div>
  );
}
