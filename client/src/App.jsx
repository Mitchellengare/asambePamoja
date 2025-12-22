import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AsambePamojaLanding from "./pages/Landing";
import Dashboard from "./pages/Dashoboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AsambePamojaLanding />} />
        <Route path="/" elemet={<Dashboard/>} />
      </Routes>
    </Router>
  );
}