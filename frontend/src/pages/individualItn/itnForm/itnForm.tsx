import "./itnForm.css";
// import logo1 from "../pdf/logo.png";
// import logo3 from "../pdf/snce.png";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getItn, itnData } from "../../../state";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";

const ItnForm = () => {
  const params: any = useParams();
  const dispatch = useAppDispatch();
  const { individualItn } = useAppSelector(itnData);

  const handleNumber = (num: any) => {
    return num < 10 ? "000" + num : num < 100 ? "00" + num : "0" + num;
  };

  const date = new Date(individualItn.dateOfInspection).toDateString();

  var previousDate = new Date(individualItn.dateOfInspection);
  previousDate.setDate(previousDate.getDate() - 1);
  const previousDateString: any = previousDate.toDateString();

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

  return (
    <div className="carcass">
      <div className="firstRaw">
        <div className="logo1"></div>
        <div className="logo2">
          <br />
          <p>PROJECT :</p>
          <p> SAFI STEP PROJECT CIVIL WORKS </p>
          <p>QW211201-WWPT SAFI</p>
        </div>

        <div className="logo3"></div>
      </div>
      <p
        className="oneLine resp"
        style={{ textAlign: "center", backgroundColor: "Highlight" }}
      >
        INSPECTION TEST NOTIFICATION (ITN)
      </p>
      <div className="firstRaw">
        <p className="owner">Owners: OCP / JESA</p>
        <p className="no">
          QW211101-SNCE-QA-ITN-{handleNumber(individualItn.num)}
        </p>
        <p className="rev">Rev. No: 0</p>
      </div>
      <div className="firstRaw">
        <p className="contractor">Contractor: SNCE </p>
        <p className="date">Date: {fff}</p>
      </div>
      <div className="firstRaw">
        <p className="dateOf0"> </p>
        <p className="dateOf">
          Date of Inspection:{" "}
          {new Date(individualItn.dateOfInspection).toLocaleDateString(
            navigator.language,
            {
              year: "numeric",
              month: "short",
              day: "numeric",
            }
          )}
        </p>
      </div>
      <div className="firstRaw">
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
      <div className="firstRaw oneLine" style={{ paddingTop: 16 }}>
        <p className="dis1">Discipline:</p>
        <p className="littlSquare1"> </p>

        <p className="dis"> Structural</p>
        <p className="littlSquare2"> </p>

        <p className="dis">Architectural</p>
        <p className="littlSquare3"> </p>

        <p className="dis"> MEP</p>
        <p className="littlSquare4"> </p>

        <p className="dis"> Others</p>
      </div>

      <p className="oneLine">Shop Drawing Ref:</p>
      <div className="oneLine">
        <p className="work">WORK TO BE INSPECTED:</p>
        <p className="routine">{individualItn.routine}</p>
      </div>
      <div className="firstRaw oneLine" style={{ padding: 10 }}>
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
      <div className="twoBox">
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
            <p className="littlSquare9"> </p>
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

              <p className="dis2"> Mep</p>
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

            <p className="dis2"> N/A</p>
          </div>
          <p className="pad">Name:</p>
          <p className="pad">Date: </p>
          <p className="pad">Signature: </p>
        </div>
      </div>

      <div className="firstRaw oneLine" style={{ padding: 10 }}>
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

      <div className="firstRaw oneLine">
        <p className="dis1">SNCE QA/QC Manager: </p>
        <p className="dis1" style={{ marginBottom: 0, marginLeft: 690 }}>
          Date:
        </p>
      </div>
      <div className="firstRaw oneLine">
        <p className="dis1">SNCE Project/Construction Manager: </p>
        <p className="dis1">Date:</p>
      </div>
      <h5 className="oneLine">
        NB: This ITN after signature remains preliminary and will be subject to
        an additional inspection if the work were not carried out in accordance
        with the specifications and standards.
      </h5>
      <div className="oneLine">
        <p className="work resp" style={{ backgroundColor: "Highlight" }}>
          CONTRACTOR RESPONSE
        </p>
        <hr />
        <p className="routine2"> </p>
      </div>
      <div className="  oneLine">
        <p className="littlSquare17"> </p>
        <p className="c1"> C1 - Approuved</p>
        <p className="littlSquare17"> </p>
        <p className="c1"> C2 - Aprouved with comments</p>{" "}
        <p className="littlSquare17"> </p>
        <p className="c1"> C3 - Rejected</p>
        <p className="littlSquare17"> </p>
        <p className="c1"> C4 - For Informantion</p>
      </div>
      <div className="firstRaw oneLine" style={{ padding: 10 }}>
        <p className="dis1" style={{ marginBottom: 0, marginLeft: 140 }}>
          Name :{" "}
        </p>
        <p className="dis1" style={{ marginBottom: 0, marginLeft: 440 }}>
          Sign :
        </p>
      </div>
      <p className="oneLine">Re-Inspection:</p>
      <p className="oneLine">
        The above comments have now been satisfactorily closed and works can
        proceed
      </p>
      <div className="firstRaw oneLine">
        <p className="dis1">SNCE QA/QC Manager: </p>
        <p className="dis1" style={{ marginBottom: 0, marginLeft: 700 }}>
          Date:
        </p>
      </div>
      <div className="firstRaw oneLine">
        <p className="dis1">SNCE Project/Construction Manager: </p>
        <p className="dis1" style={{ marginBottom: 0, marginLeft: 590 }}>
          Date:
        </p>
      </div>
      <p
        className="oneLine"
        style={{ textAlign: "center", backgroundColor: "Highlight" }}
      >
        REVIEWED/APPROVED BY
      </p>
      <div className="firstRaw oneLine footing">
        <p className="dis1">Client:</p>
        <p className="dis1" style={{ marginBottom: 0, marginLeft: 848 }}>
          Date:
        </p>
      </div>
    </div>
  );
};

export default ItnForm;
