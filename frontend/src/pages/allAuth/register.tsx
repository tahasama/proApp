import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { provider } from "../../firebase";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  getAuthData,
  loginUser,
  registerUser,
  updateError,
  updateStatus,
} from "../../state/reducers/authSlice";

import "./register.css";

const Register: React.FC = () => {
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const passwordConfirmRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { uid, err } = useAppSelector(getAuthData);

  if (err.code === "auth/weak-password") {
    dispatch(updateError("Password should be at least 6 characters"));
  } else if (err.code === "auth/email-already-in-use") {
    dispatch(updateError("Email already taken, please add a different one"));
  } else if (err.code === "auth/network-request-failed") {
    dispatch(
      updateError(
        "Please make sure, you have internet connection, and try again"
      )
    );
  } else if (err.code === "auth/invalid-email") {
    dispatch(updateError("Please provide a valid email"));
  } else if (err.code === "auth/internal-error") {
    dispatch(updateError("Please provide a valid passwords"));
  } else if (
    err.code === "storage/object-not-found" ||
    err.code === "auth/popup-closed-by-user"
  ) {
    dispatch(updateError(""));
  }
  useEffect(() => {
    if (uid) {
      setTimeout(() => {
        navigate("/");
      }, 15000);
    }
    dispatch(updateError(""));
  }, [uid, dispatch, navigate]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      dispatch(updateError("Passwords do not match, please try again"));
    } else {
      try {
        dispatch(updateError(""));
        setLoading(true);
        dispatch(
          registerUser({
            email: emailRef.current.value,
            password: passwordRef.current.value,
            status: "unauthorized",
          })
        );

        setLoading(false);
        dispatch(updateStatus("unauthorized"));
      } catch (err) {
        dispatch(updateError("failed to create account, please try again"));
      }
    }
  };

  const LoginGoogle = (e: any) => {
    e.preventDefault();

    dispatch(loginUser({ email: "", password: "", provider: provider }));
    dispatch(updateStatus("unauthorized"));
  };
  return (
    <div className="ddd">
      <div className="registerContainer">
        <form className="registerForm" onSubmit={handleSubmit}>
          <div className="labelInput">
            <label
              htmlFor="email"
              className="formlabel"
              style={{ fontWeight: 500, fontSize: 18 }}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              className="formInput"
              ref={emailRef}
            />
          </div>
          <div className="labelInput">
            <label
              htmlFor="password"
              className="formlabel"
              style={{ fontWeight: 500, fontSize: 18 }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className="formInput"
              ref={passwordRef}
            />
          </div>
          <div className="labelInput">
            <label
              htmlFor="passwordConfirmation"
              className="formlabel"
              style={{ fontWeight: 500, fontSize: 18 }}
            >
              Password Confirmation
            </label>
            <input
              type="password"
              name="passwordConfirmation"
              className="formInput"
              ref={passwordConfirmRef}
            />
          </div>

          <div className="loginButtons">
            <button disabled={loading} type="submit" className="login-button">
              Register
            </button>
            <button
              type="button"
              className="login-button"
              style={{ backgroundColor: "red" }}
              onClick={LoginGoogle}
            >
              Sign Up with Google
            </button>
          </div>

          <p className="question" style={{ fontWeight: 500, fontSize: 18 }}>
            Already have an account?{" "}
            <Link to="/" className="linkto">
              Login
            </Link>
          </p>
        </form>
        {err && <p className="errorMessageRegister">{err.message}</p>}
      </div>
    </div>
  );
};

export default Register;
