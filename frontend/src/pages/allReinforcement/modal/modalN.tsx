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
import { useAppDispatch, useAppSelector } from "../../../state/hooks";

import SelectStuffC from "./selectStuffR/selectStuffR";
import {
  createReinforcement,
  getAllReinforcements,
  ReinforcementData,
  updateReinforcement,
  UpdateSelectedBox,
  uploadImages,
} from "../../../state/reducers/reinforcementSlice";

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
  const [loading, setLoading] = useState(false);
  const imageRef = useRef<any>(null);
  const inputRefNum = React.useRef<any>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useAppDispatch();
  const {
    newLocation,
    newType,
    individualReinforcement,
    selectedBox,
    newReview,
  } = useAppSelector(ReinforcementData);
  const [value, setValue] = React.useState<Date | null>(new Date());

  const inputRef = React.useRef<any>(null);

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };
  const upload = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    const value = {
      reinforcementId: individualReinforcement._id,
      image: imageRef.current.files[0],
    };

    dispatch(uploadImages(value));
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="success"
        size="large"
        className=""
        style={{ borderColor: "#00d4ff", color: "#00d4ff" }}
        onClick={handleOpen}
      >
        {selectedBox === "" ? (
          <span>Add Value</span>
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
            <p>Please complete the following informations : </p>
            <div>
              <SelectStuffC />
            </div>
            <div style={{ marginTop: 12 }}>
              <Input
                type="text"
                defaultValue={individualReinforcement.numY}
                inputRef={inputRefNum}
                color="success"
                placeholder="Number"
                name="wooow"
              />
            </div>{" "}
            <div style={{ marginTop: 12 }}>
              <Input
                type="text"
                inputRef={inputRef}
                color="success"
                defaultValue={individualReinforcement.quantity}
                placeholder="add quantity"
                name="wooow"
              />
            </div>
            <div style={{ marginTop: 16 }}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <Stack spacing={3}>
                  <MobileDatePicker
                    label="Date"
                    inputFormat="MM/DD/yyyy"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
            {individualReinforcement._id && (
              <div style={{ marginTop: 10 }}>
                <label htmlFor="file-upload">
                  <label
                    htmlFor="report"
                    style={{ color: "black", fontWeight: 500 }}
                  >
                    Upload docs &nbsp;&nbsp;
                  </label>
                  <input
                    id="file-upload"
                    name="report"
                    ref={imageRef}
                    type="file"
                  />
                </label>
                <Button
                  onClick={upload}
                  variant="contained"
                  style={{
                    marginTop: 5,
                    position: "relative",
                    top: 10,
                    float: "left",
                  }}
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
                      updateReinforcement({
                        _id: individualReinforcement._id,
                        itp: newLocation,
                        dateOfUsage: value,
                        quantity: inputRef.current.value,
                        relatedDocs: imageRef.current.files[0],
                        type: newType,
                        review: newReview,
                        numY: inputRefNum.current.value,
                      })
                    )
                  : dispatch(
                      createReinforcement({
                        itp: newLocation,
                        relatedDocs: "",
                        dateOfUsage: value,
                        quantity: inputRef.current.value,
                        type: newType,
                        review: newReview,
                        numY: inputRefNum.current.value,
                      })
                    ),
                setTimeout(() => {
                  dispatch(UpdateSelectedBox(""));
                  dispatch(getAllReinforcements());
                }, 1000),
                handleClose()
              )}
            >
              <Button
                variant="outlined"
                endIcon={<SendIcon />}
                style={{ marginTop: 12, float: "right" }}
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
