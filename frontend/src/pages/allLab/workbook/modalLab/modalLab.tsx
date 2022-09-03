import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useRef, useState } from "react";
import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import { Stack, TextField } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import CircularProgress from "@mui/material/CircularProgress";

import SendIcon from "@mui/icons-material/Send";
import { Input } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../state/hooks";
import {
  createLab,
  getAllLab,
  LabData,
  updateLab,
  UpdateSelectedBox,
  uploadImages1,
  uploadImages2,
} from "../../../../state/reducers/labSlice";
import SelectStuffLab from "./selectStuffLab/selectStuffLab";
import { useParams } from "react-router-dom";

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

export default function ModalLab() {
  const [open, setOpen] = React.useState(false);
  const imageRef1 = useRef<any>(null);
  const imageRef2 = useRef<any>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useAppDispatch();

  const { newLocation, newConcreteType, individualLab, selectedBox } =
    useAppSelector(LabData);
  const [value, setValue] = React.useState<Date | null>(new Date());
  const [loading, setLoading] = useState(false);
  const { book } = useParams();

  const inputRefNum = React.useRef<any>(null);
  const inputRefValueL1 = React.useRef<any>(null);
  const inputRefValueL2 = React.useRef<any>(null);
  const inputRefValueL3 = React.useRef<any>(null);
  const inputRefSubLocation = React.useRef<any>(null);

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  const upload = (e: any) => {
    e.preventDefault();

    setLoading(true);

    const value1 = {
      LabId: individualLab._id,
      LabId1: "pv-" + individualLab.numL,
      image1: imageRef1.current.files[0],
      typeL: individualLab.typeL,
      location: individualLab.location,
    };

    dispatch(uploadImages1(value1));

    const value2 = {
      LabId: individualLab._id,
      LabId2: "report-" + individualLab.numL + individualLab.dateL,
      image2: imageRef2.current.files[0],
      typeL: individualLab.typeL,
      location: individualLab.location,
    };

    dispatch(uploadImages2(value2));

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  console.log("in modal", newConcreteType, newLocation);

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
        {selectedBox === "" ? <span>Add </span> : <span>Update selected</span>}
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
            <div style={{ marginTop: 12 }}>
              <Input
                type="text"
                defaultValue={individualLab.numL}
                inputRef={inputRefNum}
                color="success"
                placeholder="Number"
                name="wooow"
              />
              <div>
                <SelectStuffLab individualLab={individualLab} />
              </div>
              <div style={{ marginTop: 12 }}>
                <Input
                  type="text"
                  defaultValue={individualLab.subLocation}
                  inputRef={inputRefSubLocation}
                  color="success"
                  placeholder="Sub Location"
                  name="wooow"
                />
              </div>{" "}
            </div>{" "}
            {(book === "Compression Strength 7 days" ||
              book === "Compression Strength 28 days") &&
              selectedBox !== "" && (
                <>
                  <div style={{ marginTop: 12 }}>
                    <Input
                      type="text"
                      inputRef={inputRefValueL1}
                      color="success"
                      placeholder="first value"
                      defaultValue={individualLab.valueL1}
                      name="wooow"
                    />
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <Input
                      type="text"
                      inputRef={inputRefValueL2}
                      color="success"
                      placeholder="second value"
                      defaultValue={individualLab.valueL2}
                      name="wooow"
                    />
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <Input
                      type="text"
                      defaultValue={individualLab.valueL3}
                      inputRef={inputRefValueL3}
                      color="success"
                      placeholder="third value"
                      name="wooow"
                    />
                  </div>
                </>
              )}
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
            {individualLab._id && (
              <div>
                <label htmlFor="file-upload">
                  <label
                    htmlFor="report"
                    style={{ color: "black", fontWeight: 500 }}
                  >
                    Upload manifold &nbsp;&nbsp;
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
                    Upload Report
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
                      updateLab({
                        _id: individualLab._id,
                        // typeL: newType,
                        typeL: book,
                        numL: inputRefNum.current.value,
                        dateL: value,
                        location: newLocation,
                        concreteType: newConcreteType,
                        subLocation: inputRefSubLocation.current.value,

                        valueL1:
                          (book === "Compression Strength 7 days" ||
                            book === "Compression Strength 28 days") &&
                          inputRefValueL1.current.value,
                        valueL2:
                          (book === "Compression Strength 7 days" ||
                            book === "Compression Strength 28 days") &&
                          inputRefValueL2.current.value,
                        valueL3:
                          (book === "Compression Strength 7 days" ||
                            book === "Compression Strength 28 days") &&
                          inputRefValueL3.current.value,
                        valueL4:
                          (book === "Compression Strength 7 days" ||
                            book === "Compression Strength 28 days") &&
                          (
                            (parseFloat(inputRefValueL1.current.value) +
                              parseFloat(inputRefValueL2.current.value) +
                              parseFloat(inputRefValueL3.current.value)) /
                            3
                          ).toFixed(2),
                        manifoldUrl: imageRef1.current.files[0],
                        reportUrl: imageRef2.current.files[0],
                      })
                    )
                  : dispatch(
                      createLab({
                        // typeL: newType,
                        typeL: book,
                        numL: inputRefNum.current.value,
                        dateL: value,
                        location: newLocation,
                        concreteType: newConcreteType,
                        subLocation: inputRefSubLocation.current.value,
                      })
                    ),
                setTimeout(() => {
                  dispatch(getAllLab());
                  dispatch(UpdateSelectedBox(""));
                }, 2000),
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
