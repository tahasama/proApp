import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { itnData, uploadImage } from "../../../state";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { AppDispatch } from "../../../state/store";

const UploadItn = ({ handleClose }: any) => {
  const { individualItn } = useAppSelector(itnData);

  const dispatch = useAppDispatch();
  const imageRef = useRef<any>(null);
  const [error, setError] = useState(false);

  const upload = async (e: any) => {
    e.preventDefault();
    if (imageRef.current.files[0] !== undefined) {
      const imgUrl = URL.createObjectURL(imageRef.current.files[0]);
      console.log("MY PDF FILE", imageRef.current.files[0].name);
      const value = {
        itnId: individualItn._id,
        pdf: imageRef.current.files[0],
      };
      dispatch(uploadImage(value));
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
      <input id="file-upload" ref={imageRef} type="file" />

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
