import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  getAuthData,
  loginUser,
  updateError,
} from "../../state/reducers/authSlice";
import NavBar from "../Navbar/navbar";
import "./login.css";
import { provider } from "../../firebase";
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

const Login = () => {
  const [promises, setpromises] = useState<any>();

  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { err } = useAppSelector(getAuthData);

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
    }
  };

  const LoginGoogle = () => {
    dispatch(loginUser({ email: "", password: "", provider: provider }));
  };
  // ==============================================================

  return (
    <div>
      <NavBar />
      <div className="registerContainer">
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
          <div className="labelInput">
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

          <p className="linktoForgot">
            <Link to="/reset-password" className="linkto">
              Forgot password?
            </Link>
          </p>
          <p className="loginQuestion">
            Don't have an account?{" "}
            <Link to="/register" className="linkto">
              SignUp
            </Link>
          </p>
        </form>{" "}
        {err && <p className="errorMessage">{err.message}</p>}
      </div>
    </div>
  );
};

export default Login;
