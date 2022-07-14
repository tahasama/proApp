import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import { Stack, TextField } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { itnData, updateItn } from "../../../state";
import SelectStuff from "./select/SelectStuff";
import SendIcon from "@mui/icons-material/Send";
import "./modalP.css";
import { Input } from "@mui/material";

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

export default function ModalP() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useAppDispatch();
  const { individualItn, newLocation, newRoutine, newReview } =
    useAppSelector(itnData);
  const [value, setValue] = React.useState<Date | null>(
    individualItn.dateOfInspection
  );

  const inputRef = React.useRef<any>(null);

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        className="pos"
        variant="contained"
        color="success"
        startIcon={<BorderColorTwoToneIcon />}
      >
        <i>Update Itn</i>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <p>Update the curruent infos ?</p>
            <div>
              <SelectStuff />
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
            <div style={{ marginTop: 12 }}>
              <Input
                type="text"
                inputRef={inputRef}
                color="success"
                placeholder="add a sublocation"
                defaultValue={individualItn.subLocation}
                name="wooow"
              />
            </div>
            <div
              onClick={() => (
                dispatch(
                  updateItn({
                    _id: individualItn._id,
                    num: individualItn.num,
                    itp: newLocation,
                    review: newReview,
                    routine: newRoutine,
                    subLocation: inputRef.current.value,
                    dateOfInspection: value,
                  })
                ),
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
