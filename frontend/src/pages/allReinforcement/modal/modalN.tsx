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

import SelectStuffC from "./selectStuffR/selectStuffR";
import {
  createReinforcement,
  getAllReinforcements,
  ReinforcementData,
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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useAppDispatch();
  const { newLocation, newRelated } = useAppSelector(ReinforcementData);
  const [value, setValue] = React.useState<Date | null>(new Date());

  const inputRef = React.useRef<any>(null);

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
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
                    inputFormat="MM/dd/yyyy"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </div>

            <div
              onClick={() => (
                console.log(
                  "itp",
                  newLocation,

                  "dateOfUsage",
                  value,
                  "quantity",
                  inputRef.current.value,
                  "relatedItn",
                  newRelated
                ),
                dispatch(
                  createReinforcement({
                    itp: newLocation,

                    dateOfUsage: value,
                    quantity: inputRef.current.value,
                    relatedItn: newRelated,
                  })
                ),
                setTimeout(() => {
                  dispatch(getAllReinforcements());
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
