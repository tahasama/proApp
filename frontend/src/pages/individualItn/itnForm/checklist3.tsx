import snce from "../../../images/snce.png";
import "./checklist.css";
import { itnData } from "../../../state";
import { useAppSelector } from "../../../state/hooks";
import { handleNumber } from "../../../constants/constant";

const Checklist3 = ({ dateITN, ItpStuff }: any) => {
  const { individualItn } = useAppSelector(itnData);

  return (
    <div className="checkCover" style={{ fontSize: 19 }}>
      <div className="ProjName">PROJECT AND LOCATION: SAFI WWTP-MOROCCO </div>
      <div style={{ display: "flex", height: "85px" }}>
        {" "}
        <div className="logo7" style={{ display: "flex" }}>
          <h3 style={{ flex: 1, marginLeft: -30, fontSize: 21 }}>Contractor</h3>

          <img
            src={snce}
            alt=""
            height="60%"
            style={{ flex: 1, marginTop: 7, marginLeft: 25 }}
          />
        </div>
        <div className="formN" style={{ flex: 1, fontSize: 19 }}>
          <p style={{ margin: 7 }}>Project Number :QW211101 </p>
          <p style={{ margin: 7 }}>Purchase Number:Q2265011/01CG</p>
          <p style={{ margin: 7 }}>Form n°: ERS-013</p>
        </div>{" "}
      </div>
      <div style={{ display: "flex" }}>
        <p className="border2">ITP no. Q2265011_01CG-G120-{ItpStuff.ItpNum}</p>
        <p className="border2">Installation Checklist No : ICL-C-003</p>
        <p className="border2">
          ITN No. : ITN No : QW211101-SNCE-QA-ITN-
          {handleNumber(individualItn.num)}
        </p>
      </div>
      <div className="ProjName" style={{ padding: 7 }}>
        Check List for Form Work & Re-bars Installation
      </div>
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
        <p className="border4">Inspection Date : {dateITN}</p>
      </div>
      <div className="space" style={{ height: "20px" }}></div>
      <div className="bigTable" style={{ height: "50px" }}>
        <div className="col1">ITEM</div>
        <div className="col2">ACTIVITY</div>
        <div className="col3">YES</div>
        <div className="col4">NO</div>
        <div className="col5">N/A</div>
        <div className="col6">Remarks</div>
      </div>{" "}
      <div className="bigTable" style={{ height: "50px" }}>
        <div className="col1"></div>
        <div className="col2">
          <b style={{ fontSize: 23 }}>Formwork</b>
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: "50px" }}>
        <div className="col1">1.1</div>
        <div className="col2">
          "Whether the material, their size, location, verticality/
          horizontality of the formwork used for work are according to Approved
          Drawings?"
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: "50px" }}>
        <div className="col1">1.2</div>
        <div className="col2">
          "Whether tolerances are within admissible limits according to Approved
          Drawings?"
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: "50px" }}>
        <div className="col1">1.3</div>
        <div className="col2">
          Whether the internal surface of shuttering are applied with shuttering
          oil?
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable">
        <div className="col1">1.4</div>
        <div className="col2">
          "Whether gaps between shuttering boards, if any, are sealed with
          masking tape?"
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: "50px" }}>
        <div className="col1">1.5</div>
        <div className="col2">
          "Whether the supports/ tie rods provided are sufficient to take the
          concrete pressure?"
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: "50px" }}>
        <div className="col1">1.6</div>
        <div className="col2">
          Whether the working platform and safety arrangements are adequate?
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>
      <div className="bigTable" style={{ height: "50px" }}>
        <div className="col1">2</div>
        <div className="col2">
          <b style={{ fontSize: 21 }}>Re-bars/ Anchor bolts</b>
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: "50px" }}>
        <div className="col1">2.1</div>
        <div className="col2">
          Whether the bar bending schedules are approved by the Client?
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: "50px" }}>
        <div className="col1">2.2</div>
        <div className="col2">
          "Whether the re-bars are tested in the accredited laboratory and the
          test results available?"
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: "50px" }}>
        <div className="col1">2.3</div>
        <div className="col2">
          Whether re-bars are free from rust, dust, oil, grease, etc.?
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: "50px" }}>
        <div className="col1">2.4</div>
        <div className="col2">
          "Whether the re-bars are placed with specified spacing, position,
          cover, etc. as per the Approved Drawings?"
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: "50px" }}>
        <div className="col1">2.5</div>
        <div className="col2">
          "Whether the laps are staggered and provided only at the approved
          locations of the structure?"
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: "50px" }}>
        <div className="col1">2.6</div>
        <div className="col2">
          Whether laps are avoided at column - beam junctions?
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: "50px" }}>
        <div className="col1">2.7</div>
        <div className="col2">
          "Whether spacer bars/ chair rods are provided in between layers of
          reinforcements in beams/ slabs?"
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: "50px" }}>
        <div className="col1">2.8</div>
        <div className="col2">
          Whether approved binding wire is used for tying the re-bars?
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: "50px" }}>
        <div className="col1">2.9</div>
        <div className="col2">
          "Whether any embedded plates are provided? If so, whether their
          dimensions, location, level, tolerance, etc. are checked?"
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: "50px" }}>
        <div className="col1">2.10</div>
        <div className="col2">
          "Whether any anchors bolts are provided? If so, whether their
          dimensions, location, level, tolerance, etc. are checked?"
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>
      <div className="remarks11" style={{ height: 60 }}>
        Remarks/Comments:
      </div>
      <div className="bigTable" style={{ fontSize: 16 }}>
        <div className="col7"></div>
        <div className="col8">Sub Contractor (If required)</div>
        <div className="col9">SNCE Site Engineer</div>
        <div className="col10">SNCE QC Engineer</div>
        <div className="col11">Client</div>
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
        <div className="col7" style={{ padding: 12 }}>
          Signature:{" "}
        </div>
        <div className="col8" style={{ padding: 12 }}></div>
        <div className="col9" style={{ padding: 12 }}></div>
        <div className="col10" style={{ padding: 12 }}></div>
        <div className="col11" style={{ padding: 12, height: 50 }}></div>
      </div>
    </div>
  );
};

export default Checklist3;
