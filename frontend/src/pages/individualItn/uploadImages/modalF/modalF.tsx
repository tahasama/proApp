import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import FileUploadTwoToneIcon from "@mui/icons-material/FileUploadTwoTone";
import UploadImages from "../uploadImages";
import Button from "@mui/material/Button";

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

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="secondary"
        className=""
        startIcon={<FileUploadTwoToneIcon />}
      >
        <i className="">Upload Images</i>
      </Button>
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
