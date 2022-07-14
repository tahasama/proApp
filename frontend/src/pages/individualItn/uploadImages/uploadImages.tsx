import { useRef, useState } from "react";
import { itnData, uploadImage1, uploadImage2 } from "../../../state";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

const UploadImages = ({ handleClose }: any) => {
  const { individualItn } = useAppSelector(itnData);

  const dispatch = useAppDispatch();
  const imageRef1 = useRef<any>(null);
  const imageRef2 = useRef<any>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const upload = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const value1 = {
      itnId: individualItn._id,
      itnId1: "1-" + individualItn._id,
      image1: imageRef1.current.files[0],
    };
    dispatch(uploadImage1(value1));
    const value2 = {
      itnId: individualItn._id,
      itnId2: "2-" + individualItn._id,
      image2: imageRef2.current.files[0],
    };
    dispatch(uploadImage2(value2));

    setTimeout(() => {
      handleClose();
      setLoading(false);
    }, 2000);
  };
  return (
    <div>
      <label htmlFor="file-upload" className="imageUpload">
        <p style={{ fontWeight: 500 }}> Browse Images</p>
      </label>
      <i>image1 </i>
      <input id="file-upload" ref={imageRef1} type="file" />
      <br />
      <i>image2 </i>
      <input id="file-upload" ref={imageRef2} type="file" />
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

export default UploadImages;
