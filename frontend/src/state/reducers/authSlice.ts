import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";

const USER_URL: any = process.env.REACT_APP_PROJECT_URL_USER;

interface valueProps {
  email: string;
  password: string;
  provider?: GoogleAuthProvider;
  useremail?: string;
  username?: string;
  userimage?: string;
}

export const registerUser = createAsyncThunk(
  "registerUser",
  async ({ email, password }: valueProps) => {
    console.log("USER_URL", USER_URL);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const object = {
        email: res.user.email,
        uid: res.user.uid,
        displayNmae: res.user.displayName,
      };
      await axios.post(USER_URL, object);

      return res.user;
    } catch (error: any) {
      return error;
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ email, password, provider }: valueProps) => {
    if (provider) {
      try {
        const res = await signInWithPopup(auth, provider);
        try {
          const reso = await axios.post(USER_URL, {
            email: res.user.email,
            uid: res.user.uid,
            displayName: res.user.displayName,
          });
          return reso;
        } catch (error) {}
        return res.user;
      } catch (error: any) {
        return error;
      }
    } else {
      try {
        console.log("nnnnnnnnnnnnnnnnnnn");

        const res = await signInWithEmailAndPassword(auth, email, password);
        console.log("fffffffffffffff", res);

        return res.user;
      } catch (error: any) {
        return error;
      }
    }
  }
);

export const resetPasswordo: any = createAsyncThunk(
  "resetPasswordo",
  async (email: string) => {
    console.log("USER_URL", USER_URL);
    try {
      console.log("email", email);
      const res = await sendPasswordResetEmail(auth, email);
      console.log("res", res);
    } catch (error: any) {
      return error;
    }
  }
);

export interface userProps {
  authUser: {
    uid: string;
    email: string;
    password: string;
    confirmPassword: string;
    err: { code: string; message: string };
    user: any;
    displayName: any;
  };
}

export const userInitialState = {
  uid: "",
  email: "",
  password: "",
  confirmPassword: "",
  err: { code: "", message: "" },
  user: "",
  displayName: "",
};

export const authSlice = createSlice({
  name: "user-redux",
  initialState: userInitialState,
  reducers: {
    updateError: (state, action) => {
      state.err.message = action.payload;
      //   state.error.code = action.payload;
    },
    saveUser: (state, action) => {
      state.email = action.payload?.email;
      state.uid = action.payload?.uid;
      state.user = action.payload;
    },
    resetUser: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action: any) => {
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.err.code = action.payload.code;
      state.err.message = action.payload.message;
    });

    builder.addCase(loginUser.fulfilled, (state, action: any) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.err.code = action.payload.code;
      state.err.message = action.payload.message;
    });
  },
});

export const getAuthData = (state: userProps) => state.authUser;
export const { updateError, saveUser, resetUser } = authSlice.actions;
export default authSlice.reducer;
