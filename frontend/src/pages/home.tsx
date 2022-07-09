import { useAppDispatch, useAppSelector } from "../state/hooks";
import { getAuthData, getUser } from "../state/reducers/authSlice";
import Login from "./allAuth/login";
import FullPlan from "./fullPlan/fullPlan";
import NavBar from "./Navbar/navbar";
import { signOut } from "firebase/auth";

import { useEffect, useState } from "react";
import { auth } from "../firebase";

const Home = () => {
  const { user, newstatus, status, uid } = useAppSelector(getAuthData);
  const dispatch = useAppDispatch();
  const [pass, setpass] = useState(false);

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
    setpass(true);
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
