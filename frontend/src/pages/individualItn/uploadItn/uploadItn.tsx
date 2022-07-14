import { useRef, useState } from "react";
import { itnData, uploadPdfFile } from "../../../state";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import CircularProgress from "@mui/material/CircularProgress";

const UploadItn = ({ handleClose }: any) => {
  const { individualItn } = useAppSelector(itnData);

  const dispatch = useAppDispatch();
  const pdfRef = useRef<any>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const upload = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    if (pdfRef.current.files[0] !== undefined) {
      const value = {
        itnValues: individualItn,
        pdf: pdfRef.current.files[0],
      };
      dispatch(uploadPdfFile(value));

      setTimeout(() => {
        handleClose();
        setLoading(false);
      }, 2000);
    } else {
      setError(true);
    }
  };
  return (
    <div>
      <label htmlFor="file-upload" className="imageUpload">
        Browse Image
      </label>
      <input id="file-upload" ref={pdfRef} type="file" />

      <button onClick={upload} className="imageUpload upload xx">
        {loading && <CircularProgress color="secondary" />}
        <span className="uploadText">Upload</span>
      </button>
      <button className="imageUpload upload xy">
        <span className="uploadText"> Cancel</span>
      </button>
      {error && (
        <p className="errorMessage">please add an image before uploading!</p>
      )}
    </div>
  );
};

export default UploadItn;
