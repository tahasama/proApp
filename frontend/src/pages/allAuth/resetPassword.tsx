import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  getAuthData,
  resetPasswordo,
  updateError,
} from "../../state/reducers/authSlice";
import NavBar from "../Navbar/navbar";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const emailRef = useRef<any>(null);
  const navigate = useNavigate();
  const { err } = useAppSelector(getAuthData);
  console.log("🚀 ~ file: resetPassword.tsx:17 ~ ResetPassword ~ err:", err);

  useEffect(() => {
    if (err.code === "auth/missing-email") {
      dispatch(updateError("please add an email."));
    }
    if (err.code === "auth/invalid-email") {
      dispatch(updateError("please add a valid email."));
    }
    if (err.code === "auth/user-not-found") {
      dispatch(updateError("Wrong email, please try again"));
    } else if (err.code === "storage/object-not-found") {
      dispatch(updateError(""));
    }
    return () => {
      dispatch(updateError(""));
    };
  }, [err.code, dispatch]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      dispatch(updateError(""));
      dispatch(resetPasswordo(emailRef.current.value));
      !err && navigate(-1);
    } catch (err) {
      dispatch(updateError("failed to reset password, please try again"));
    }
  };
  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        mt: 18,
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={3}
        sx={{
          mt: 8,
          p: 3,
          borderRadius: 10,
          backgroundColor: "rgba(96, 48, 150, 0.35)",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
          maxWidth: "400px", // Limit the maximum width of the form
          mx: "auto", // Center the form horizontally
        }}
      >
        <Typography variant="h5" color="primary.light" gutterBottom>
          Reset Your Password
        </Typography>
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
        <Button variant="contained" type="submit" color="primary">
          Reset
        </Button>

        <Typography
          sx={{
            fontWeight: 500,
            fontSize: 18,
            textAlign: "center",
            p: 2,
          }}
        >
          <Link to="/register" style={{ color: "Highlight" }}>
            SignUp / SignIn
          </Link>
        </Typography>
      </Paper>
      {err && (
        <Typography
          variant="body1"
          sx={{
            color: "red",
            fontSize: "16px",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          {err.message}
        </Typography>
      )}
    </Box>
  );
};
export default ResetPassword;
