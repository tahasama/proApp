import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import AllConcrete from "./pages/allConcrete/allConcrete";
import AllReinforcement from "./pages/allReinforcement/allReinforcement";
import AllItn from "./pages/allItn/allItn";
import FullPlan from "./pages/fullPlan/fullPlan";
import IndividualItn from "./pages/individualItn/individualItn";

import LocationDetail from "./pages/locationDetail/locationDetail";
import AllNcr from "./pages/allNcr/allNcr";
import AllQor from "./pages/allQor/allQor";
import { onAuthStateChanged } from "firebase/auth";
import { getAuthData, getUser, saveUser } from "./state/reducers/authSlice";
import Login from "./pages/allAuth/login";
import Register from "./pages/allAuth/register";
import ResetPassword from "./pages/allAuth/resetPassword";
import Authorize from "./pages/allAuth/authorize";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import Workbook from "./pages/allLab/workbook/workbook";
import AllLab from "./pages/allLab/allLab";
import { auth } from "./firebase";

function App() {
  const dispatch = useAppDispatch();
  const { status, uid } = useAppSelector(getAuthData);

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
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

  return (
    <div className="">
      {/* <div className="smallScreen">
        This App is exclusively available on PC on Full Screen. Please use your
        Laptop for an efficient experience
      </div> */}
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/authorized/:id/:email" element={<Authorize />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            {(status === "manager" ||
              (status !== "unauthorized" && status !== undefined)) && (
              <>
                <Route path="/fullPlan" element={<FullPlan />} />
                <Route path="/allitn" element={<AllItn />} />
                <Route path="/allconcrete" element={<AllConcrete />} />
                <Route
                  path="/allreinforcement"
                  element={<AllReinforcement />}
                />
                <Route path="/allNcr" element={<AllNcr />} />
                <Route path="/allQor" element={<AllQor />} />
                <Route path="/allLab" element={<AllLab />} />
                <Route path="/allLab/:book" element={<Workbook />} />
                <Route path="/:itp" element={<LocationDetail />} />
                <Route path="/:itp/:itnId" element={<IndividualItn />} />
                {/* <Route path="/:itp/:itnId/itnForm" element={<ItnForm />} /> */}
              </>
            )}
          </Routes>
        </BrowserRouter>
      </div>{" "}
    </div>
  );
}

export default App;
