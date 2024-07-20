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
import NavBar from "../Navbar/navbar";

import Button from "@mui/material/Button";
import { handleNumber } from "../../constants/constant";
import { Box, Grid, Typography } from "@mui/material";

const IndividualItn = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { individualItn } = useAppSelector(itnData);
  console.log(
    "🚀 ~ file: individualItn.tsx:23 ~ IndividualItn ~ individualItn:",
    individualItn
  );

  useEffect(() => {
    if (params) {
      dispatch(getItn(params));
    }
  }, [dispatch, params]);

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
    <Box p={2} bgcolor="" mt={10}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box textAlign="center">
            <NavBar />
          </Box>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            color={"skyblue"}
          >
            INSPECTION TEST NOTIFICATION
          </Typography>
          <Typography variant="h5" align="center" gutterBottom color={"pink"}>
            DM2023-OKY-AQ-DOC-{handleNumber(individualItn.num)}
          </Typography>
        </Grid>

        {/* Information Section */}
        <Grid item xs={12} md={6} borderRadius={2}>
          <Box p={2} bgcolor="#c5cae9" boxShadow={2} borderRadius={2}>
            <Typography variant="h5" gutterBottom>
              Infos
            </Typography>
            <Typography variant="body1" lineHeight={1.8}>
              <strong>Created:</strong> {formatDate(individualItn.createdAt)}
            </Typography>
            <Typography variant="body1" lineHeight={1.8}>
              <strong>Inspected:</strong>{" "}
              {formatDate(individualItn.dateOfInspection)}
            </Typography>
            <Typography variant="body1" lineHeight={1.8}>
              <strong>Updated:</strong> {formatDate(individualItn.updatedAt)}
            </Typography>
            <Typography variant="body1" lineHeight={1.8}>
              <strong>Location:</strong> {individualItn.itp}
            </Typography>
            <Typography variant="body1" lineHeight={1.8}>
              <strong>Click link to see:</strong>{" "}
              <a href={individualItn.pdfUrl} target="_blank" rel="noreferrer">
                (link)
              </a>
            </Typography>
            <Typography variant="body1" lineHeight={1.8}>
              <strong>Review:</strong> {individualItn.review}
            </Typography>
            <Typography variant="body1" lineHeight={1.8}>
              <strong>Action:</strong> {individualItn.routine}
            </Typography>
            {individualItn.subLocation && (
              <Typography variant="body1" lineHeight={1.8}>
                <strong>Sublocation:</strong> {individualItn.subLocation}
              </Typography>
            )}
          </Box>
        </Grid>

        {/* Action Buttons Section */}
        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems={"center"}
            p={2}
            bgcolor="#c5cae9"
            boxShadow={2}
            height={"100%"}
            borderRadius={2}
          >
            {individualItn.review && (
              <Typography variant="h5">Review : &nbsp;</Typography>
            )}
            {individualItn.review === "C1" ? (
              <span className="stamp is-approved">Approved</span>
            ) : individualItn.review === "C2" ? (
              <span className="stamp is-approved-w" style={{ marginRight: 15 }}>
                Approved <h6 style={{ margin: 0 }}>w/ comments</h6>{" "}
              </span>
            ) : individualItn.review === "C3" ? (
              <span className="stamp is-nope" style={{ marginRight: 50 }}>
                Rejected
              </span>
            ) : (
              <span className="stamp inf">For Info</span>
            )}
          </Box>
        </Grid>

        {/* Stamp Section */}
        <Grid item xs={12}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            p={2}
            bgcolor="rgba(9, 9, 121, 1)"
            boxShadow={2}
            gap={3}
            borderRadius={2}
          >
            <Box>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteOutlineTwoToneIcon />}
                onClick={handleDeleteItn}
                size="medium"
              >
                Delete ITN
              </Button>
            </Box>
            <Box>
              <ModalP />
            </Box>
            <Box>
              <ModalS />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IndividualItn;

const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
