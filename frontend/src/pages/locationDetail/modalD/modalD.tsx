import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { useEffect, useRef, useState } from "react";
import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import { Stack, TextField } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import CircularProgress from "@mui/material/CircularProgress";

import SendIcon from "@mui/icons-material/Send";
import "./modalD.css";
import { Input } from "@mui/material";
import SelectStuff from "../../individualItn/modal/select/SelectStuff";
import { useParams } from "react-router-dom";
import { uploadItp } from "../../../state/reducers/itpSlice";

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

export default function ModalD() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useAppDispatch();
  const { itp } = useParams();
  const [value, setValue] = React.useState<Date | null>(new Date());

  const inputRef = React.useRef<any>(null);

  const pdfRef = useRef<any>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const upload = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    if (pdfRef.current.files[0] !== undefined) {
      const value = {
        itp: itp,
        pdf: pdfRef.current.files[0],
      };
      dispatch(uploadItp(value));

      setTimeout(() => {
        handleClose();
        setLoading(false);
      }, 2000);
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        size="large"
        color="info"
        className="uploadItp"
        onClick={handleOpen}
      >
        Upload ITP
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <label htmlFor="file-upload" className="imageUpload">
              Browse Image
            </label>
            <input id="file-upload" ref={pdfRef} type="file" />

            <button onClick={upload} className="imageUpload upload xx">
              {loading && <CircularProgress color="secondary" />}
              <span className="uploadText">Upload</span>
            </button>
            <button className="imageUpload upload xy">
              <span className="uploadText"> Cancel</span>
            </button>
            {error && (
              <p className="errorMessage">
                please add an image before uploading!
              </p>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
