import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  getAuthData,
  getUser,
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
import FullPlan from "../fullPlan/fullPlan";

const Login = () => {
  const [promises, setpromises] = useState<any>();
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { err } = useAppSelector(getAuthData);
  const [alerto, setAlerto] = useState(true);
  const firstRenderRef = useRef(false);
  const { user, status, uid, newstatus, email } = useAppSelector(getAuthData);
  console.log("statussss in login page", status);
  console.log("NEWstatussss in login page", newstatus);
  console.log("UID in login page", uid);
  console.log("EMAIL in login page", email);

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
      dispatch(updateStatus("unauthorized"));
    }
  };

  const LoginGoogle = (e: any) => {
    e.preventDefault();

    dispatch(loginUser({ email: "", password: "", provider: provider }));
    setTimeout(() => {
      dispatch(updateStatus("unauthorized"));
    }, 5000);
  };

  // useEffect(() => {
  //   if (firstRenderRef.current === false) {
  //     (status === "unauthorized" || newstatus === "unauthorized") &&
  //       setTimeout(() => {
  //         signOut(auth);
  //       }, 5000);
  //     return () => {
  //       firstRenderRef.current = true;
  //     };
  //   }
  // }, [status, newstatus, auth]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     // After 3 seconds set the show value to false
  //     setAlerto(false);
  //   }, 5000);
  //   return setAlerto(true);
  // }, [status]);

  // const authorization = (
  //   <Alert
  //     severity="success"
  //     style={{ alignItems: "center", justifyContent: "center" }}
  //   >
  //     <AlertTitle>Your inscription will be examined</AlertTitle>
  //     if you are an authorized member youwill receive an email very shortly ,
  //     ginving you access to the app, Thank you for your patience
  //   </Alert>
  // );

  // ==============================================================

  return (
    <div>
      {!user ||
      (user && status === "unauthorized") ||
      newstatus === "unauthorized" ? (
        <div className="">
          {/* <NavBar /> */}
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
      ) : (
        <FullPlan />
      )}
    </div>
  );
};

export default Login;