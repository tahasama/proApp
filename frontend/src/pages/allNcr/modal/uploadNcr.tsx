import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getQorNcr,
  QorNcrData,
  uploadImages,
} from "../../../state/reducers/qorNcrSlice";

const UploadNcr = ({ handleClose, selected }: any) => {
  const { individualQorNcr } = useAppSelector(QorNcrData);

  const dispatch = useAppDispatch();
  const imageRef1 = useRef<any>(null);
  const imageRef2 = useRef<any>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     dispatch(getQorNcr(selected.selected))
  //   }, [])

  console.log("dasdasdasdasdasdasd", selected.slected);
  const upload = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const value = {
      qorncrId: individualQorNcr._id,
      qorncrId1: "1-" + individualQorNcr._id,
      qorncrId2: "2-" + individualQorNcr._id,
      image1: imageRef1.current.files[0],
      image2: imageRef2.current.files[0],
    };
    dispatch(uploadImages(value));
    // dispatch(
    //   updateqorncr({

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
    setTimeout(() => {
      handleClose();
      setLoading(false);
    }, 2000);

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
        {loading && <CircularProgress color="secondary" />}
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

export default UploadNcr;
