import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import FullPlan from "./pages/fullPlan/fullPlan";
import IndividualItn from "./pages/individualItn/individualItn";
import LocationDetail from "./pages/locationDetail/locationDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FullPlan />} />
          <Route path="/:itp" element={<LocationDetail />} />
          <Route path="/:itp/:itnId" element={<IndividualItn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
