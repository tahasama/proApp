import { useAppDispatch, useAppSelector } from "../state/hooks";
import { getAuthData, getUser } from "../state/reducers/authSlice";
import Login from "./allAuth/login";
import FullPlan from "./fullPlan/fullPlan";

import { useEffect } from "react";

const Home = () => {
  const { user, newstatus, status, uid } = useAppSelector(getAuthData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser(uid));
  }, [uid]);

  return (
    <div>
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
