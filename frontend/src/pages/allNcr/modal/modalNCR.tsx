import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useEffect, useRef } from "react";
import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import { Stack, TextField } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import SendIcon from "@mui/icons-material/Send";
// import "./modalM.css";
import { Input } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";

import SelectStuffNCR from "./selectStuffNCR/selectStuffNCR";
import {
  createQorNcr,
  getAllQorNcrs,
  getQorNcr,
  QorNcrData,
  updateQorNcr,
  uploadImages,
} from "../../../state/reducers/qorNcrSlice";
import UploadNcr from "./uploadNcr";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalM(selected: any) {
  const [open, setOpen] = React.useState(false);
  const imageRef1 = useRef<any>(null);
  const imageRef2 = useRef<any>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useAppDispatch();
  const { newStatus, individualQorNcr } = useAppSelector(QorNcrData);
  const [value, setValue] = React.useState<Date | null>(new Date());
  const [value2, setValue2] = React.useState<Date | null>(new Date());

  const inputRefNum = React.useRef<any>(null);
  const inputRefDescription = React.useRef<any>(null);

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };
  const handleChange2 = (newValue: Date | null) => {
    setValue2(newValue);
  };
  // const handleUpload = () => {
  //   dispatch(deleteQorNcr(selected));
  // };
  const upload = async (e: any) => {
    e.preventDefault();
    // setLoading(true);
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
    // setTimeout(() => {
    //   handleClose();
    //   // setLoading(false);
    // }, 2000);

    //     } else {
    //       setError(true);
    //       //   dispatch(cancelState({ cancelImage: true }));
    //     }
  };
  return (
    <div>
      <Button
        variant="outlined"
        color="success"
        size="large"
        className="createButtons"
        onClick={handleOpen}
      >
        {selected.selected === "" ? (
          <span>Add a value</span>
        ) : (
          <span>update selected</span>
        )}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <p>Please complete the following informations : </p>
            <div>
              <SelectStuffNCR individualQorNcr={individualQorNcr} />
            </div>
            <div style={{ marginTop: 12 }}>
              <Input
                type="text"
                defaultValue={individualQorNcr.numR}
                inputRef={inputRefNum}
                color="success"
                placeholder="Number"
                name="wooow"
              />
            </div>{" "}
            <div style={{ marginTop: 12 }}>
              <TextField
                id="outlined-textarea"
                label="Description"
                placeholder="Add a description..."
                multiline
                rows={3}
                fullWidth={true}
                defaultValue={individualQorNcr.description}
                inputRef={inputRefDescription}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <Stack spacing={3}>
                  <MobileDatePicker
                    label="Date raised"
                    inputFormat="MM/dd/yyyy"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
            <div style={{ marginTop: 12 }}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <Stack spacing={3}>
                  <MobileDatePicker
                    label="Date of response"
                    inputFormat="MM/dd/yyyy"
                    value={value2}
                    onChange={handleChange2}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
              <div>
                <label htmlFor="file-upload" className="imageUpload">
                  Browse Image
                </label>
                <input id="file-upload" ref={imageRef1} type="file" />
                <input id="file-upload" ref={imageRef2} type="file" />

                <button onClick={upload} className="imageUpload upload xx">
                  {/* {loading && <CircularProgress color="secondary" />} */}
                  <span className="uploadText">Upload</span>
                </button>
                <button
                  className="imageUpload upload xy"
                  // onClick={() => dispatch(cancelState({ cancelImage: false }))}
                >
                  <span className="uploadText"> Cancel</span>
                </button>
                {/* {error && (
        <p className="errorMessage">please add an image before uploading!</p>
      )} */}
              </div>
            </div>
            <div
              onClick={() => (
                selected.selected !== ""
                  ? dispatch(
                      updateQorNcr({
                        _id: individualQorNcr._id,
                        typeR: "NCR",
                        numR: inputRefNum.current.value,
                        dateRaised: value,
                        dateOfResponse: value2,
                        description: inputRefDescription.current.value,
                        status: newStatus,
                        image1Url: imageRef1.current.files[0],
                        image2Url: imageRef2.current.files[0],
                      })
                    )
                  : dispatch(
                      createQorNcr({
                        typeR: "NCR",
                        numR: inputRefNum.current.value,
                        dateRaised: value,
                        dateOfResponse: value2,
                        description: inputRefDescription.current.value,
                        status: newStatus,
                      })
                    ),
                setTimeout(() => {
                  dispatch(getAllQorNcrs());
                }, 1000),
                handleClose()
              )}
            >
              <Button
                variant="outlined"
                endIcon={<SendIcon />}
                style={{ marginTop: 12 }}
                size="large"
              >
                Send
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
