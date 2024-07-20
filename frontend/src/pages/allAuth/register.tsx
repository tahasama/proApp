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
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";

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
    console.log(
      "ddddddddddddd",
      emailRef.current.value,
      "kkkkkkkkkkk",
      passwordRef.current.value
    );
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

  const handleSubmitRegister = async (e: any) => {
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
    <Box
      textAlign="center"
      mt={4}
      fontFamily="Roboto, Arial, sans-serif"
      color="rgba(185, 240, 240, 0.75)"
    >
      <Box mx="auto" p={0} maxWidth="800px" width="90vw">
        <Typography fontSize={{ xs: 24, md: 28 }} gutterBottom>
          Streamline Your Construction Projects with Our Data Management App
        </Typography>

        <Typography
          variant="body1"
          sx={{
            height: "20px",
            color: "red", // Set the text color to red
            fontSize: "16px", // Adjust the font size
            marginTop: "8px", // Add some top margin for spacing
            // You can add more CSS properties here as needed
          }}
        >
          {err && err.message}
        </Typography>

        <Box
          component="div"
          display="grid"
          gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
          gap={{ xs: 8, sm: 3 }}
          mt={6}
        >
          <Box order={{ xs: 1, md: 2 }}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 10,
                backgroundColor: "rgba(96, 48, 150, 0.35)",
                height: "100%",
              }}
            >
              <Typography variant="h5" color="primary.light" gutterBottom>
                Join Us Today!
              </Typography>
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
                onSubmit={handleSubmitRegister}
              >
                <TextField
                  fullWidth
                  label="Email"
                  variant="filled"
                  type="email"
                  size="small"
                  sx={{ mt: 1 }}
                  inputProps={{
                    style: {
                      border: "none",
                      paddingTop: 24,
                      paddingBottom: 16,
                      backgroundColor: "#9fa8da",
                    },
                  }} // Remove the border inside the input
                  inputRef={emailRef}
                />
                <TextField
                  fullWidth
                  label="Password"
                  variant="filled"
                  type="password"
                  size="small"
                  sx={{ mt: 1 }}
                  inputProps={{
                    style: {
                      border: "none",
                      paddingTop: 24,
                      paddingBottom: 16,
                      backgroundColor: "#9fa8da",
                    },
                  }} // Remove the border inside the input
                  inputRef={passwordRef}
                />

                <TextField
                  fullWidth
                  label="Password Confirmation"
                  variant="filled"
                  type="password"
                  size="small"
                  sx={{ mt: 1 }}
                  inputProps={{
                    style: {
                      border: "none",
                      paddingTop: 24,
                      paddingBottom: 16,
                      backgroundColor: "#9fa8da",
                    },
                  }} // Remove the border inside the input
                  inputRef={passwordConfirmRef}
                />

                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  sx={{ mt: 1 }}
                >
                  Register
                </Button>

                <Typography sx={{ mt: 1 }} color={"#bdbdbd"}>
                  Already have an account?{" "}
                  <Link to="/" style={{ color: "white" }}>
                    Home Page
                  </Link>
                </Typography>
              </form>
            </Paper>
          </Box>
          <Box order={{ xs: 2, md: 1 }}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 10,
                backgroundColor: "rgba(96, 48, 150, 0.35)",
                height: "100%",
              }}
            >
              <Typography variant="h5" color="primary.light" gutterBottom>
                Sign In!
              </Typography>
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "13px",
                }}
                onSubmit={handleSubmit}
              >
                <TextField
                  fullWidth
                  label="Email"
                  variant="filled"
                  type="email"
                  size="small"
                  sx={{ mt: 1 }}
                  inputProps={{
                    style: {
                      border: "none",
                      paddingTop: 24,
                      paddingBottom: 16,
                      backgroundColor: "#9fa8da",
                    },
                  }} // Remove the border inside the input
                  inputRef={emailRef}
                />
                <TextField
                  fullWidth
                  label="Password"
                  variant="filled"
                  type="password"
                  size="small"
                  sx={{ mt: 1 }}
                  inputProps={{
                    style: {
                      border: "none",
                      paddingTop: 24,
                      paddingBottom: 16,
                      backgroundColor: "#9fa8da",
                    },
                  }} // Remove the border inside the input
                  inputRef={passwordRef}
                />

                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  sx={{ mt: 1 }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 1 }}
                  onClick={LoginGoogle}
                >
                  Login with Google
                </Button>
                <Typography sx={{ mt: 0.5 }}>
                  <Link to="/reset-password" style={{ color: "#1589cf" }}>
                    Forgot password?
                  </Link>
                </Typography>
              </form>
            </Paper>
          </Box>
        </Box>
        <Typography mt={10}>
          Got questions? Contact us at{" "}
          <Link
            to="mailto:support@constructionapp.com"
            style={{ color: "#0ABAB5" }}
          >
            support@constructionapp.com
          </Link>{" "}
          or call (+212) XXX-0987.
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
