import snce from "../../../images/snce.png";
import jesa from "../../../images/jesa.png";
import "./checklist.css";
import { textAlign } from "@mui/system";
import { itnData } from "../../../state";
import { useAppSelector } from "../../../state/hooks";
import { handleNumber } from "../../../constants/constant";
const Checklist2 = (dateItn: any) => {
  const { individualItn } = useAppSelector(itnData);

  const ItpStuff = {
    ItpNum:
      individualItn.itp === "aerationTank"
        ? "003"
        : individualItn.itp === "PrimaryClarifierP7"
        ? "001"
        : individualItn.itp === "PrimaryClarifierP8"
        ? "001"
        : individualItn.itp === "PrimaryClarifierP9"
        ? "001"
        : individualItn.itp === "secondaryClarifierP24"
        ? "002"
        : individualItn.itp === "secondaryClarifierP25"
        ? "002"
        : individualItn.itp === "secondaryClarifierP32"
        ? "002"
        : individualItn.itp === "mainBuilding"
        ? "004"
        : individualItn.itp === "workShop"
        ? "005"
        : individualItn.itp === "chlorinationTank"
        ? "006"
        : individualItn.itp === "pumpingStation2"
        ? "007"
        : individualItn.itp === "pumpingStation1"
        ? "008"
        : individualItn.itp === "sandFilter"
        ? "010"
        : individualItn.itp === "closingWall"
        ? "011"
        : "000",
    DrawingNum:
      individualItn.itp === "aerationTank"
        ? "02-CI-DGA-00015"
        : individualItn.itp === "PrimaryClarifierP7"
        ? "01-CI-DGA-00001"
        : individualItn.itp === "PrimaryClarifierP8"
        ? "01-CI-DGA-00001"
        : individualItn.itp === "PrimaryClarifierP9"
        ? "01-CI-DGA-00001"
        : individualItn.itp === "secondaryClarifierP24"
        ? "02-CI-DGA-00001"
        : individualItn.itp === "secondaryClarifierP25"
        ? "02-CI-DGA-00001"
        : individualItn.itp === "secondaryClarifierP32"
        ? "02-CI-DGA-00001"
        : individualItn.itp === "mainBuilding"
        ? "00-CI-DRD-00001"
        : individualItn.itp === "workShop"
        ? "00-CI-DRD-00004"
        : individualItn.itp === "chlorinationTank"
        ? "03-CI-DGA-00005"
        : individualItn.itp === "pumpingStation2"
        ? "02-CI-DGA-00021"
        : individualItn.itp === "pumpingStation1"
        ? "02-CI-DGA-00023"
        : individualItn.itp === "sandFilter"
        ? "03-CI-DGA-00015"
        : individualItn.itp === "closingWall"
        ? "05-CI-DAL-00012"
        : "000",
  };
  // individualItn.itp === "PrimaryClarifierP8" ? "001" : "000";
  console.log("hhhhhhfgfffrr", ItpStuff.DrawingNum, individualItn.itp);
  return (
    <div className="checkCover">
      <div className="ProjName">PROJECT AND LOCATION: SAFI WWTP-MOROCCO </div>
      <div style={{ display: "flex" }}>
        {" "}
        <div className="logo7" style={{ display: "flex" }}>
          <h3 style={{ flex: 1, marginLeft: -30 }}>Contractor</h3>

          <img
            src={snce}
            alt=""
            height="60%"
            style={{ flex: 1, marginTop: 7, marginLeft: 25 }}
          />
        </div>
        <div className="formN" style={{ flex: 1 }}>
          <p style={{ margin: 7 }}>Project Number :QW211101 </p>
          <p style={{ margin: 7 }}>Purchase Number:Q2265011/01CG</p>
          <p style={{ margin: 7 }}>Form n°: ERS-013</p>
        </div>{" "}
      </div>
      <div style={{ display: "flex" }}>
        <p className="border2">
          ITP no. : Q2265011_01CG-G120-{ItpStuff.ItpNum}{" "}
        </p>
        <p className="border2" style={{ textAlign: "center" }}>
          Installation Checklist No : <br /> <span>ICL-C-002</span>{" "}
        </p>
        <p className="border2" style={{ textAlign: "center" }}>
          ITN No. : ITN No : QW211101-SNCE-QA-ITN-
          {handleNumber(individualItn.num)}
        </p>
      </div>
      <div className="ProjName">Check List for Lean Concrete/Mass Concrete</div>
      <div style={{ display: "flex", textAlign: "left" }}>
        <p className="border3">Document no. : </p>
        <p className="border3">
          Area/Building/Floor : {individualItn.itp} {individualItn.subLocation}
        </p>
      </div>
      <div style={{ display: "flex", textAlign: "left" }}>
        <p className="border4">
          Drawing / Specification no. : QW211101-{ItpStuff.DrawingNum}
        </p>
        <p className="border4">Inspection Date : {dateItn.dateITN}</p>
      </div>
      <div className="space"></div>
      <div className="bigTable" style={{ height: 50 }}>
        <div className="col1">ITEM</div>
        <div className="col2">ACTIVITY</div>
        <div className="col3">YES</div>
        <div className="col4">NO</div>
        <div className="col5">N/A</div>
        <div className="col6">Remarks</div>
      </div>{" "}
      <div className="bigTable" style={{ height: 50 }}>
        <div className="col1">1</div>
        <div className="col2">
          "Whether the soil surface is trimmed/ compacted properly to the
          specified level/slope?"
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: 50 }}>
        <div className="col1">2</div>
        <div className="col2">
          "Whether the soil surface is free from standing water, mud, debris,
          soft or yielding soil?"
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: 50 }}>
        <div className="col1">3</div>
        <div className="col2">
          "Whether the bottom level of excavation with respect to bench mark has
          been checked?"
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: 50 }}>
        <div className="col1">4</div>
        <div className="col2">
          Whether button marks are kept as per thickness and level specified?
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: 50 }}>
        <div className="col1">5</div>
        <div className="col2">
          Whether proper machinery for mixing is available?
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: 50 }}>
        <div className="col1">6</div>
        <div className="col2">
          Whether the mix proportions of concrete have been checked?
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>
      <div className="bigTable" style={{ height: 50 }}>
        <div className="col1">7</div>
        <div className="col2">Whether the compaction is sufficient?</div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: 50 }}>
        <div className="col1">8 </div>
        <div className="col2">
          "Whether the top surface finished to level/ slope is as specified in
          the drawing?"
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: 50 }}>
        <div className="col1">9</div>
        <div className="col2">Whether curing arrangement is available?</div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>
      <div className="remarks11" style={{ height: 160 }}>
        Remarks/Comments:
      </div>
      <div className="bigTable">
        <div className="col7"></div>
        <div className="col8" style={{ fontSize: 17 }}>
          Sub Contractor (If required)
        </div>
        <div className="col9" style={{ fontSize: 17 }}>
          SNCE Site Engineer
        </div>
        <div className="col10" style={{ fontSize: 17 }}>
          SNCE QC Engineer
        </div>
        <div className="col11" style={{ fontSize: 17 }}>
          Client
        </div>
      </div>{" "}
      <div className="bigTable">
        <div className="col7">Name: </div>
        <div className="col8"></div>
        <div className="col9"></div>
        <div className="col10"></div>
        <div className="col11"></div>
      </div>
      <div className="bigTable">
        <div className="col7">Date: </div>
        <div className="col8"></div>
        <div className="col9"></div>
        <div className="col10"></div>
        <div className="col11"></div>
      </div>
      <div className="bigTable">
        <div className="col7" style={{ padding: 20 }}>
          Signature:{" "}
        </div>
        <div className="col8" style={{ padding: 20 }}></div>
        <div className="col9" style={{ padding: 20 }}></div>
        <div className="col10" style={{ padding: 20 }}></div>
        <div className="col11" style={{ padding: 20, height: 50 }}></div>
      </div>
    </div>
  );
};

export default Checklist2;
