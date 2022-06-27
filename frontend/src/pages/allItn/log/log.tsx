import { Button } from "@mui/material";
import { useEffect, useState } from "react";
// import ModalM from "./modalM/modalM";
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
import { Link } from "react-router-dom";
import { deleteItn, getAllItns, itnData } from "../../../state";
import ModalM from "./modalM/modalM";
import { viVN } from "@mui/x-data-grid";

const handleNumber = (num: any) => {
  return num < 10 ? "000" + num : num < 100 ? "00" + num : "0" + num;
};

const Log = () => {
  const dispatch = useAppDispatch();

  const { all, ww } = useAppSelector(itnData);

  const [num, setNum] = useState<any>();

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [selected, setSelected] = useState();

  const handleDelete = () => {
    dispatch(deleteItn(selected));
    setTimeout(() => {
      dispatch(getAllConcretes());
    }, 250);
  };

  useEffect(() => {
    dispatch(getAllItns());
  }, []);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "num",
      checkboxSelection: true,
      headerName: "Number",
      headerClass: "ag-header-cell-center-text",

      valueGetter: (params: any) => {
        return params.data !== undefined && params.data;
      },
      cellRenderer: (params: any) => {
        return params.value.num !== undefined ? (
          <Link
            style={{ color: "blue" }}
            to={`/${params.value.itp}/${params.value._id}`}
          >
            <> QW211101-SNCE-QA-ITN-{handleNumber(params.value.num)}</>
          </Link>
        ) : (
          <p></p>
        );
      },
    },
    {
      field: "itp",
      headerName: "Location",
      // filter: "agTextColumnFilter",
      filter: "agTextColumnFilter",
    },
    {
      field: "subLocation",
      headerName: "Sub-Location",
      // filter: "agTextColumnFilter",
    },
    {
      field: "routine",
      headerName: "Routine",
      filter: "agTextColumnFilter",
    },
    {
      field: "dateOfInspection",
      headerName: "Date",
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
      field: "review",
      headerName: "Review",
    },
    // {
    //   field: "relatedItn",
    //   headerName: "Related ITN",
    // },
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

  //============================================================
  useEffect(() => {
    getTotal();
  }, [filter, filter1, filter2, all]);
  // console.log("jjjjjjjjjjj", filter, "ggggg", filter1, "tttttttt", filter2);

  // useEffect(() => {
  //   const vv: number = ww.length;
  //   // setRowsNumber(vv);
  // }, [ww]);

  const handleFilterChange = () => {
    gridRef.current.api.getFilterModel().routine
      ? setFilter(gridRef.current.api.getFilterModel().routine.filter)
      : setFilter("");
    gridRef.current.api.getFilterModel().itp
      ? setFilter1(gridRef.current.api.getFilterModel().itp.filter)
      : setFilter1("");
    gridRef.current.api.getFilterModel().dateOfInspection
      ? setFilter2(gridRef.current.api.getFilterModel().dateOfInspection.filter)
      : setFilter2("");
  };

  const getTotal = () => {
    const rr = all.flat();
    const ss: any = rr.filter((filt: any) => filt.routine === filter);
    const tt = rr.filter(
      (filt: any) => filt.itp !== null && filt.itp === filter1
    );
    const uu = rr.filter((filt: any) =>
      filt.dateOfInspection !== undefined
        ? filt.dateOfInspection.slice(5, 7).split("-").reverse().join("-") ===
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
          filt.dateOfInspection.slice(5, 7).split("-").reverse().join("-") ===
          filter2
      );
    const zz = rr
      .filter((filt: any) => filt.itp === filter1)
      .filter(
        (filt: any) =>
          filt.dateOfInspection.slice(5, 7).split("-").reverse().join("-") ===
          filter2
      );
    const aa: any = rr
      .filter((filt: any) => filt.type === filter)
      .filter((filt: any) => filt.itp === filter1)
      .filter(
        (filt: any) =>
          filt.dateOfInspection.slice(5, 7).split("-").reverse().join("-") ===
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

  //============================================================

  return (
    <div className="log">
      <div>
        <h2 className="title1">INSPECTION TEST NOTIFICATIONS</h2>
      </div>

      <div className="overrideButtonCreate toUp">
        <ModalM />
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

      <div className="grid" style={{ width: "100%", height: 388 }}>
        {all.flat().length !== 0 ? (
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
                  // onFilterChanged={handleFilterChange}
                  onSelectionChanged={(v: any) =>
                    setSelected(v.api.getSelectedRows()[0]._id)
                  }
                  onFilterChanged={handleFilterChange}
                ></AgGridReact>
              </div>
            </div>{" "}
            <Button variant="contained" className="total">
              <p>
                <i style={{ textTransform: "lowercase" }}>
                  count : {ww.length} row
                </i>
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
