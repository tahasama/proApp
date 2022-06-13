import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { itnData, uploadPdfFile } from "../../../state";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { AppDispatch } from "../../../state/store";

const UploadItn = ({ handleClose }: any) => {
  const { individualItn } = useAppSelector(itnData);
  

  const dispatch = useAppDispatch();
  const pdfRef = useRef<any>(null);
  const [error, setError] = useState(false);

  const upload = async (e: any) => {
    e.preventDefault();
    if (pdfRef.current.files[0] !== undefined) {
      const imgUrl = URL.createObjectURL(pdfRef.current.files[0]);
      console.log("MY PDF FILE", pdfRef.current.files[0].name);
      const value = {
        itnId: individualItn._id,
        pdf: pdfRef.current.files[0],
      };
      dispatch(uploadPdfFile(value));
      // dispatch(
      //   updateItn({
          
      //   })
      // ),
      // dispatch(
      //   newUserImage({
      //     userimage: imgUrl,
      //   })
      // );
      //   dispatch(
      //     newImage({
      //       image: imgUrl,
      //     })
      //   );

      //   dispatch(cancelState({ cancelImage: false }));
      handleClose();
    } else {
      setError(true);
      //   dispatch(cancelState({ cancelImage: true }));
    }
  };
  return (
    <div>
      <label htmlFor="file-upload" className="imageUpload">
        Browse Image
      </label>
      <input id="file-upload" ref={pdfRef} type="file" />

      <button onClick={upload} className="imageUpload upload xx">
        <span className="uploadText">Upload</span>
      </button>
      <button
        className="imageUpload upload xy"
        // onClick={() => dispatch(cancelState({ cancelImage: false }))}
      >
        <span className="uploadText"> Cancel</span>
      </button>
      {error && (
        <p className="errorMessage">please add an image before uploading!</p>
      )}
    </div>
  );
};

export default UploadItn;
