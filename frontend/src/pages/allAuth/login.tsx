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
  const { status, uid } = useAppSelector(getAuthData);

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
  }, [status]);

  useEffect(() => {
    setTimeout(() => {
      status !== "authorized" && status !== undefined && setAlerto(false);
    }, 7000);
    return setAlerto(true);
  }, [status]);

  const authorization = (
    <Alert
      severity="success"
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <AlertTitle>Your inscription will be examined</AlertTitle>
      youl receive a confirmation email of subscription very shortly, if you are
      an authorized member you will receive another email ginving you access to
      the app, Thank you for your patience.
    </Alert>
  );

  // ==============================================================

  return (
    <div>
      {alerto &&
        status !== "authorized" &&
        status !== undefined &&
        status !== "manager" &&
        authorization}
      <div className="">
        <h1 style={{ marginTop: 20, fontFamily: "initial", letterSpacing: 3 }}>
          WasteWater Treatment Plant Project Of SAFI
        </h1>
        <h2
          style={{
            letterSpacing: 5,
            fontFamily: "initial",
            fontSize: 25,
            textDecoration: "underline",
          }}
        >
          Quality Control Department
        </h2>
        <div
          className="registerContainer"
          style={{ marginRight: 400, marginTop: -130 }}
        >
          <form className="logingForm" onSubmit={handleSubmit}>
            <div className="labelInputLogin">
              <label htmlFor="email" className="formlabel">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="formInput"
                ref={emailRef}
              />{" "}
            </div>
            <div className="labelInputLogin">
              <label htmlFor="password" className="formlabel">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="formInput"
                ref={passwordRef}
              />{" "}
            </div>
            <div className="loginButtons">
              <button type="submit" className="loginButton">
                Login
              </button>
              <button
                type="button"
                className="loginButton google"
                onClick={LoginGoogle}
              >
                Login with Google
              </button>
            </div>

            {status !== "unauthorized" && (
              <p className="linktoForgot">
                <Link
                  to="/reset-password"
                  className="linkto"
                  style={{
                    color: "#dcebee",
                    fontWeight: 700,
                    fontSize: 18,
                  }}
                >
                  Forgot password ?
                </Link>
              </p>
            )}
            <p
              className="loginQuestion"
              style={{
                color: "#caf042",
                fontWeight: 700,
                fontSize: 18,
                marginTop: 5,
              }}
            >
              Don't have an account ?{" "}
              <Link to="/register" className="linkto">
                SignUp
              </Link>
            </p>
          </form>{" "}
          {err && <p className="errorMessageLogin">{err.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
