import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useRef, useState } from "react";
import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import { Stack, TextField } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import SendIcon from "@mui/icons-material/Send";
import { Input } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../state/hooks";

import SelectStuffQOR from "./selectStuffQOR/selectStuffQOR";
import {
  createQorNcr,
  getAllQorNcrs,
  QorNcrData,
  updateQorNcr,
  UpdateSelectedBox,
  uploadImages1,
  uploadImages2,
} from "../../../../state/reducers/qorNcrSlice";
import CircularProgress from "@mui/material/CircularProgress";

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

export default function ModalM() {
  const [open, setOpen] = React.useState(false);
  const imageRef1 = useRef<any>(null);
  const imageRef2 = useRef<any>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useAppDispatch();
  const { newStatus, individualQorNcr, selectedBox } =
    useAppSelector(QorNcrData);
  const [value, setValue] = React.useState<Date | null>(new Date());
  const [value2, setValue2] = React.useState<Date | null>(null);

  const [loading, setLoading] = useState(false);

  const inputRefNum = React.useRef<any>(null);
  const inputRefDescription = React.useRef<any>(null);

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };
  const handleChange2 = (newValue: Date | null) => {
    setValue2(newValue);
  };

  const upload = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    const value1 = {
      qorncrId: individualQorNcr._id,
      qorncrId1: "r-" + individualQorNcr._id,
      image1: imageRef1.current.files[0],
    };

    dispatch(uploadImages1(value1));

    const value2 = {
      qorncrId: individualQorNcr._id,
      qorncrId2: "a-" + individualQorNcr._id,
      image2: imageRef2.current.files[0],
    };

    dispatch(uploadImages2(value2));

    setTimeout(() => {
      dispatch(UpdateSelectedBox(""));
      setLoading(false);
    }, 2000);
  };
  return (
    <div>
      {" "}
      <Button
        variant="outlined"
        color="success"
        size="large"
        style={{ borderColor: "#00d4ff", color: "#00d4ff" }}
        className=""
        onClick={handleOpen}
      >
        {selectedBox === "" ? (
          <span>Add an QOR</span>
        ) : (
          <span>Update selected</span>
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
            <p
              style={{
                color: "black",
                fontWeight: 500,
                marginBottom: 20,
                marginTop: -10,
              }}
            >
              Please complete the following informations :{" "}
            </p>
            <div>
              <SelectStuffQOR individualQorNcr={individualQorNcr} />
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
                    inputFormat="MM/DD/yyyy"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
            <div style={{ marginTop: 12, marginBottom: 12 }}>
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
              </LocalizationProvider>{" "}
            </div>
            {individualQorNcr._id && (
              <div>
                <label htmlFor="file-upload">
                  <label
                    htmlFor="report"
                    style={{ color: "black", fontWeight: 500 }}
                  >
                    Upload QOR &nbsp;&nbsp;
                  </label>
                  <input
                    id="file-upload"
                    name="report"
                    ref={imageRef1}
                    type="file"
                  />
                  <br />
                  <label
                    htmlFor="report"
                    style={{ color: "black", fontWeight: 500 }}
                  >
                    Upload action
                  </label>
                  <input
                    id="file-upload"
                    name="report"
                    ref={imageRef2}
                    type="file"
                  />
                </label>
                <Button
                  onClick={upload}
                  variant="contained"
                  style={{ marginTop: 5, position: "relative", top: 40 }}
                >
                  {loading && <CircularProgress color="secondary" />}
                  <span>Upload</span>
                </Button>
              </div>
            )}
            <div
              onClick={() => (
                selectedBox !== ""
                  ? dispatch(
                      updateQorNcr({
                        _id: individualQorNcr._id,
                        typeR: "QOR",
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
                        typeR: "QOR",
                        numR: inputRefNum.current.value,
                        dateRaised: value,
                        dateOfResponse: value2,
                        description: inputRefDescription.current.value,
                        status: newStatus,
                        image2Url: "",
                        image1Url: "",
                      })
                    ),
                setTimeout(() => {
                  dispatch(getAllQorNcrs());
                  dispatch(UpdateSelectedBox(""));
                }, 1000),
                handleClose()
              )}
            >
              <Button
                variant="outlined"
                endIcon={<SendIcon />}
                style={{ position: "relative", left: 200 }}
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
