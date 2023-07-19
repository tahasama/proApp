import { AgGridReact } from "ag-grid-react";
import CircularProgress from "@mui/material/CircularProgress";

import { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import {
  deleteQorNcr,
  getAllQorNcrs,
  getQorNcr,
  QorNcrData,
  UpdateSelectedBox,
  updateWw,
} from "../../../state/reducers/qorNcrSlice";
import ModalQOR from "./modal/modalQOR";
import Button from "@mui/material/Button";
import { getAuthData } from "../../../state/reducers/authSlice";
import { handleNumber } from "../../../constants/constant";

const Log = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(getAuthData);

  const { all, ww, selectedBox } = useAppSelector(QorNcrData);
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
      minWidth: 270,
      cellRenderer: (params: any) => {
        return `DM2023-OKY-AQ-QOR-${handleNumber(params.value)}`;
      },
    },
    {
      field: "description",
      headerName: "description",
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
          (params.value !== null
            ? params.value.slice(2, 10).split("-").reverse().join("-")
            : null)
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      filter: "agMultiColumnFilter",
      filterParams: {
        filter: "agMultiColumnFilter",
      },
    },
    {
      field: "image1Url",
      headerName: "See QOR",
      minWidth: 40,
      cellRenderer: (params: any) => {
        const link1 = params.value;
        return (
          link1 && (
            <a href={link1} target="_blank" rel="noreferrer">
              See QOR
            </a>
          )
        );
      },
    },
    {
      field: "image2Url",
      headerName: "See action",
      minWidth: 40,
      cellRenderer: (params: any) => {
        const link2 = params.value;
        return (
          link2 && (
            <a href={link2} target="_blank" rel="noreferrer">
              See action
            </a>
          )
        );
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
  // const sideBar = useMemo(() => {
  //   return {
  //     toolPanels: ["filters"],
  //   };
  // }, []);

  const gridRef = useRef<any>();

  useEffect(() => {
    dispatch(getQorNcr(selectedBox));
  }, [selectedBox]);

  const [filter, setFilter] = useState("");
  const [filter1, setFilter1] = useState("");
  useEffect(() => {
    getTotal();
  }, [filter, filter1, all]);

  const getTotal = () => {
    const rr = all.flat().filter((t: any) => t.typeR === "QOR");
    const ss: any = rr.filter((filt: any) => filt.status === filter);
    const tt: any = rr.filter(
      (filt: any) =>
        filt.dateRaised.slice(5, 7).split("-").reverse().join("-") === filter1
    );
    const ii: any = rr
      .filter((filt: any) => filt.status === filter)
      .filter(
        (filt: any) =>
          filt.dateRaised.slice(5, 7).split("-").reverse().join("-") === filter1
      );
    if (filter !== "" && filter1 === "") {
      dispatch(updateWw(ss));
    } else if (filter1 !== "" && filter === "") {
      dispatch(updateWw(tt));
    } else if (filter1 !== "" && filter !== "") {
      dispatch(updateWw(ii));
    } else dispatch(updateWw(rr));
  };

  const handleFilterChange = () => {
    gridRef.current.api.getFilterModel().status
      ? setFilter(gridRef.current.api.getFilterModel().status.filter)
      : setFilter("");
    gridRef.current.api.getFilterModel().dateRaised
      ? setFilter1(gridRef.current.api.getFilterModel().dateRaised.filter)
      : setFilter1("");
  };
  return (
    <>
      <div className="" style={{ marginTop: status === "authorized" ? 15 : 0 }}>
        <h2
          className="title1"
          style={{ marginBottom: status === "authorized" ? 110 : 0 }}
        >
          QOR Data Records
        </h2>

        {status === "manager" && (
          <div className="createDeleteB">
            <ModalQOR />
            <div>
              <Button
                variant="outlined"
                color="error"
                size="large"
                className="deleteB"
                onClick={handleDelete}
                style={{ borderColor: "tomato", color: "tomato" }}
              >
                Delete selected
              </Button>
            </div>
          </div>
        )}

        <div
          className="grid"
          style={{
            width: "98%",
            height: 396,
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
                      .filter((x: any) => x.typeR === "QOR")
                      .reverse()}
                    columnDefs={columnDefs}
                    groupIncludeFooter={true}
                    groupIncludeTotalFooter={true}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                    ref={gridRef}
                    onFilterChanged={handleFilterChange}
                    enableCellTextSelection={true}
                    onSelectionChanged={(v: any) =>
                      v.api.getSelectedRows().length === 0
                        ? dispatch(UpdateSelectedBox(""))
                        : dispatch(
                            UpdateSelectedBox(v.api.getSelectedRows()[0]._id)
                          )
                    }
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
                  Total = {ww !== undefined && ww.length} QOR
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

export default Log;
