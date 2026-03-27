import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBucket, removeFromBucket } from "../services/api";
import { CURRENT_USER } from "../App";

export default function BucketList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBucket(CURRENT_USER.id).then(setItems).finally(() => setLoading(false));
  }, []);

  const handleRemove = async (id) => {
    await removeFromBucket(id);
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="page">
      <div className="section-header">
        <div className="section-title">Your bucket list</div>
        <Link to="/" className="section-link">+ Discover more</Link>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : items.length === 0 ? (
        <div className="empty">
          Nothing saved yet.<br />
          <Link to="/" style={{ color: "var(--brand)", fontSize: 14 }}>Browse trips and add some!</Link>
        </div>
      ) : items.map(item => (
        <div key={item.id} className="bucket-item">
          <div className="bucket-emoji">{item.emoji}</div>
          <div className="bucket-info">
            <div className="bucket-title">{item.title}</div>
            <div className="bucket-sub">{item.destination}</div>
          </div>
          {item.trip_id && <Link to={`/trips/${item.trip_id}`} style={{ fontSize: 13, color: "var(--brand)", marginRight: 8 }}>View trip</Link>}
          <button className="bucket-remove" onClick={() => handleRemove(item.id)}>✕</button>
        </div>
      ))}
    </div>
  );
}
