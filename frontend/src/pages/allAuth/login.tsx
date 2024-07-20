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
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";

const Login = () => {
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { err } = useAppSelector(getAuthData);
  const [alerto, setAlerto] = useState(true);
  const { status, uid, user } = useAppSelector(getAuthData);
  console.log("🚀 ~ file: login.tsx:27 ~ Login ~ user:", user);
  // console.log("rrrrrrrrr", user.email);
  useEffect(() => {
    dispatch(getUser(uid));
    uid && navigate("/fullPlan");
  }, [uid]);

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

  return (
    <Box
      textAlign="center"
      mt={4}
      fontFamily="Roboto, Arial, sans-serif"
      color="rgba(185, 240, 240, 0.75)"
    >
      <Box mx="auto" p={0} maxWidth="800px" width="90vw">
        <Typography fontSize={{ xs: 24, md: 28 }} gutterBottom>
          Streamline Your Construction Projects with Our Data Management App!
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
                <Typography sx={{ mt: 1 }}>
                  <Link to="/reset-password" style={{ color: "#1589cf" }}>
                    Forgot password?
                  </Link>
                </Typography>
                <Typography sx={{ mt: 1 }} color={"#bdbdbd"}>
                  Don't have an account?{" "}
                  <Link to="/register" style={{ color: "white" }}>
                    Sign Up
                  </Link>
                </Typography>
              </form>
              {err && (
                <Typography
                  variant="body1"
                  sx={{
                    color: "red", // Set the text color to red
                    fontSize: "16px", // Adjust the font size
                    marginTop: "8px", // Add some top margin for spacing
                    // You can add more CSS properties here as needed
                  }}
                >
                  {err.message}
                </Typography>
              )}
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
                Why Choose Our App?
              </Typography>
              <ul
                style={{
                  listStyleType: "none",
                  padding: 0,
                  color: "#e1f5fe",
                  textAlign: "left",
                }}
              >
                <li>
                  <Typography variant="body1" lineHeight={2}>
                    <strong>Adaptability:</strong> Effortlessly adjust to any
                    project scale or type.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" lineHeight={2}>
                    <strong>Efficiency:</strong> Simplify data management, focus
                    on completing projects on time and within budget.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" lineHeight={2}>
                    <strong>Real-Time Insights:</strong> Stay informed with
                    up-to-date data and analytics.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" lineHeight={2}>
                    <strong>Security:</strong> Top-notch measures to keep your
                    information safe.
                  </Typography>
                </li>
              </ul>
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

export default Login;
