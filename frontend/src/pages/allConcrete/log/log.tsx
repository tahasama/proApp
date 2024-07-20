import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  concreteData,
  deleteConcrete,
  getAllConcretes,
  updateWw,
} from "../../../state/reducers/concreteSlice";
import { useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import "./log.css";
import ModalR from "../modal/modalR";
import { getAuthData } from "../../../state/reducers/authSlice";

const Log = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(getAuthData);

  const { all, ww } = useAppSelector(concreteData);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [selected, setSelected] = useState();

  const handleDelete = () => {
    dispatch(deleteConcrete(selected));
    setTimeout(() => {
      dispatch(getAllConcretes());
    }, 1000);
  };
  useEffect(() => {
    dispatch(getAllConcretes());
  }, []);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "type",
      checkboxSelection: true,
      headerName: "Type",

      filter: "agColumnFilter",
      filterParams: {
        defaultOption: "startsWith",
        suppressAndOrCondition: true,
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
      headerName: "Quantity (m³)",
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
    setTotalconcrete(vv.toFixed(2));
  }, [ww]);

  const handleFilterChange = () => {
    gridRef.current.api.getFilterModel().type
      ? setFilter(gridRef.current.api.getFilterModel().type.filter)
      : setFilter("");
    gridRef.current.api.getFilterModel().itp
      ? setFilter1(gridRef.current.api.getFilterModel().itp.filter)
      : setFilter1("");
    gridRef.current.api.getFilterModel().dateOfUsage
      ? setFilter2(gridRef.current.api.getFilterModel().dateOfUsage.filter)
      : setFilter2("");
  };
  const [totalconcrete, setTotalconcrete] = useState();

  const getTotal = () => {
    const rr = all.flat();
    const ss: any = rr.filter((filt: any) => filt.type === filter);
    const tt = rr.filter(
      (filt: any) => filt.itp !== null && filt.itp === filter1
    );
    const uu = rr.filter((filt: any) =>
      filt.dateOfUsage !== undefined
        ? filt.dateOfUsage.slice(5, 7).split("-").reverse().join("-") ===
          filter2
        : console.log("it is undefined")
    );
    const xx: any = rr
      .filter((filt: any) => filt.type === filter)
      .filter((filt: any) => filt.itp === filter1);
    const yy = rr
      .filter((filt: any) => filt.type === filter)
      .filter(
        (filt: any) =>
          filt.dateOfUsage.slice(5, 7).split("-").reverse().join("-") ===
          filter2
      );
    const zz = rr
      .filter((filt: any) => filt.itp === filter1)
      .filter(
        (filt: any) =>
          filt.dateOfUsage.slice(5, 7).split("-").reverse().join("-") ===
          filter2
      );
    const aa: any = rr
      .filter((filt: any) => filt.type === filter)
      .filter((filt: any) => filt.itp === filter1)
      .filter(
        (filt: any) =>
          filt.dateOfUsage.slice(5, 7).split("-").reverse().join("-") ===
          filter2
      );

    if (filter !== "" && filter1 === "" && filter2 === "") {
      dispatch(updateWw(ss));
    } else if (filter1 !== "" && filter === "" && filter2 === "") {
      dispatch(updateWw(tt));
    } else if (filter2 !== "" && filter === "" && filter1 === "") {
      dispatch(updateWw(uu));
    } else if (filter !== "" && filter1 !== "" && filter2 === "") {
      dispatch(updateWw(xx));
    } else if (filter !== "" && filter1 === "" && filter2 !== "") {
      dispatch(updateWw(yy));
    } else if (filter1 !== "" && filter2 !== "" && filter === "") {
      dispatch(updateWw(zz));
    } else if (filter1 !== "" && filter2 !== "" && filter !== "") {
      dispatch(updateWw(aa));
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
        Concrete Data Records
      </h2>

      {status === "manager" && (
        <Box
          display={"flex"}
          gap={1}
          justifyContent={"space-between"}
          marginY={2}
        >
          <ModalR />
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
        </Box>
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
                  rowData={all
                    .flat()
                    .sort(
                      (a: any, b: any) =>
                        new Date(b.dateOfUsage).valueOf() -
                        new Date(a.dateOfUsage).valueOf()
                    )}
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
                  getRowStyle={(params) => {
                    if (params.data?.type === "B15") {
                      return { background: "rgb(116, 40, 245 ,0.15)" };
                    } else if (params.data?.type === "B20") {
                      return { background: "rgb(40, 245, 207 ,0.15)" };
                    } else if (params.data?.type === "B25") {
                      return { background: "rgb(145,90,127,0.25)" };
                    } else if (params.data?.type === "B35") {
                      return { background: "rgb(255,255,20,0.15)" };
                    } else if (params.data?.type === "B40") {
                      return { background: "rgb(77,122,127,0.2)" };
                    } else return { background: "white" };
                  }}
                ></AgGridReact>
              </div>
            </div>{" "}
            <Button variant="contained" className="total">
              <p>
                TOTAL = {totalconcrete}
                <i style={{ textTransform: "lowercase" }}>m³</i>
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
