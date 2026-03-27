import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTrip } from "../services/api";
import { CURRENT_USER } from "../App";

const EMOJIS = ["🌍", "🏔️", "🏖️", "🌸", "🏙️", "🦁", "⛷️", "🌺", "🗺️", "🌊"];
const TAGS_OPTIONS = ["Africa", "Europe", "Asia", "Americas", "Beach", "Culture", "Adventure", "Food"];

export default function CreateTrip() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", destination: "", description: "", start_date: "", end_date: "", visibility: "open" });
  const [emoji, setEmoji] = useState("🌍");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleTag = (tag) => setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

  const handleSubmit = async () => {
    if (!form.title || !form.destination) { setError("Please fill in a name and destination."); return; }
    setLoading(true); setError("");
    try {
      const trip = await createTrip({ ...form, emoji, tags: tags.map(t => t.toLowerCase()), creator_id: CURRENT_USER.id });
      navigate(`/trips/${trip.id}`);
    } catch (e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page" style={{ maxWidth: 640 }}>
      <div className="section-header">
        <div className="section-title">Plan a new trip</div>
      </div>

      <div className="form-card">
        <div className="form-group">
          <label className="form-label">Trip name</label>
          <input className="form-input" type="text" placeholder="e.g. East Africa Safari 2025" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
        </div>

        <div className="form-group">
          <label className="form-label">Destination</label>
          <input className="form-input" type="text" placeholder="City, Country" value={form.destination} onChange={e => setForm(f => ({ ...f, destination: e.target.value }))} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Start date</label>
            <input className="form-input" type="date" value={form.start_date} onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label">End date</label>
            <input className="form-input" type="date" value={form.end_date} onChange={e => setForm(f => ({ ...f, end_date: e.target.value }))} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Cover emoji</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {EMOJIS.map(e => (
              <button key={e} onClick={() => setEmoji(e)} style={{ width: 40, height: 40, fontSize: 20, border: `0.5px solid ${emoji === e ? "var(--brand)" : "var(--border)"}`, background: emoji === e ? "var(--brand-light)" : "var(--surface2)", borderRadius: "var(--radius)", cursor: "pointer" }}>{e}</button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Tags</label>
          <div className="tags-row">
            {TAGS_OPTIONS.map(tag => (
              <button key={tag} className={`tag ${tags.includes(tag) ? "active" : ""}`} onClick={() => toggleTag(tag)}>{tag}</button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea className="form-input" rows={3} placeholder="What's the vibe of this trip?" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ resize: "vertical" }} />
        </div>

        <div className="form-group">
          <label className="form-label">Who can join?</label>
          <select className="form-input" value={form.visibility} onChange={e => setForm(f => ({ ...f, visibility: e.target.value }))}>
            <option value="open">Open — anyone can join</option>
            <option value="invite">Invite only</option>
            <option value="private">Private</option>
          </select>
        </div>

        {error && <p style={{ color: "var(--accent)", fontSize: 13, marginBottom: 12 }}>{error}</p>}

        <div className="form-actions">
          <button className="btn-outline" onClick={() => navigate("/")}>Cancel</button>
          <button className="btn-primary" onClick={handleSubmit} disabled={loading}>{loading ? "Creating..." : "Create trip"}</button>
        </div>
      </div>
    </div>
  );
}
