import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import { Stack, TextField } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import SendIcon from "@mui/icons-material/Send";
import { Input } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import {
  concreteData,
  createConcrete,
  getAllConcretes,
} from "../../../state/reducers/concreteSlice";
import SelectStuffC from "./selectStuffC/selectStuffC";

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
  const { newLocation, newType } = useAppSelector(concreteData);
  const [value, setValue] = React.useState<Date | null>(new Date());

  const inputRef = React.useRef<any>(null);

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  // const handleChange = (date: Date | null) => {
  //   date
  //     ? setValue(
  //         ((theDate) =>
  //           new Date(
  //             theDate.getTime() - theDate.getTimezoneOffset() * 60 * 1000
  //           ))(new Date(date))
  //       )
  //     : setValue(date);
  // };

  return (
    <div>
      <Button
        variant="outlined"
        // color="inherit"
        size="large"
        className=""
        onClick={handleOpen}
        style={{ borderColor: "#00d4ff", color: "#00d4ff" }}
      >
        Add a value
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
                inputRef={inputRef}
                color="success"
                placeholder="add quantity"
                name="wooow"
              />
            </div>
            <div style={{ marginTop: 12 }}>
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

            <div
              onClick={() => (
                dispatch(
                  createConcrete({
                    itp: newLocation,
                    type: newType,
                    dateOfUsage: value,
                    quantity: inputRef.current.value,
                    // relatedItn: newRelated,
                  })
                ),
                setTimeout(() => {
                  dispatch(getAllConcretes());
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
