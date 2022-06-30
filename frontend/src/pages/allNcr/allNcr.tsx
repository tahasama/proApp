import { AgGridReact } from "ag-grid-react";
// import { CircularProgress } from "material-ui";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  deleteQorNcr,
  getAllQorNcrs,
  getQorNcr,
  QorNcrData,
  updateWw,
} from "../../state/reducers/qorNcrSlice";
import NavBar from "../Navbar/navbar";
import ModalNCR from "./modal/modalNCR";

const AllNcr = () => {
  const dispatch = useAppDispatch();

  const { all, ww, individualQorNcr } = useAppSelector(QorNcrData);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [selected, setSelected] = useState("");

  const handleDelete = () => {
    dispatch(deleteQorNcr(selected));
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
      field: "ncr",
      headerName: "See NCR",
    },
    {
      field: "ncrRes",
      headerName: "See Response",
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
  }, [filter, filter1, filter2, all]);

  useEffect(() => {
    const vv = ww
      .map((ds: any) => ds.quantity)
      .map((v: any) => (v === undefined ? 0 : v))
      .reduce((a: any, b: any) => a + b, 0);
    setTotalconcrete(vv);
  }, [ww]);

  useEffect(() => {
    dispatch(getQorNcr(selected));
  }, [selected]);
  console.log("12345", individualQorNcr);
  const handleFilterChange = () => {
    gridRef.current.api.getFilterModel().itp
      ? setFilter1(gridRef.current.api.getFilterModel().itp.filter)
      : setFilter1("");
    gridRef.current.api.getFilterModel().dateOfUsage
      ? setFilter2(gridRef.current.api.getFilterModel().dateOfUsage.filter)
      : setFilter2("");
  };
  const [totalconcrete, setTotalconcrete] = useState();

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
    <div className="">
      <div>
        <h2 className="">Concrete Data Records</h2>
      </div>
      <div className="">
        <ModalNCR />
      </div>
      <div>
        <button className="" onClick={handleDelete}>
          Delete selected
        </button>
      </div>
      <div className="grid" style={{ width: "100%", height: 388 }}>
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
                  onFilterChanged={handleFilterChange}
                  onSelectionChanged={(v: any) =>
                    setSelected(v.api.getSelectedRows()[0]._id)
                  }
                ></AgGridReact>
              </div>
            </div>{" "}
            <button className="">
              <p>
                TOTAL = {totalconcrete}
                <i style={{ textTransform: "lowercase" }}>m³</i>
              </p>
            </button>
          </>
        ) : (
          <div>
            {/* <CircularProgress style={{ marginTop: 200 }} size={120} /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllNcr;
