import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AsambePamojaLanding from "./components/Landing";
import Dashboard from "./components/Dashoboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AsambePamojaLanding />} />
        <Route path="/" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
}