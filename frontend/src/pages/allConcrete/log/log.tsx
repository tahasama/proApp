import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import "./log.css";

import { Link } from "react-router-dom";

import { Button } from "@mui/material";
import { useEffect, useState } from "react";
// import ModalM from "./modalM/modalM";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  concreteData,
  getAllConcretes,
  updateWw,
  updateX,
} from "../../../state/reducers/concreteSlice";
import React, { useCallback, useMemo, useRef } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";

const handleNumber = (num: any) => {
  return num < 10 ? "000" + num : num < 100 ? "00" + num : "0" + num;
};

const getDate = (value: any) => {
  var dateParts = value.split("/");
  return new Date(
    Number(dateParts[2]),
    Number(dateParts[1]) - 1,
    Number(dateParts[0])
  );
};

const Log = () => {
  const dispatch = useAppDispatch();

  const { all, ww, X } = useAppSelector(concreteData);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  useEffect(() => {
    dispatch(getAllConcretes());
  }, [dispatch]);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "type",
      headerName: "YOHOHOHO my type",

      filter: "agMultiColumnFilter",
      filterParams: {
        filters: [
          {
            filter: "agTextColumnFilter",
            filterParams: {
              defaultOption: "startsWith",
            },
          },
          {
            filter: "agSetColumnFilter",
          },
        ],
      },
    },
    {
      field: "itp",
      filter: "agMultiColumnFilter",
      filterParams: {
        filters: [
          {
            filter: "agNumberColumnFilter",
          },
          {
            filter: "agSetColumnFilter",
          },
        ],
      },
    },
    {
      field: "dateOfUsage",
      filter: "agMultiColumnFilter",
      filterParams: {
        filters: [
          {
            filter: "agNumberColumnFilter",
          },
          {
            filter: "agSetColumnFilter",
          },
        ],
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
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
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
    console.log("filter changed");
  }, [filter, filter1, filter2]);

  useEffect(() => {
    const vv = ww
      .map((ds: any) => ds.quantity)
      .map((v: any) => (v === undefined ? 0 : v))
      .reduce((a: any, b: any) => a + b, 0);
    setTotalconcrete(vv);
  }, [ww]);

  console.log("filter", filter, "filter1", filter1, "filter2", filter2);

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
    // setFilter(
    //   gridRef.current.api.getFilterInstance("type").appliedModel.filter
    // );
    // setFilter1(
    //   gridRef.current.api.getFilterInstance("itp").appliedModel.filter
    // );
    // setFilter2(
    //   gridRef.current.api.getFilterInstance("dateOfUsage").appliedModel.filter
    // );
  };
  const [totalconcrete, setTotalconcrete] = useState();

  const initialTotal = all
    .flat()
    .map((ds: any) => ds.quantity)
    .map((v) => (v === undefined ? 0 : v))
    .reduce((a, b) => a + b);
  // const [ww, setWw] = useState<any>([]);
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
    console.log("uu", uu);
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

    // const uu = rr.filter(
    //   (filt: any) =>
    //     filt.dateOfUsage.slice(5, 7).split("-").reverse().join("-") === filter2
    // );

    // .filter((filt: any) => (filter !== "" ? filt.type === filter : ""))
    // .filter((filt: any) => console.log("hello", filt))

    //     (filter1 !== "" ? filt.itp === filter1 : "") ||
    //     (filter2 !== ""
    //       ? filt.dateOfUsage.slice(5, 7).split("-").reverse().join("-") ===
    //         filter2
    //       : "")
    // )
    // const ww = ss.length === 0 ? tt : tt.length !== 0 ? xx : ss;
    //   uu ||
    //   (ss && tt);
    //   (ss && uu) ||
    //   (tt && uu) ||
    //   (ss && uu && tt);
    // console.log("zz", zz);

    // const bb = ss.length === 0 && tt.length === 0 && uu.length === 0 ? "" : uu;
    // const cc = ss.length === 0 && tt.length === 0 && uu.length !== 0 ? uu : "";
    // const dd = ss.length === 0 && tt.length !== 0 && uu.length === 0 ? tt : zz;
    // const ee = ss.length === 0 && tt.length !== 0 && uu.length !== 0 ? zz : tt;
    // const ff = ss.length !== 0 && tt.length === 0 && uu.length === 0 ? ss : yy;
    // const gg = ss.length !== 0 && tt.length === 0 && uu.length !== 0 ? yy : ss;
    // const hh = ss.length !== 0 && tt.length !== 0 && uu.length === 0 ? xx : aa;
    // const ii = ss.length !== 0 && tt.length !== 0 && uu.length !== 0 ? aa : xx;

    // console.log("ii", ii);

    // const jj = bb.length !== 0 ? bb : cc;
    // const kk = dd.length !== 0 ? dd : ee;
    // const ll = ff.length !== 0 ? ff : gg;
    // const mm = hh.length !== 0 ? hh : ii;

    // console.log("kk", kk);

    // const nn = jj.length !== 0 ? jj : mm;
    // const oo = ll.length !== 0 ? ll : kk;
    // const ww = nn.length !== 0 ? nn : oo;

    // filter !== "" && setWw(ss);
    // filter !== "" && filter1 !== "" && setWw(xx);
    // filter !== "" && filter1 !== "" && filter2 !== "" && setWw(aa);

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

    console.log("WWWWWWWWWWWWWWWW", ww);
  };
  return (
    <div className="log">
      <div className="grid" style={{ width: "100%" }}>
        {all.flat().length !== 1 ? (
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
                  onFilterChanged={handleFilterChange}
                ></AgGridReact>
              </div>
            </div>{" "}
            <Button variant="contained">
              {totalconcrete !== 0 ? (
                <p>{totalconcrete}</p>
              ) : (
                <p>{initialTotal}</p>
              )}
            </Button>
            :
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
