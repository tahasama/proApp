import { useAppDispatch, useAppSelector } from "../state/hooks";
import { getAuthData, getUser } from "../state/reducers/authSlice";
import Login from "./allAuth/login";
import FullPlan from "./fullPlan/fullPlan";
import NavBar from "./Navbar/navbar";
import { signOut } from "firebase/auth";

import { useEffect } from "react";
import { auth } from "../firebase";

const Home = () => {
  const { user, newstatus, status, uid } = useAppSelector(getAuthData);
  const dispatch = useAppDispatch();

  console.log(
    "logggg",
    newstatus,
    "aaaaaa",
    status,
    "some other shit",
    user,
    "aaaaaaand",
    uid
  );

  useEffect(() => {
    dispatch(getUser(uid));
  }, [uid]);

  return (
    <div>
      {/* <NavBar /> */}
      {!user ||
      (user && status === "unauthorized") ||
      (status === undefined && newstatus === "unauthorized") ? (
        <Login />
      ) : (
        <FullPlan />
      )}
    </div>
  );
};

export default Home;
