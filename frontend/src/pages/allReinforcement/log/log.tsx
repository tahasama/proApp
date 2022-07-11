import { Button } from "@mui/material";
import { useEffect, useState } from "react";
// import ModalM from "./modalM/modalM";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
// import "./log.css";
import { Link } from "react-router-dom";
import {
  deleteReinforcement,
  getAllReinforcements,
  ReinforcementData,
  updateWw,
} from "../../../state/reducers/reinforcementSlice";
import ModalN from "../modal/modalN";
import { getAuthData } from "../../../state/reducers/authSlice";

const handleNumber = (num: any) => {
  return num < 10 ? "000" + num : num < 100 ? "00" + num : "0" + num;
};

const Log = () => {
  const dispatch = useAppDispatch();
  const { user, status, uid, newstatus, email } = useAppSelector(getAuthData);

  const { all, ww } = useAppSelector(ReinforcementData);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [selected, setSelected] = useState();

  const handleDelete = () => {
    dispatch(deleteReinforcement(selected));
    setTimeout(() => {
      dispatch(getAllReinforcements());
    }, 250);
  };
  useEffect(() => {
    dispatch(getAllReinforcements());
  }, []);
  console.log("ZZZRRRRRRRRRPPPPPPP", all);
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "itp",
      headerName: "Location",
      checkboxSelection: true,

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
    },
    {
      field: "relatedItn",
      headerName: "Related ITN",
      cellRenderer: (params: any) => {
        return (
          params.value !== undefined && (
            <Link
              style={{ color: "blue" }}
              to={`/${params.value.itp}/${params.value._id}`}
            >
              QW211101-SNCE-QA-ITN- {handleNumber(params.value.num)}
            </Link>
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
  const sideBar = useMemo(() => {
    return {
      toolPanels: ["filters"],
    };
  }, []);

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

  const initialTotal = all
    .flat()
    .map((ds: any) => ds.quantity)
    .map((v) => (v === undefined ? 0 : v))
    .reduce((a, b) => a + b, 0);

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
    <div className="log1">
      <div>
        <h2 className="title4">Reinforcement Data Records</h2>
      </div>
      {status === "manager" && (
        <>
          <div className="overrideButtonCreate toUp1">
            <ModalN />
          </div>
          <div>
            <Button
              variant="outlined"
              color="error"
              size="large"
              className="deleteButton"
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
                  rowData={all.flat().reverse()}
                  columnDefs={columnDefs}
                  groupIncludeFooter={true}
                  groupIncludeTotalFooter={true}
                  defaultColDef={defaultColDef}
                  animateRows={true}
                  ref={gridRef}
                  enableCellTextSelection={true}
                  onFilterChanged={handleFilterChange}
                  onSelectionChanged={(v: any) =>
                    setSelected(v.api.getSelectedRows()[0]._id)
                  }
                  rowStyle={{ background: "rgb(0,255,128,0.15)" }}
                ></AgGridReact>
              </div>
            </div>{" "}
            <Button variant="contained" className="total">
              <p>
                TOTAL = {totalreinforcement}
                <i style={{ textTransform: "lowercase" }}>&nbsp;Kg</i>
              </p>
            </Button>
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
