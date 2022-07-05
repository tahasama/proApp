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
  const locations = [
    "secondaryClarifierP24",
    "secondaryClarifierP25",
    "secondaryClarifierP32",
    "PrimaryClarifierP7",
    "PrimaryClarifierP8",
    "PrimaryClarifierP9",
    "aerationTank",
  ];
  const routine = [
    "Setting Out",
    "Excavation until foundation Bottom",
    "Conduites Installation ",
    "Lean Concrete",
    "Mass Concrete",
    "Reinforcement & Formwork",
    "Concrete placing and finishing",
    "Curing",
    "Waterproofing coat",
    "Backfilling",
    "Treatement protection layer",
    "Concrete Tests",
  ];
  const DownloadFolders = async (): Promise<any> => {
    const jszip = new JSZip();
    const xxx: any = jszip.folder("All");
    const proms2 = locations
      .map(async (loca: any) => {
        const ccc: any = xxx.folder(`${loca}`);
        const proms1 = routine
          .map(async (rot: any) => {
            const jszip = new JSZip();
            const storage = getStorage();
            const folder = await listAll(ref(storage, `/itn/${loca}/${rot}`));
            const promises = folder.items
              .map(async (item) => {
                const file = await getMetadata(item);
                const fileRef = ref(storage, item.fullPath);
                const fileBlob = await getDownloadURL(fileRef).then(
                  async (url) => {
                    const response = await fetch(url);
                    return await response.blob();
                  }
                );

                ccc.file(rot + "/" + file.name, fileBlob);
              })
              .reduce((acc, curr) => acc.then(() => curr), Promise.resolve());

            await promises;
            const blob = await ccc.generateAsync({ type: "blob" });
          })
          .reduce((acc, curr) => acc.then(() => curr), Promise.resolve());
        await proms1;
      })
      .reduce((acc, curr) => acc.then(() => curr), Promise.resolve());
    await proms2;
    const blob = await xxx.generateAsync({ type: "blob" });
    FileSaver.saveAs(blob, `All.zip`);
  };
  return (
    <div>
      <NavBar />
      <div className="registerContainer">
        {/* <a href="gs://proapp-25ad0.appspot.com/">WoW</a> */}
        <button onClick={DownloadFolders}>OOOOOOOO</button>
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
