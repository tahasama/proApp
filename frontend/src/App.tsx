import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import AllItn from "./pages/allItn/allItn";
import StatsPerMonth from "./pages/allItn/stats/statsPerMonth/statsPerMonth";
import FullPlan from "./pages/fullPlan/fullPlan";
import IndividualItn from "./pages/individualItn/individualItn";
import ItnForm from "./pages/individualItn/itnForm/itnForm";

import LocationDetail from "./pages/locationDetail/locationDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FullPlan />} />
          <Route path="/StatsPerMonth" element={<StatsPerMonth />} />
          <Route path="/allitn" element={<AllItn />} />
          <Route path="/:itp" element={<LocationDetail />} />
          <Route path="/:itp/:itnId" element={<IndividualItn />} />
          <Route path="/:itp/:itnId/itnForm" element={<ItnForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
