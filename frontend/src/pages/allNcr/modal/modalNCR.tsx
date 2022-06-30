import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useEffect } from "react";
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
} from "../../../state/reducers/qorNcrSlice";

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

  return (
    <div>
      <Button
        variant="outlined"
        color="success"
        size="large"
        className="createButtons"
        onClick={handleOpen}
      >
        <span>Add a value</span>
      </Button>{" "}
      <Button
        variant="outlined"
        color="success"
        size="large"
        className="createButtons"
        onClick={handleOpen}
      >
        <span>update selected</span>
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
              <SelectStuffNCR />
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
            </div>
            <div
              onClick={() => (
                dispatch(
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
