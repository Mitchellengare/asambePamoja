import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AsambePamojaLanding from "./components/Landing";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        {/*<Route path="/" element={<AsambePamojaLanding />} />*/}
        <Route path="/" element={<Dashboard/>} />
        <Route path="/dashboard/trips/new" element={<CreateTripForm />} />

      </Routes>
    </Router>
  );
}