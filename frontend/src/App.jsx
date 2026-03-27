import { BrowserRouter, Routes, Route, NavLink, useNavigate, useLocation } from "react-router-dom";
import Explore from "./pages/Explore";
import CreateTrip from "./pages/CreateTrip";
import TripDetail from "./pages/TripDetail";
import BucketList from "./pages/BucketList";
import Reviews from "./pages/Reviews";
import LandingPage from "./pages/LandingPage"
import "./App.css";

// Mock logged-in user — replace with real auth
export const CURRENT_USER = { id: 1, username: "Mitchelle", avatar_color: "#1D9E75" };

function Nav() {
  return (
    <nav className="nav">
      <div className="logo">asambe<span>Pamoja</span></div>
      <div className="nav-links">
        <NavLink to="/explore" end className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"}>Explore</NavLink>
        <NavLink to="/bucket" className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"}>Bucket list</NavLink>
        <NavLink to="/reviews" className={({ isActive }) => isActive ? "nav-btn active" : "nav-btn"}>Reviews</NavLink>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <NavLink to="/create" className="nav-btn cta">+ New trip</NavLink>
        <div className="avatar" style={{ background: CURRENT_USER.avatar_color }}>
          {CURRENT_USER.username[0]}
        </div>
      </div>
    </nav>
  );
}

function Layout() {
  const location = useLocation();
  const hideNav = location.pathname === "/";

  return (
    <div className="app">
      {!hideNav && <Nav />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/create" element={<CreateTrip />} />
        <Route path="/trips/:id" element={<TripDetail />} />
        <Route path="/bucket" element={<BucketList />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>
    </div>
  );
}
export default function App() {
  return (
     <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
