import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import AllConcrete from "./pages/allConcrete/allConcrete";
import AllReinforcement from "./pages/allReinforcement/allReinforcement";
import AllItn from "./pages/allItn/allItn";
import StatsPerMonth from "./pages/allItn/stats/statsPerMonth/statsPerMonth";
import FullPlan from "./pages/fullPlan/fullPlan";
import IndividualItn from "./pages/individualItn/individualItn";
import ItnForm from "./pages/individualItn/itnForm/itnForm";

import LocationDetail from "./pages/locationDetail/locationDetail";
import AllNcr from "./pages/allNcr/allNcr";
import AllQor from "./pages/allQor/allQor";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { saveUser } from "./state/reducers/authSlice";
import Login from "./pages/allAuth/login";
import Register from "./pages/allAuth/register";
import ResetPassword from "./pages/allAuth/resetPassword";

// import Checklist from "./pages/individualItn/itnForm/checklist6";
// import Checklist5 from "./pages/individualItn/itnForm/checklist5";
// import Checklist4 from "./pages/individualItn/itnForm/checklist4";
// import Checklist3 from "./pages/individualItn/itnForm/checklist3";
// import Checklist2 from "./pages/individualItn/itnForm/checklist2";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(saveUser(user));
      } else {
        dispatch(saveUser(undefined));
      }
    });
  }, [dispatch]);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FullPlan />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/allitn" element={<AllItn />} />
          <Route path="/allconcrete" element={<AllConcrete />} />
          <Route path="/allreinforcement" element={<AllReinforcement />} />
          <Route path="/allNcr" element={<AllNcr />} />
          <Route path="/allQor" element={<AllQor />} />
          <Route path="/:itp" element={<LocationDetail />} />
          <Route path="/:itp/:itnId" element={<IndividualItn />} />
          <Route path="/:itp/:itnId/itnForm" element={<ItnForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
