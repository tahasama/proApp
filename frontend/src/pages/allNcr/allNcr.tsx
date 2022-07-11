import { AgGridReact } from "ag-grid-react";
// import { CircularProgress } from "material-ui";
import CircularProgress from "@mui/material/CircularProgress";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  deleteQorNcr,
  getAllQorNcrs,
  getQorNcr,
  QorNcrData,
  UpdateSelectedBox,
  updateWw,
} from "../../state/reducers/qorNcrSlice";
import NavBar from "../Navbar/navbar";
import ModalNCR from "./modal/modalNCR";
import Button from "@mui/material/Button";
import { getAuthData } from "../../state/reducers/authSlice";
import Navbar from "../Navbar/navbar";

const AllNcr = () => {
  const dispatch = useAppDispatch();

  const { all, ww, individualQorNcr, selectedBox } = useAppSelector(QorNcrData);
  const { user, status, uid, newstatus, email } = useAppSelector(getAuthData);

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const handleDelete = () => {
    dispatch(deleteQorNcr(selectedBox));
    setTimeout(() => {
      dispatch(getAllQorNcrs());
    }, 250);
  };

  useEffect(() => {
    dispatch(getAllQorNcrs());
  }, []);
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "numR",
      headerName: "number",
      checkboxSelection: true,
    },
    {
      field: "description",
      headerName: "description",
      // cellRenderer: (params: any) => {
      //   return (
      //     params.value !== undefined && (
      //       <Link style={{ color: "blue" }} to={""}>
      //         XXX
      //       </Link>
      //     )
      //   );
      // },
    },

    {
      field: "dateRaised",
      headerName: "dateRaised",
      filter: "agMultiColumnFilter",
      filterParams: {
        filter: "agMultiColumnFilter",
        suppressAndOrCondition: true,
      },
      cellRenderer: (params: any) => {
        return (
          params.value !== undefined &&
          params.value.slice(2, 10).split("-").reverse().join("-")
        );
      },
    },
    {
      field: "dateOfResponse",
      headerName: "dateOfResponse",
      filter: "agMultiColumnFilter",
      filterParams: {
        filter: "agMultiColumnFilter",
        suppressAndOrCondition: true,
      },
      cellRenderer: (params: any) => {
        return (
          params.value !== undefined &&
          params.value.slice(2, 10).split("-").reverse().join("-")
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      filter: "agMultiColumnFilter",
      filterParams: {
        filter: "agMultiColumnFilter",
        // suppressAndOrCondition: true,
      },
    },
    {
      field: "image1Url",
      headerName: "See NCR",
      minWidth: 40,
      cellRenderer: (params: any) => {
        const link1 = params.value;
        return link1 && <a href={link1}>See NCR</a>;
      },
    },
    {
      field: "image2Url",
      headerName: "See action",
      minWidth: 40,
      cellRenderer: (params: any) => {
        const link2 = params.value;
        return link2 && <a href={link2}>See action</a>;
      },
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,

      flex: 1,
      minWidth: 200,
      resizable: true,
      menuTabs: ["filterMenuTab"],
    };
  }, []);
  const sideBar = useMemo(() => {
    return {
      toolPanels: ["filters"],
    };
  }, []);

  const gridRef = useRef<any>();

  useEffect(() => {
    dispatch(getQorNcr(selectedBox));
  }, [selectedBox]);
  const [filter, setFilter] = useState("");
  const [nn, setnn] = useState<any[]>();
  useEffect(() => {
    getTotal();
  }, [filter, all]);

  const getTotal = () => {
    const rr = all.flat().filter((t: any) => t.typeR === "NCR");
    const ss: any = rr.filter((filt: any) => filt.status === filter);
    if (filter !== "") {
      setnn(ss);
    } else setnn(rr);
  };
  const handleFilterChange = () => {
    gridRef.current.api.getFilterModel().status
      ? setFilter(gridRef.current.api.getFilterModel().status.filter)
      : setFilter("");
  };
  return (
    <>
      <div className="navbar">
        <NavBar />
      </div>

      <div className="" style={{ marginTop: status === "authorized" ? 15 : 0 }}>
        <div>
          <h2 className="title4" style={{ position: "relative", top: 64 }}>
            NCR Data Records
          </h2>
        </div>
        {status === "manager" && (
          <>
            {" "}
            <div className="">
              <ModalNCR />
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
                      .filter((x: any) => x.typeR === "NCR")
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
                    onFilterChanged={handleFilterChange}
                    getRowStyle={(params) => {
                      if (params.data?.status === "Closed") {
                        return { background: "rgb(0,255,0,0.15)" };
                      } else if (params.data?.status === "Open") {
                        return { background: "rgb(255,0,0,0.15)" };
                      } else if (params.data?.status === "Pending") {
                        return { background: "rgb(0,0,255,0.15)" };
                      } else return { background: "white" };
                    }}
                  ></AgGridReact>
                </div>

                <Button
                  variant="contained"
                  className="total1"
                  color="secondary"
                >
                  Total = {nn !== undefined && nn.length} NCR
                </Button>
              </div>{" "}
            </>
          ) : (
            <div>
              <CircularProgress style={{ marginTop: 200 }} size={120} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllNcr;
