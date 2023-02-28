import Button from "@mui/material/Button";
import { useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { getAuthData } from "../../../state/reducers/authSlice";
import {
  deleteLab,
  getAllLab,
  getLab,
  LabData,
  UpdateSelectedBox,
} from "../../../state/reducers/labSlice";
import NavBar from "../../Navbar/navbar";
import CircularProgress from "@mui/material/CircularProgress";
import ModalLab from "./modalLab/modalLab";
import DownloadIcon from "@mui/icons-material/Download";
import FolderIcon from "@mui/icons-material/Folder";
// import GeotechnicalStudy from "../../../images/GeotechnicalStudy.pdf";
// import Paq from "../../../images/Paq.pdf";
import "./workbook.css";

const Workbook = () => {
  const { book } = useParams();
  const dispatch = useAppDispatch();
  const gridRef = useRef<any>();
  const { all, selectedBox } = useAppSelector(LabData);
  const { status } = useAppSelector(getAuthData);

  useEffect(() => {
    dispatch(getAllLab());
  }, []);
  useEffect(() => {
    dispatch(getLab(selectedBox));
  }, [selectedBox]);

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,

      flex: 1,
      minWidth: 200,
      resizable: true,
      menuTabs: ["filterMenuTab"],
    };
  }, []);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "numL",
      headerName: "Designation",
      checkboxSelection: true,
      filter: "agMultiColumnFilter",
      filterParams: {
        filter: "agMultiColumnFilter",
      },
      hide:
        book === "Compression Strength 7 days" ||
        book === "Compression Strength 28 days"
          ? true
          : false,
    },
    {
      field: "location",
      headerName: "Location",
      checkboxSelection:
        book === "Excavation Bottom Foundation Check" ||
        book == "Compaction Tests" ||
        book === "Material Identification"
          ? false
          : true,
      maxWidth: 200,
      cellStyle: { "background-color": "#F4ECF7" },
      filter: "agMultiColumnFilter",
      filterParams: {
        filter: "agMultiColumnFilter",
      },
      hide:
        book === "Concrete Formulation Report" ||
        book === "Convenience Report" ||
        book === "Material Identification"
          ? true
          : false,
    },
    {
      field: "subLocation",
      headerName: "Sublocation",
      minWidth: 200,
      filter: "agMultiColumnFilter",
      filterParams: {
        filter: "agMultiColumnFilter",
      },
      hide: book === "Concrete Formulation Report" ? true : false,
    },
    {
      field: "concreteType",
      headerName: "Concrete Type",
      minWidth: 125,
      cellStyle: { "background-color": "#FDEDEC" },

      filter: "agMultiColumnFilter",
      filterParams: {
        filter: "agMultiColumnFilter",
      },
      hide:
        book === "Compression Strength 7 days" ||
        book === "Compression Strength 28 days"
          ? false
          : true,
    },
    {
      field: "dateL",
      headerName: "Date",
      cellStyle: { "background-color": "#FEF9E7" },

      minWidth: 100,
      filter: "agMultiColumnFilter",
      filterParams: {
        filter: "agMultiColumnFilter",
      },
      cellRenderer: (params: any) => {
        return (
          params.value !== undefined &&
          params.value.slice(2, 10).split("-").reverse().join("-")
        );
      },
    },
    {
      field: "valueL1",
      headerName: "v1 (N/mm2) ",
      minWidth: 115,
      cellStyle: { "background-color": "#EBF5FB " },
      hide:
        book === "Compression Strength 7 days" ||
        book === "Compression Strength 28 days"
          ? false
          : true,
    },
    {
      field: "valueL2",
      headerName: "v2 (N/mm2) ",
      cellStyle: { "background-color": "#EBF5FB" },

      minWidth: 115,
      hide:
        book === "Compression Strength 7 days" ||
        book === "Compression Strength 28 days"
          ? false
          : true,
    },
    {
      field: "valueL3",
      cellStyle: { "background-color": "#EBF5FB" },

      headerName: " v3 (N/mm2) ",
      minWidth: 115,
      hide:
        book === "Compression Strength 7 days" ||
        book === "Compression Strength 28 days"
          ? false
          : true,
    },
    {
      field: "valueL4",
      headerName: "Avg (N/mm2) ",
      cellStyle: { "background-color": "#EAECEE" },
      minWidth: 125,
      hide:
        book === "Compression Strength 7 days" ||
        book === "Compression Strength 28 days"
          ? false
          : true,
    },
    // {
    //   field: "manifoldUrl",
    //   headerName: "Manifold",
    //   minWidth: 110,
    //   filter: "agMultiColumnFilter",
    //   filterParams: {
    //     filter: "agMultiColumnFilter",
    //   },
    //   cellRenderer: (params: any) => {
    //     const link4 = params.value;
    //     return link4 && <a href={link4}>See PV</a>;
    //   },
    // },
    {
      field: "reportUrl",
      headerName: "Lab Report",
      minWidth: 120,
      filter: "agMultiColumnFilter",
      filterParams: {
        filter: "agMultiColumnFilter",
      },
      cellRenderer: (params: any) => {
        const link5 = params.value;
        return link5 && <a href={link5}>See Report</a>;
      },
    },
  ]);

  const handleDelete = () => {
    dispatch(deleteLab(selectedBox));
    setTimeout(() => {
      dispatch(getAllLab());
    }, 1000);
  };

  return (
    <div>
      <div className="navbar">
        <NavBar />
      </div>
      <div
        className="title1"
        style={{ marginTop: status === "authorized" ? 25 : 10 }}
      >
        <h2 className="title4" style={{ position: "relative", top: 24 }}>
          {book} Data Records
        </h2>

        {status === "manager" &&
          book !== "PAQ (quality assurance plan)" &&
          book !== "Geotechnical Study" && (
            <div className="createDeleteB" style={{ top: -26 }}>
              {" "}
              <ModalLab />{" "}
              <div>
                <Button
                  variant="outlined"
                  color="error"
                  size="large"
                  className="deleteB"
                  onClick={handleDelete}
                  style={{
                    borderColor: "tomato",
                    color: "tomato",
                    margin: "0 10px",
                  }}
                >
                  Delete selected
                </Button>
              </div>
            </div>
          )}

        {book !== "Geotechnical Study" &&
        book !== "PAQ (quality assurance plan)" ? (
          <div
            className="grid"
            style={{
              width: "98%",
              height: 420,
              margin: 10,
              marginTop: status === "authorized" ? 90 : 0,
            }}
          >
            {all.flat().length >= 0 ? (
              <>
                <div style={containerStyle}>
                  <div style={gridStyle} className="ag-theme-alpine">
                    <AgGridReact
                      rowData={all
                        .flat()
                        .filter((x: any) => x.typeL === book)
                        .reverse()}
                      columnDefs={columnDefs}
                      groupIncludeFooter={true}
                      groupIncludeTotalFooter={true}
                      defaultColDef={defaultColDef}
                      animateRows={true}
                      ref={gridRef}
                      enableCellTextSelection={true}
                      onSelectionChanged={(v: any) =>
                        v.api.getSelectedRows().length === 0
                          ? dispatch(UpdateSelectedBox(""))
                          : dispatch(
                              UpdateSelectedBox(v.api.getSelectedRows()[0]._id)
                            )
                      }
                    ></AgGridReact>
                  </div>
                </div>{" "}
              </>
            ) : (
              <div>
                <CircularProgress style={{ marginTop: 200 }} size={120} />
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* <a href={book !== "Geotechnical Study" ? Paq : GeotechnicalStudy}>
              <FolderIcon
                sx={{
                  color: "pink",
                  fontSize: 150,
                  marginTop: 12,
                }}
              />
            </a> */}
            {/* <a
              href={book !== "Geotechnical Study" ? Paq : GeotechnicalStudy}
              style={{
                color: "whitesmoke",
                fontWeight: 500,
                fontSize: 20,
              }}
            >
              {book !== "Geotechnical Study"
                ? "PAQ (quality assurance plan)"
                : "Geotechnichal study"}
            </a> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Workbook;
