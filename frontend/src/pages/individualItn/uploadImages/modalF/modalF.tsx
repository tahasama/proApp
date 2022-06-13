import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import { Stack, TextField } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import SendIcon from "@mui/icons-material/Send";
// import "./modalP.css";
import { Input } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../state/hooks";
import individualItn from "../../individualItn";
import { itnData } from "../../../../state";
import FileUploadTwoToneIcon from "@mui/icons-material/FileUploadTwoTone";
import UploadImages from "../uploadImages";

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

export default function ModalF() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useAppDispatch();
  const { individualItn, newLocation, newRoutine } = useAppSelector(itnData);
  const [value, setValue] = React.useState<Date | null>(
    individualItn.dateOfInspection
  );

  const inputRef = React.useRef<any>(null);

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };
  console.log("inputRef .......", inputRef.current?.value);

  return (
    <div>
      <i onClick={handleOpen} className="">
        <FileUploadTwoToneIcon />
        Upload Images
      </i>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <p>Update the curruent image ?</p>

            <UploadImages handleClose={handleClose} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
