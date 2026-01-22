import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AsambePamojaLanding from "./components/Landing";
//import Dashboard from "./components/Dashboard";
import SignIn from "./components/signInPage/page"
import { MyTrips } from "./components/myTrips"
import HomePage from "./app/homePage"
import {AiPlanner} from "./components/aiPlanner"

export default function App() {
  return (
    <Router>
      <Routes>
        {/*<Route path="/" element={<AsambePamojaLanding />} />*/}
        <Route path="/" element = {<HomePage/>}/>
        <Route path="/trips" element={<MyTrips />} />
        <Route path="/ ai-planner" element={<AiPlanner />} />
        {/* <Route path="/" element={<SignIn />} />
        <Route path="/" element={<Dashboard/>} />
        <Route path="/dashboard/trips/new" element={<CreateTripForm />} /> */}

      </Routes>
    </Router>
  );
}