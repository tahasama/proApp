import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useAppDispatch } from "../../../state/hooks";
import { useRef, useState } from "react";

import CircularProgress from "@mui/material/CircularProgress";

import "./modalD.css";

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
        className=""
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
              <p style={{ fontWeight: 500 }}> Browse Files</p>
            </label>
            <i>ITP </i>
            <input id="file-upload" ref={pdfRef} type="file" />

            <Button
              onClick={upload}
              className="imageUpload upload xx"
              variant="contained"
              style={{ marginLeft: 300, position: "relative", top: 10 }}
            >
              {loading && <CircularProgress color="secondary" />}
              <span className="uploadText">Upload</span>
            </Button>
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
