import "./itnForm.css";
import snce from "../../../images/snce.png";
import jesa from "../../../images/jesa.png";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getItn, itnData } from "../../../state";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import Checklist from "./checklist6";
import Checklist6 from "./checklist6";
import Checklist2 from "./checklist2";
import Checklist3 from "./checklist3";
import Checklist5 from "./checklist5";
import Checklist4 from "./checklist4";
import Button from "@mui/material/Button";

const ItnForm = () => {
  const params: any = useParams();
  const dispatch = useAppDispatch();
  const { individualItn } = useAppSelector(itnData);

  const handleNumber = (num: any) => {
    return num < 10 ? "000" + num : num < 100 ? "00" + num : "0" + num;
  };

  const dateITN: any = new Date(
    individualItn.dateOfInspection
  ).toLocaleDateString(navigator.language, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  var previousDate = new Date(individualItn.dateOfInspection);
  previousDate.setDate(previousDate.getDate() - 1);
  // const previousDateString: any = previousDate.toDateString();

  const fff = new Date(previousDate).toLocaleDateString(navigator.language, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  useEffect(() => {
    if (params) {
      dispatch(getItn(params));
    }
  }, []);
  console.log("GGGGGG", individualItn.routine);
  return (
    <div className="carcass">
      <Link
        to={`../${individualItn.itp}/${individualItn._id}`}
        style={{
          position: "absolute",
          top: 50,
          right: 100,
          backgroundColor: "yellowgreen",
          padding: 38,
          cursor: "pointer",
          zIndex: 99,
          borderRadius: 10,
          textDecoration: "none",
        }}
        className="linkGoBack"
      >
        Go Back
      </Link>
      <div className="firstRaw">
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, width: 400, display: "flex" }} className="xx1">
            <p
              className="client"
              style={{
                backgroundColor: "Highlight",
                marginTop: 10,
                marginLeft: 0,
              }}
            >
              CLIENT
            </p>
            <img src={jesa} alt="" width={150} />
          </div>
          <div
            style={{
              flex: 1,
              width: 400,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            className="xx2"
          >
            <br />
            <p style={{ flex: 1 }}> PROJECT:</p>
            <p style={{ flex: 1 }}> SAFI STEP PROJECT CIVIL WORKS </p>
            <p style={{ flex: 1 }}>QW211201-WWPT SAFI</p>
          </div>
          <div style={{ flex: 1, width: 400 }} className="xx3">
            <p
              className="contractor2"
              style={{
                backgroundColor: "Highlight",
                marginTop: 10,
                marginLeft: 0,
              }}
            >
              CONTRACTOR
            </p>
            <img src={snce} alt="" width={140} />
          </div>
        </div>
      </div>
      <p
        className="oneLine resp lil"
        style={{ textAlign: "center", backgroundColor: "Highlight" }}
      >
        INSPECTION TEST NOTIFICATION (ITN)
      </p>
      <div className="firstRaw lil">
        <p className="owner">Owners: OCP / JESA</p>
        <p className="no">
          ITN No : QW211101-SNCE-QA-ITN-{handleNumber(individualItn.num)}
        </p>
        <p className="rev">Rev. No: 0</p>
      </div>
      <div className="firstRaw lil">
        <p className="contractor">Contractor: SNCE </p>
        <p className="date">Date: {fff}</p>
      </div>
      <div className="firstRaw lil">
        <p className="dateOf0"> </p>
        <p className="dateOf">Date of Inspection: {dateITN}</p>
      </div>
      <div className="firstRaw lil">
        <p className="loc" style={{ padding: 11 }}>
          Location: {individualItn.itp}
        </p>
        <p className="lev" style={{ padding: 11 }}>
          Level:
        </p>
        <p className="are" style={{ padding: 11 }}>
          Area/Grid Lines: {individualItn.subLocation}
        </p>
      </div>
      <div className="firstRaw oneLine lil" style={{ paddingTop: 16 }}>
        <p className="dis1">Discipline:</p>
        <p className="littlSquare1"> </p>

        <p className="dis"> Structural</p>
        <p className="littlSquare2"> </p>

        <p className="dis" style={{ marginLeft: 160 }}>
          Architectural
        </p>
        <p className="littlSquare3"> </p>

        <p className="dis" style={{ marginLeft: 160 }}>
          {" "}
          MEP
        </p>
        <p className="littlSquare4"> </p>

        <p className="dis"> Others</p>
      </div>

      <p className="oneLine lil">Shop Drawing Ref:</p>
      <div className="oneLine lil">
        <p className="work">WORK TO BE INSPECTED:</p>
        <p className="routine">{individualItn.routine}</p>
      </div>
      <div className="firstRaw oneLine lil" style={{ padding: 10 }}>
        <p className="dis1">Setting out surveyed:</p>{" "}
        <p className="dis" style={{ marginBottom: 0, marginLeft: 100 }}>
          Name:
        </p>
        <p className="dis" style={{ marginBottom: 0, marginLeft: 240 }}>
          Signature:
        </p>
        <p className="dis" style={{ marginBottom: 0, marginLeft: 230 }}>
          Date:
        </p>{" "}
      </div>
      <div className="twoBox lil">
        <div className="oneLine">
          <p className="pad"> MEP Contractor Clearance </p>
          <div className="firstRaw ">
            <p className="dis1">Discipline:</p>
            <p className="littlSquare5"> </p>

            <p className="dis2"> Mec</p>
            <p className="littlSquare6"> </p>

            <p className="dis2">El</p>
            <p className="littlSquare7"> </p>

            <p className="dis2"> PL</p>
            <p className="littlSquare8"> </p>

            <p className="dis2"> N/A</p>
            <p className="littlSquare9" style={{ marginLeft: 702 }}>
              {" "}
            </p>
          </div>
          <p className="pad">Name:</p>
          <p className="pad">Date: </p>
          <p className="pad">Signature: </p>
        </div>
        <div className="oneLine">
          <div className="pad">
            {" "}
            <div className="firstRaw ">
              <p className="dis1">JESA MEP: </p>

              <p className="dis2" style={{ marginLeft: 46 }}>
                {" "}
                Mep
              </p>
              <p className="littlSquare10"> </p>

              <p className="dis2">Checked</p>
              <p className="littlSquare11"> </p>
            </div>{" "}
          </div>
          <div className="firstRaw ">
            <p className="dis1">Discipline:</p>
            <p className="littlSquare12"> </p>

            <p className="dis2"> Mec</p>
            <p className="littlSquare13"> </p>

            <p className="dis2">El</p>
            <p className="littlSquare14"> </p>

            <p className="dis2"> PL</p>
            <p className="littlSquare15"> </p>

            <p className="dis2" style={{ marginLeft: 50 }}>
              {" "}
              N/A
            </p>
          </div>
          <p className="pad">Name:</p>
          <p className="pad">Date: </p>
          <p className="pad">Signature: </p>
        </div>
      </div>

      <div className="firstRaw oneLine lil" style={{ padding: 10 }}>
        <p className="dis1"> Safety Clearance:</p>
        <p className="dis" style={{ marginBottom: 0, marginLeft: 130 }}>
          Name:
        </p>
        <p className="dis" style={{ marginBottom: 0, marginLeft: 240 }}>
          Signature:
        </p>
        <p className="dis" style={{ marginBottom: 0, marginLeft: 230 }}>
          {" "}
          Date:
        </p>
      </div>

      <div className="firstRaw oneLine lil">
        <p className="dis1">SNCE QA/QC Manager: </p>
        <p className="dis1" style={{ marginBottom: 0, marginLeft: 698 }}>
          Date:
        </p>
      </div>
      <div className="firstRaw oneLine lil">
        <p className="dis1">SNCE Project/Construction Manager: </p>
        <p className="dis1">Date:</p>
      </div>
      <h5 className="oneLine lil">
        NB: This ITN after signature remains preliminary and will be subject to
        an additional inspection if the work were not carried out in accordance
        with the specifications and standards.
      </h5>
      <div className="oneLine lil">
        <p className="work resp" style={{ backgroundColor: "Highlight" }}>
          CONTRACTOR RESPONSE
        </p>
        <hr />
        <p className="routine2"> </p>
      </div>
      <div className="  oneLine lil">
        <p className="littlSquare17"> </p>
        <p className="c1"> C1 - Approuved</p>
        <p className="littlSquare17"> </p>
        <p className="c1"> C2 - Aprouved with comments</p>{" "}
        <p className="littlSquare17"> </p>
        <p className="c1"> C3 - Rejected</p>
        <p className="littlSquare17"> </p>
        <p className="c1"> C4 - For Informantion</p>
      </div>
      <div className="firstRaw oneLine lil" style={{ padding: 10 }}>
        <p className="dis1" style={{ marginBottom: 0 }}>
          Name :{" "}
        </p>
        <p className="dis1" style={{ marginBottom: 0, marginLeft: 300 }}>
          Sign :
        </p>
        <p className="dis1" style={{ marginBottom: 0, marginLeft: 490 }}>
          Date :
        </p>
      </div>
      <p className="oneLine">Re-Inspection:</p>
      <p className="oneLine lil">
        The above comments have now been satisfactorily closed and works can
        proceed
      </p>
      <div className="firstRaw oneLine lil">
        <p className="dis1">SNCE QA/QC Manager: </p>
        <p className="dis1" style={{ marginBottom: 0, marginLeft: 715 }}>
          Date:
        </p>
      </div>
      <div className="firstRaw oneLine lil">
        <p className="dis1">SNCE Project/Construction Manager: </p>
        <p className="dis1" style={{ marginBottom: 0, marginLeft: 605 }}>
          Date:
        </p>
      </div>
      <p
        className="oneLine"
        style={{ textAlign: "center", backgroundColor: "Highlight" }}
      >
        REVIEWED/APPROVED BY
      </p>
      <div className="firstRaw oneLine footing lil">
        <p className="dis1">Client:</p>
        <p className="dis1" style={{ marginBottom: 0, marginLeft: 848 }}>
          Date:
        </p>
      </div>
      {individualItn.routine === "Backfilling" && (
        <Checklist6 dateITN={dateITN} individualItnValue={individualItn} />
      )}
      {(individualItn.routine === "Concrete Tests" ||
        individualItn.routine === "Curing") && <Checklist5 dateITN={dateITN} />}
      {individualItn.routine === "Concrete placing and finishing" && (
        <Checklist4 dateITN={dateITN} individualItnValue={individualItn} />
      )}
      {(individualItn.routine === "Lean Concrete" ||
        individualItn.routine === "Mass Concrete") && (
        <Checklist2 dateITN={dateITN} individualItnValue={individualItn} />
      )}
      {individualItn.routine === "Reinforcement & Formwork" && (
        <Checklist3 dateITN={dateITN} individualItnValue={individualItn} />
      )}
      {individualItn.routine === "Excavation until foundation Bottom" && (
        <Checklist5 dateITN={dateITN} individualItnValue={individualItn} />
      )}
    </div>
  );
};

export default ItnForm;
