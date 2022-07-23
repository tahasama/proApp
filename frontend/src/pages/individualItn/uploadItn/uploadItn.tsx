import { useRef, useState } from "react";
import { getItn, itnData, uploadPdfFile } from "../../../state";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";

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
        <p style={{ fontWeight: 500 }}> Browse Files</p>
      </label>
      <i>ITN </i>
      <input id="file-upload" ref={pdfRef} type="file" />

      <Button
        onClick={upload}
        className="imageUpload upload xx"
        variant="contained"
        style={{ marginLeft: 300, position: "relative", top: 10 }}
      >
        {loading && <CircularProgress color="secondary" />}
        <span className="uploadText">Upload</span>
      </Button>
      {error && (
        <p className="errorMessage">please add an image before uploading!</p>
      )}
    </div>
  );
};

export default UploadItn;
