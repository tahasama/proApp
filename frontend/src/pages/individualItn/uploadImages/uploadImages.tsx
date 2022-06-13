import React, { useReducer, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {  itnData, uploadImages } from "../../../state";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { AppDispatch } from "../../../state/store";

const UploadImages = ({ handleClose }: any) => {
  const { individualItn } = useAppSelector(itnData);
  

  const dispatch = useAppDispatch();
  const imageRef1 = useRef<any>(null);
  const imageRef2 = useRef<any>(null);
  const [error, setError] = useState(false);




  const upload = async (e: any) => {
    e.preventDefault();
   
    // if (imageRef.current.files[0] !== undefined || imageRef1.current.files[0] !== undefined) {
    //   const imgUrl = URL.createObjectURL(imageRef.current.files[0]);
    console.log("MY IMAGE1", imageRef1.current.files[0]);
    console.log("MY IMAGE2", imageRef2.current.files[0]);
      const value = {
        itnId:individualItn._id,
         itnId1: '1-'+individualItn._id,
        itnId2: '2-'+individualItn._id,
         image1: imageRef1.current.files[0],
        image2: imageRef2.current.files[0],
      };
      dispatch(uploadImages(value));
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
//     } else {
//       setError(true);
//       //   dispatch(cancelState({ cancelImage: true }));
//     } 
   };
  return (
    <div>
      <label htmlFor="file-upload" className="imageUpload">
        Browse Image
      </label>
      <input id="file-upload" ref={imageRef1} type="file" />
      <input id="file-upload" ref={imageRef2} type="file" />

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

export default UploadImages;
