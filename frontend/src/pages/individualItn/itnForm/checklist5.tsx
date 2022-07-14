import snce from "../../../images/snce.png";
import "./checklist.css";
import { itnData } from "../../../state";
import { useAppSelector } from "../../../state/hooks";
import { handleNumber } from "../../../constants/constant";

const Checklist5 = ({ dateITN, ItpStuff }: any) => {
  const { individualItn } = useAppSelector(itnData);

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
        <p className="border2">ITP no. Q2265011_01CG-G120-{ItpStuff.ItpNum}</p>
        <p className="border2">Installation Checklist No : ICL-C-005</p>
        <p className="border2">
          ITN No. : QW211101-SNCE-QA-ITN-
          {handleNumber(individualItn.num)}
        </p>
      </div>
      <div className="ProjName">
        Check List for Final Check after Concrete setting
      </div>
      <div style={{ display: "flex", textAlign: "left" }}>
        <p className="border3">Document no. : </p>
        <p className="border3">
          Area/Building/Floor : {individualItn.itp} {individualItn.subLocation}
        </p>
      </div>
      <div style={{ display: "flex", textAlign: "left" }}>
        <p className="border4">Drawing / Specification no. : </p>
        <p className="border4">Inspection Date : {dateITN}</p>
      </div>
      <div className="space"></div>
      <div className="bigTable">
        <div className="col1">ITEM</div>
        <div className="col2">ACTIVITY</div>
        <div className="col3">YES</div>
        <div className="col4">NO</div>
        <div className="col5">N/A</div>
        <div className="col6">Remarks</div>
      </div>{" "}
      <div className="bigTable">
        <div className="col1">1</div>
        <div className="col2">
          "Whether curing arrangements are satisfactory and whether curing has
          been done adequately?"
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable">
        <div className="col1">2</div>
        <div className="col2">
          Whether de-shuttering has been done as per the approved stripping
          time?
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable">
        <div className="col1">3</div>
        <div className="col2">
          "Whether the line, verticality, surface and dimensions of the concrete
          member have been checked after de-shuttering?"
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable">
        <div className="col1">4</div>
        <div className="col2">
          "Whether any defects such as honey combs, deviation in dimensions
          (bulging of concrete), exposure of re-bars, etc. are noticed? If so,
          specify in the remarks column."
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable">
        <div className="col1">5</div>
        <div className="col2">Whether the noticed defects are rectified?</div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable">
        <div className="col1">6</div>
        <div className="col2">
          Whether the Embedded plates/ anchor bolts are installed correctly?
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>
      <div className="bigTable">
        <div className="col1">7</div>
        <div className="col2">
          "Whether the sample concrete cubes are tested and test reports are
          available?"
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>
      <div className="remarks11" style={{ height: 95 }}>
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
        <div className="col7" style={{ padding: 10 }}>
          Signature:{" "}
        </div>
        <div className="col8" style={{ padding: 10 }}></div>
        <div className="col9" style={{ padding: 10 }}></div>
        <div className="col10" style={{ padding: 10 }}></div>
        <div className="col11" style={{ padding: 10 }}></div>
      </div>
    </div>
  );
};

export default Checklist5;
