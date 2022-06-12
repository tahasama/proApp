import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteItn, getItn, itnData } from "../../state";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import FileUploadTwoToneIcon from "@mui/icons-material/FileUploadTwoTone";
import DriveFolderUploadTwoToneIcon from "@mui/icons-material/DriveFolderUploadTwoTone";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import ModalP from "./modal/modalP";

import "./individualItn.css";
import UploadItn from "./uploadItn/uploadItn";
import ModalS from "./uploadItn/modalS/modalS";

const IndividualItn = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { individualItn } = useAppSelector(itnData);
  console.log("AAAAAAAAAAAAAAAAAAAA", individualItn.pdfUrl);
  useEffect(() => {
    if (params) {
      dispatch(getItn(params));
    }
  }, []);

  const handleNumber = (num: any) => {
    return num < 10 ? "000" + num : num < 100 ? "00" + num : "0" + num;
  };

  const handleDeleteItn = async () => {
    const result = window.confirm(
      "Would you like to remove this ITN permanently ?"
    );
    if (result) {
      dispatch(deleteItn(individualItn._id));

      navigate(`../${individualItn.itp}`);
    } else {
      navigate("");
    }
  };

  return (
    <div className="itnCover">
      <h2 className="title1 ">INSPECTION TEST NOTIFICATION</h2>
      <h3 className="title2">
        QW211101-SNCE-QA-ITN-{handleNumber(individualItn.num)}
      </h3>
      <div className="itnCenter">
        <p className="approuval">
          Reviewed
          <p style={{ fontSize: 30 }}>
            <b>C1</b>{" "}
          </p>
        </p>{" "}
        <div className="update">
          <ModalP />
        </div>
        <i className="delete" onClick={handleDeleteItn}>
          <DeleteOutlineTwoToneIcon />
          Delete Itn
        </i>
        <i className="print" onClick={() => navigate("./itnForm")}>
          <LocalPrintshopRoundedIcon />
          Print Itn for signing
        </i>
        <i className="seeItn">
          <PictureAsPdfRoundedIcon />
          <a href={individualItn.pdfUrl} target="_blank" rel="noreferrer">
            See signed Itn
          </a>
        </i>{" "}
        <div className="uploadItn">
          <ModalS />
        </div>
        <i className="Uploadimages">
          <DriveFolderUploadTwoToneIcon />
          Upload Images
        </i>
        <span className="stamp is-approved">Approved</span>{" "}
        {/* <span className="stamp is-approved-w">Approved </span>
        <span className="stamp is-nope">Declined</span>
        <span className="stamp inf">for infos</span> */}
      </div>
    </div>
  );
};

export default IndividualItn;
