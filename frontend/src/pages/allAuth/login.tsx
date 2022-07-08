import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  getAuthData,
  loginUser,
  updateError,
  updateStatus,
} from "../../state/reducers/authSlice";
import NavBar from "../Navbar/navbar";
import "./login.css";
import { auth, provider } from "../../firebase";
import firebase, { storage } from "../../firebase";
import JSZip from "jszip";
import * as FileSaver from "file-saver";
import { useState } from "react";
import {
  getDownloadURL,
  getMetadata,
  getStorage,
  listAll,
  ref,
} from "firebase/storage";
import folder from "material-ui/svg-icons/file/folder";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { signOut } from "firebase/auth";

const Login = () => {
  const [promises, setpromises] = useState<any>();
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { err } = useAppSelector(getAuthData);
  const [alerto, setAlerto] = useState(true);
  const { user, status, uid, newstatus } = useAppSelector(getAuthData);
  console.log("statussss in login page", status);
  console.log("NEWstatussss in login page", newstatus);
  console.log("UID in login page", uid);

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
      dispatch(updateStatus("unauthorized"));
    }
  };

  const LoginGoogle = (e: any) => {
    e.preventDefault();

    dispatch(loginUser({ email: "", password: "", provider: provider }));
    dispatch(updateStatus("unauthorized"));
  };

  useEffect(() => {
    console.log("her ya go", status, "also", alerto);
    setAlerto(true);

    (status === "unauthorized" || newstatus === "unauthorized" || uid) &&
      setTimeout(() => {
        signOut(auth);
        setAlerto(false);
      }, 3000);
  }, [status, newstatus, setAlerto]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     // After 3 seconds set the show value to false
  //     setAlerto(false);
  //   }, 5000);
  //   return setAlerto(true);
  // }, [status]);

  const authorization = (
    <Alert
      severity="success"
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <AlertTitle>Your inscription was a success</AlertTitle>
      if you are an authorized member youwill receive an email very shortly ,
      ginving you access to the app, Thank you for your patience
    </Alert>
  );

  // ==============================================================

  return (
    <div>
      <div className="">
        {/* <NavBar /> */}
        <>
          {alerto &&
          (newstatus === "unauthorized" ||
            (uid && status === "unauthorized") ||
            uid) ? (
            authorization
          ) : (
            <p></p>
          )}
        </>
        <div className="registerContainer" style={{ marginRight: 400 }}>
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
