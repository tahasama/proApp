import Button from "@mui/material/Button";
import React, { useEffect, useMemo, useRef, useState } from "react";
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
    },
    {
      field: "location",
      headerName: "Location",

      filter: "agMultiColumnFilter",
      filterParams: {
        filter: "agMultiColumnFilter",
      },
    },
    {
      field: "dateL",
      headerName: "Date",
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
      field: "manifoldUrl",
      headerName: "Manifold",
      filter: "agMultiColumnFilter",
      filterParams: {
        filter: "agMultiColumnFilter",
      },
      cellRenderer: (params: any) => {
        const link4 = params.value;
        return link4 && <a href={link4}>See PV</a>;
      },
    },
    {
      field: "reportUrl",
      headerName: "Conformity Report",
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
    }, 250);
  };

  return (
    <div>
      <div className="navbar">
        <NavBar />
      </div>
      <div
        className=""
        style={{ marginTop: status === "authorized" ? 35 : 20 }}
      >
        <div>
          <h2 className="title4" style={{ position: "relative", top: 64 }}>
            {book} Data Records
          </h2>
        </div>
        {status === "manager" && (
          <>
            {" "}
            <div className="">
              <ModalLab />{" "}
            </div>
            <div>
              <Button
                className="deleteButton"
                color="error"
                variant="outlined"
                size="large"
                onClick={handleDelete}
              >
                Delete selected
              </Button>
            </div>
          </>
        )}

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
      </div>
    </div>
  );
};

export default Workbook;
