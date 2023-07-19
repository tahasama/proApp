import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";

import {
  deleteReinforcement,
  getAllReinforcements,
  getReinforcement,
  ReinforcementData,
  UpdateSelectedBox,
  updateWw,
} from "../../../state/reducers/reinforcementSlice";
import ModalN from "../modal/modalN";
import { getAuthData } from "../../../state/reducers/authSlice";
import { handleNumber } from "../../../constants/constant";

const Log = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(getAuthData);
  const { selectedBox } = useAppSelector(ReinforcementData);
  const { all, ww } = useAppSelector(ReinforcementData);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [showother, setShowother] = useState(false);

  const handleDelete = () => {
    dispatch(deleteReinforcement(selectedBox));
    setTimeout(() => {
      dispatch(getAllReinforcements());
    }, 250);
  };

  useEffect(() => {
    dispatch(getAllReinforcements());
  }, []);

  useEffect(() => {
    dispatch(getReinforcement(selectedBox));
  }, [selectedBox]);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "numY",
      headerName: "Number",
      checkboxSelection: true,
      minWidth: 270,
      cellRenderer: (params: any) => {
        return params.value !== undefined &&
          params.value !== "" &&
          params.value !== null
          ? `DM2023-OKY-AQ-MAT-${handleNumber(params.value)}`
          : "DM2023-OKY-AQ-MAT-0000";
      },
    },
    {
      field: "itp",
      headerName: "Location",

      filter: "agTextColumnFilter",

      filterParams: {
        defaultOption: "startsWith",
        suppressAndOrCondition: true,
      },
    },
    {
      field: "type",
      headerName: "Type",

      filter: "agTextColumnFilter",

      filterParams: {
        defaultOption: "startsWith",
        suppressAndOrCondition: true,
      },
    },
    {
      field: "review",
      headerName: "Review",
      minWidth: 80,
      filter: "agTextColumnFilter",

      filterParams: {
        defaultOption: "startsWith",
        suppressAndOrCondition: true,
      },
    },

    {
      field: "dateOfUsage",
      headerName: "Date",
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
      field: "quantity",
      headerName: "Quantity (Kg)",
      minWidth: 125,
    },
    {
      field: "relatedDocs",
      headerName: "Related Documents (RIR)",
      cellRenderer: (params: any) => {
        const link3 = params.value;

        return (
          link3 && (
            <a href={link3} target="_blank" rel="noreferrer">
              See Docs
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
  const [filter, setFilter] = useState("");
  const [filter1, setFilter1] = useState("");
  const [filter2, setFilter2] = useState("");
  useEffect(() => {
    getTotal();
  }, [filter, filter1, filter2, all]);

  useEffect(() => {
    const vv = ww
      .map((ds: any) => ds.quantity)
      .map((v: any) => (v === undefined ? 0 : v))
      .reduce((a: any, b: any) => a + b, 0);
    setTotalreinforcement(vv);
  }, [ww]);

  const handleFilterChange = () => {
    gridRef.current.api.getFilterModel().itp
      ? setFilter1(gridRef.current.api.getFilterModel().itp.filter)
      : setFilter1("");
    gridRef.current.api.getFilterModel().dateOfUsage
      ? setFilter2(gridRef.current.api.getFilterModel().dateOfUsage.filter)
      : setFilter2("");
  };
  const [totalreinforcement, setTotalreinforcement] = useState();

  const getTotal = () => {
    const rr = all.flat();
    const tt = rr.filter(
      (filt: any) => filt.itp !== null && filt.itp === filter1
    );
    const uu = rr.filter((filt: any) =>
      filt.dateOfUsage !== undefined
        ? filt.dateOfUsage.slice(5, 7).split("-").reverse().join("-") ===
          filter2
        : console.log("it is undefined")
    );

    const zz = rr
      .filter((filt: any) => filt.itp === filter1)
      .filter(
        (filt: any) =>
          filt.dateOfUsage.slice(5, 7).split("-").reverse().join("-") ===
          filter2
      );

    if (filter1 !== "" && filter === "" && filter2 === "") {
      dispatch(updateWw(tt));
    } else if (filter2 !== "" && filter === "" && filter1 === "") {
      dispatch(updateWw(uu));
    } else if (filter1 !== "" && filter2 !== "" && filter === "") {
      dispatch(updateWw(zz));
    } else {
      dispatch(updateWw(rr));
    }
  };

  return (
    <div className="log1" style={{ marginTop: 30 }}>
      <h2
        className="title1"
        style={{ marginBottom: status === "authorized" ? 110 : 0 }}
      >
        Reinforcement Data Records
      </h2>

      {status === "manager" && (
        <div className="createDeleteB">
          <ModalN />
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
          width: "100%",
          height: 388,
          marginTop: status === "authorized" ? 14 : 0,
        }}
      >
        {all.flat().length >= 0 ? (
          <>
            <div style={containerStyle}>
              <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact
                  rowData={
                    showother
                      ? all.flat().reverse()
                      : all
                          .flat()
                          .filter(
                            (n: any) => n.numY !== undefined && n.numY !== null
                          )
                          .reverse()
                  }
                  columnDefs={columnDefs}
                  groupIncludeFooter={true}
                  groupIncludeTotalFooter={true}
                  defaultColDef={defaultColDef}
                  animateRows={true}
                  ref={gridRef}
                  enableCellTextSelection={true}
                  onFilterChanged={handleFilterChange}
                  onSelectionChanged={(v: any) =>
                    v.api.getSelectedRows().length === 0
                      ? dispatch(UpdateSelectedBox(""))
                      : dispatch(
                          UpdateSelectedBox(v.api.getSelectedRows()[0]._id)
                        )
                  }
                  getRowStyle={(params) => {
                    if (params.data?.review === "C1") {
                      return { background: "rgb(0,255,0,0.15)" };
                    } else if (params.data?.review === "C2") {
                      return { background: "rgb(0,0,255,0.15)" };
                    } else if (params.data?.review === "C3") {
                      return { background: "rgb(255,0,0,0.15)" };
                    } else return { background: "white" };
                  }}
                ></AgGridReact>
              </div>
            </div>{" "}
            <Button variant="contained" className="total" style={{ left: -40 }}>
              <p>
                TOTAL = {totalreinforcement}
                <i style={{ textTransform: "lowercase" }}>&nbsp;Kg</i>
              </p>
            </Button>
            {/* <Button
              variant="contained"
              color="inherit"
              style={{ position: "relative", float: "left" }}
              onClick={() => setShowother(!showother)}
            >
              All w/o RIR
            </Button> */}
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress style={{ marginTop: 200 }} size={120} />
          </Box>
        )}
      </div>
    </div>
  );
};

export default Log;
