import snce from "../../../images/snce.png";
import jesa from "../../../images/jesa.png";
import "./checklist.css";
import { textAlign } from "@mui/system";
import { itnData } from "../../../state";
import { useAppSelector } from "../../../state/hooks";
import { handleNumber } from "../../../constants/constant";

const Checklist4 = ({ dateITN, ItpStuff }: any) => {
  const { individualItn } = useAppSelector(itnData);

  return (
    <div className="checkCover" style={{ fontSize: 21 }}>
      <div className="ProjName">PROJECT AND LOCATION: SAFI WWTP-MOROCCO </div>
      <div style={{ display: "flex" }}>
        {" "}
        <div className="logo7" style={{ display: "flex" }}>
          <h3 style={{ flex: 1, marginLeft: -30, fontSize: 24 }}>Contractor</h3>

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
        <p className="border2">ITP no. : 2265011_01CG-G120-{ItpStuff.ItpNum}</p>
        <p className="border2">Installation Checklist No : ICL-C-004</p>
        <p className="border2">
          ITN No. : QW211101-SNCE-QA-ITN-
          {handleNumber(individualItn.num)}
        </p>
      </div>
      <div className="ProjName">Check List for Concrete Work</div>
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
          Whether concrete mix design is approved and available at site?
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: 60 }}>
        <div className="col1">2</div>
        <div className="col2">
          "Whether the ready mix concrete delivered at site complies with the
          mix design in respect of the quantity of cement, aggregates, sand,
          water and additives within the tolerance limits?"
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: 60 }}>
        <div className="col1">3</div>
        <div className="col2">
          Whether temperature of the ready mix concrete delivered at site is
          within the acceptable limit apecified in the mix design?
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: 50 }}>
        <div className="col1">4</div>
        <div className="col2">
          "Whether required numbers of cube moulds of approved quality are
          available at site?"
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: 50 }}>
        <div className="col1">5</div>
        <div className="col2">
          Whether needle vibrators of required size are available?
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: 50 }}>
        <div className="col1">6</div>
        <div className="col2">
          "Whether required manpower has been arranged for the concreting
          operations?"
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>
      <div className="bigTable" style={{ height: 70 }}>
        <div className="col1">7</div>
        <div className="col2">
          "Whether facilities (such as tarpaulin/ plastic sheets, etc.) are
          available to protect the fresh concrete surface, during rainy season?"
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: 50 }}>
        <div className="col1">8</div>
        <div className="col2">
          Whether the method of pouring concrete is as specified?
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: 50 }}>
        <div className="col1">9</div>
        <div className="col2">
          Whether the slump test result confirms with Code
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: 50 }}>
        <div className="col1">10</div>
        <div className="col2">Whether the concrete placed is homogenous? "</div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: 50 }}>
        <div className="col1">11</div>
        <div className="col2">
          Whether the concrete is placed, compacted and finished within the
          initial setting time of the concrete?
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: 50 }}>
        <div className="col1">12</div>
        <div className="col2">
          "Whether sufficient numbers of cubes have been cast and proper
          identification marking is done?"
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>{" "}
      <div className="bigTable" style={{ height: 50 }}>
        <div className="col1">13</div>
        <div className="col2">
          Whether adequate facilities and water are available for curing of
          concrete in the subsequent day(s)?
        </div>
        <div className="col3"></div>
        <div className="col4"></div>
        <div className="col5"></div>
        <div className="col6"></div>
      </div>
      <div className="remarks11" style={{ height: 100 }}>
        Remarks/Comments:
      </div>
      <div className="bigTable" style={{ fontSize: 21 }}>
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
        <div className="col7" style={{ padding: 16 }}>
          Signature:{" "}
        </div>
        <div className="col8" style={{ padding: 16 }}></div>
        <div className="col9" style={{ padding: 16 }}></div>
        <div className="col10" style={{ padding: 16 }}></div>
        <div className="col11" style={{ padding: 16 }}></div>
      </div>
    </div>
  );
};

export default Checklist4;
