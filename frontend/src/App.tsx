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
import { getAuthData, getUser, saveUser } from "./state/reducers/authSlice";
import Login from "./pages/allAuth/login";
import Register from "./pages/allAuth/register";
import ResetPassword from "./pages/allAuth/resetPassword";
import Home from "./pages/home";
import Authorize from "./pages/allAuth/authorize";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import AllLab from "./pages/allLab/allLab";
import Workbook from "./pages/allLab/workbook/workbook";

// import Checklist from "./pages/individualItn/itnForm/checklist6";
// import Checklist5 from "./pages/individualItn/itnForm/checklist5";
// import Checklist4 from "./pages/individualItn/itnForm/checklist4";
// import Checklist3 from "./pages/individualItn/itnForm/checklist3";
// import Checklist2 from "./pages/individualItn/itnForm/checklist2";

function App() {
  const dispatch = useAppDispatch();
  const { user, status, uid, newstatus, email } = useAppSelector(getAuthData);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(saveUser(user));
      } else {
        dispatch(saveUser(undefined));
      }
    });
  }, [dispatch]);
  useEffect(() => {
    dispatch(getUser(uid));
  }, [uid]);

  console.log("THIS IS THE ORIGIN", status, "of the user", uid);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/authorized/:id/:email" element={<Authorize />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {(status === "manager" ||
            (status !== "unauthorized" && status !== undefined)) && (
            <>
              <Route path="/fullPlan" element={<FullPlan />} />
              <Route path="/allitn" element={<AllItn />} />
              <Route path="/allconcrete" element={<AllConcrete />} />
              <Route path="/allreinforcement" element={<AllReinforcement />} />
              <Route path="/allNcr" element={<AllNcr />} />
              <Route path="/allQor" element={<AllQor />} />
              <Route path="/allLab" element={<AllLab />} />
              <Route path="/allLab/:book" element={<Workbook />} />
              <Route path="/:itp" element={<LocationDetail />} />
              <Route path="/:itp/:itnId" element={<IndividualItn />} />
              <Route path="/:itp/:itnId/itnForm" element={<ItnForm />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
