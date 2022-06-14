import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteItn, getItn, itnData } from "../../state";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import ModalP from "./modal/modalP";

import "./individualItn.css";
import ModalS from "./uploadItn/modalS/modalS";
import ModalF from "./uploadImages/modalF/modalF";

const IndividualItn = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { individualItn } = useAppSelector(itnData);

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
            <b>{individualItn.review}</b>{" "}
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
        <div className="Uploadimages">
          <ModalF />
        </div>
        {individualItn.review === "C1" ? (
          <span className="stamp is-approved">Approved</span>
        ) : individualItn.review === "C2" ? (
          <span className="stamp is-approved-w">
            Approved <h6 style={{ margin: 0 }}>w/ comments</h6>{" "}
          </span>
        ) : individualItn.review === "C3" ? (
          <span className="stamp is-nope" style={{ marginRight: 50 }}>
            Declined
          </span>
        ) : (
          <span className="stamp inf">for infos</span>
        )}{" "}
        <img
          src={individualItn.image1Url}
          alt=""
          height={400}
          width={420}
          className="image1"
        />{" "}
        <img
          src={individualItn.image2Url}
          alt=""
          height={400}
          width={420}
          className="image2"
        />
      </div>
    </div>
  );
};

export default IndividualItn;
