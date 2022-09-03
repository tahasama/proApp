import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useAppDispatch, useAppSelector } from "../../../../state/hooks";
import { useEffect } from "react";
import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import { Stack, TextField } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { createItn, getAllItns, itnData } from "../../../../state";

import SendIcon from "@mui/icons-material/Send";
import "./modalM.css";
import { Input } from "@mui/material";
import SelectStuff from "../../../individualItn/modal/select/SelectStuff";

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
  const { newLocation, newRoutine, newReview, all } = useAppSelector(itnData);
  const [value, setValue] = React.useState<Date | null>(new Date());

  const inputRef = React.useRef<any>(null);

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };
  useEffect(() => {
    dispatch(getAllItns());
  }, [all]);

  const getNumber = () => {
    const itnNumber: any = all.flat().slice(-1)[0];
    const convertNum: any =
      itnNumber !== undefined ? parseInt(itnNumber.num) : 0;
    let plainNumber: any = itnNumber === undefined ? 1 : convertNum + 1;
    return plainNumber;
  };

  return (
    <div className="">
      <Button
        variant="outlined"
        color="success"
        size="large"
        style={{ borderColor: "#00d4ff", color: "#00d4ff" }}
        onClick={handleOpen}
      >
        Create ITN
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
                name="wooow"
              />
            </div>

            <div
              onClick={() => (
                dispatch(
                  createItn({
                    num: getNumber(),
                    itp: newLocation,
                    routine: newRoutine,
                    subLocation: inputRef.current.value,
                    dateOfInspection: value,
                    review: newReview,
                  })
                ),
                dispatch(getAllItns()),
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
