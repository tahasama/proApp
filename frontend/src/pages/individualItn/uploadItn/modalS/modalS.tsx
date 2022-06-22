import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import UploadItn from "../uploadItn";
import FileUploadTwoToneIcon from "@mui/icons-material/FileUploadTwoTone";

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

export default function ModalS() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <i onClick={handleOpen} className="">
        <FileUploadTwoToneIcon />
        Upload Itn
      </i>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <p>Update the curruent infos ?</p>

            <UploadItn handleClose={handleClose} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
