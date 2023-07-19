import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  getAuthData,
  getUser,
  loginUser,
  updateError,
} from "../../state/reducers/authSlice";
import "./login.css";
import { provider } from "../../firebase";

import { useState } from "react";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const Login = () => {
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { err } = useAppSelector(getAuthData);
  const [alerto, setAlerto] = useState(true);
  const { status, uid, user } = useAppSelector(getAuthData);
  // console.log("rrrrrrrrr", user.email);
  useEffect(() => {
    dispatch(getUser(uid));
  }, []);

  if (err.code === "auth/user-not-found") {
    dispatch(updateError("wrong email, please try again"));
  } else if (err.code === "auth/wrong-password") {
    dispatch(updateError("Wrong password, please try again"));
  } else if (err.code === "auth/invalid-email") {
    dispatch(updateError("Please provide a valid email"));
  } else if (err.code === "auth/internal-error") {
    dispatch(updateError("Please provide a valid password"));
  } else if (err.code === "auth/network-request-failed") {
    dispatch(updateError("Failed to login, please try again"));
  } else if (
    err.code === "storage/object-not-found" ||
    err.code === "auth/popup-closed-by-user"
  ) {
    dispatch(updateError(""));
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      dispatch(updateError(""));
      dispatch(
        loginUser({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
      );
    } catch (err) {
      dispatch(updateError("failed to login, please try again"));
      navigate("/fullPlan");
    }
  };

  const LoginGoogle = (e: any) => {
    dispatch(loginUser({ email: "", password: "", provider: provider }));
  };

  useEffect(() => {
    status === "authorized" || status === "manager"
      ? navigate("/fullPlan")
      : navigate("/");
  }, [status, user]);

  const authorization = (
    // <Alert
    //   severity="success"
    //   style={{ alignItems: "center", justifyContent: "center" }}
    // >
    //   <AlertTitle>Your inscription will be examined</AlertTitle>
    //   youl receive a confirmation email of subscription very shortly, if you are
    //   an authorized member you will receive another email ginving you access to
    //   the app, Thank you for your patience.
    // </Alert>
    <div>ok</div>
  );

  // ==============================================================

  return (
    <div className="landing-container">
      {alerto && status !== undefined && status !== "" && authorization}
      <div className="content">
        <h1 className="title">
          Streamline Your Construction Projects with Our Data Management App
        </h1>
        <div className="features">
          <h2>Why Choose Our App?</h2>
          <ul className="features-list">
            <li>
              <strong>Adaptability:</strong> Effortlessly adjust to any project
              scale or type.
            </li>
            <li>
              <strong>Efficiency:</strong> Simplify data management, focus on
              completing projects on time and within budget.
            </li>
            <li>
              <strong>Real-Time Insights:</strong> Stay informed with up-to-date
              data and analytics.
            </li>
            <li>
              <strong>Security:</strong> Top-notch measures to keep your
              information safe.
            </li>
          </ul>
        </div>
        <div className="join">
          <h2>Join Us Today!</h2>
          {/* <p className="join-text">
            Experience the power of adaptive data management!
          </p> */}
          <div className="register-container">
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" ref={emailRef} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" ref={passwordRef} />
              </div>
              <div className="login-buttons">
                <button type="submit" className="login-button">
                  Login
                </button>
                <button
                  type="button"
                  className="login-button google"
                  onClick={LoginGoogle}
                >
                  Login with Google
                </button>
              </div>

              {status !== "unauthorized" && (
                <p className="forgot-password">
                  <Link to="/reset-password">Forgot password?</Link>
                </p>
              )}
              <p className="signup">
                Don't have an account? <Link to="/register">SignUp</Link>
              </p>
            </form>
            {err && <p className="error-message">{err.message}</p>}
          </div>
        </div>
        <p className="support">
          Got questions? Contact us at{" "}
          <a href="mailto:support@constructionapp.com">
            support@constructionapp.com
          </a>{" "}
          or call (123) 456-7890.
        </p>
      </div>
    </div>
  );
};

export default Login;
