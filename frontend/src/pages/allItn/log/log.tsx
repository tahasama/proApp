import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import "./log.css";
import { Link } from "react-router-dom";
import { deleteItn, getAllItns, itnData, updateWw } from "../../../state";
import ModalM from "./modalM/modalM";
import JSZip from "jszip";
import { ref } from "firebase/storage";
import * as FileSaver from "file-saver";
import DownloadIcon from "@mui/icons-material/Download";
import { getAuthData } from "../../../state/reducers/authSlice";
import { handleNumber, locations, routines } from "../../../constants/constant";
import { storage } from "../../../firebase";

const Log = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const { all, ww } = useAppSelector(itnData);
  const { status, user } = useAppSelector(getAuthData);

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(
    () => ({
      height: "100%",
      width: "100%",
    }),
    []
  );
  const [selected, setSelected] = useState();

  const handleDelete = () => {
    dispatch(deleteItn(selected));
    setTimeout(() => {
      dispatch(getAllItns());
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
      minWidth: 265,
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
            <> DM2023-OKY-AQ-DOC-{handleNumber(params.value.num)}</>
          </Link>
        ) : (
          <p></p>
        );
      },
    },
    {
      field: "itp",
      headerName: "Location",
      filter: "agTextColumnFilter",
    },
    {
      field: "subLocation",
      headerName: "Sub-Location",
      minWidth: 50,
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
      minWidth: 70,
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
      field: "pdfUrl",
      headerName: "ITN Link",
      minWidth: 70,
      cellRenderer: (params: any) => {
        return params.value !== undefined ? (
          <a
            href={params.value}
            target="_blank"
            rel="noreferrer"
            style={{ color: "blue" }}
          >
            See signed Itn
          </a>
        ) : (
          <p></p>
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

  const gridRef = useRef<any>();
  const [filter, setFilter] = useState("");
  const [filter1, setFilter1] = useState("");
  const [filter2, setFilter2] = useState("");
  const [filter3, setFilter3] = useState("");

  //============================================================
  useEffect(() => {
    getTotal();
  }, [filter, filter1, filter2, filter3, all]);

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
    gridRef.current.api.getFilterModel().review
      ? setFilter3(gridRef.current.api.getFilterModel().review.filter)
      : setFilter3("");
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
    const kk: any = rr.filter((filt: any) => filt.review === filter3);

    const xx: any = rr
      .filter((filt: any) => filt.routine === filter)
      .filter((filt: any) => filt.itp === filter1);
    const yy = rr
      .filter((filt: any) => filt.routine === filter)
      .filter(
        (filt: any) =>
          filt.dateOfInspection.slice(5, 7).split("-").reverse().join("-") ===
          filter2
      );
    const oo: any = rr
      .filter((filt: any) => filt.routine === filter)
      .filter((filt: any) => filt.review === filter3);

    const zz = rr
      .filter((filt: any) => filt.itp === filter1)
      .filter(
        (filt: any) =>
          filt.dateOfInspection.slice(5, 7).split("-").reverse().join("-") ===
          filter2
      );

    const ll: any = rr
      .filter((filt: any) => filt.itp === filter1)
      .filter((filt: any) => filt.review === filter3);

    const mm = rr
      .filter((filt: any) => filt.review === filter3)
      .filter(
        (filt: any) =>
          filt.dateOfInspection.slice(5, 7).split("-").reverse().join("-") ===
          filter2
      );

    const aa: any = rr
      .filter((filt: any) => filt.routine === filter)
      .filter((filt: any) => filt.itp === filter1)
      .filter(
        (filt: any) =>
          filt.dateOfInspection.slice(5, 7).split("-").reverse().join("-") ===
          filter2
      );

    const pp: any = rr
      .filter((filt: any) => filt.routine === filter)
      .filter((filt: any) => filt.itp === filter1)
      .filter((filt: any) => filt.review === filter3);

    const qq: any = rr
      .filter((filt: any) => filt.routine === filter)
      .filter(
        (filt: any) =>
          filt.dateOfInspection.slice(5, 7).split("-").reverse().join("-") ===
          filter2
      )
      .filter((filt: any) => filt.review === filter3);

    const jj: any = rr
      .filter((filt: any) => filt.itp === filter1)
      .filter(
        (filt: any) =>
          filt.dateOfInspection.slice(5, 7).split("-").reverse().join("-") ===
          filter2
      )
      .filter((filt: any) => filt.review === filter3);
    const ii: any = rr
      .filter((filt: any) => filt.routine === filter)
      .filter((filt: any) => filt.itp === filter1)
      .filter(
        (filt: any) =>
          filt.dateOfInspection.slice(5, 7).split("-").reverse().join("-") ===
          filter2
      )
      .filter((filt: any) => filt.review === filter3);

    if (filter !== "" && filter1 === "" && filter2 === "" && filter3 === "") {
      dispatch(updateWw(ss));
    } else if (
      filter1 !== "" &&
      filter === "" &&
      filter2 === "" &&
      filter3 === ""
    ) {
      dispatch(updateWw(tt));
    } else if (
      filter1 === "" &&
      filter === "" &&
      filter2 === "" &&
      filter3 !== ""
    ) {
      dispatch(updateWw(kk));
    } else if (
      filter1 !== "" &&
      filter === "" &&
      filter2 === "" &&
      filter3 !== ""
    ) {
      dispatch(updateWw(ll));
    } else if (
      filter2 !== "" &&
      filter === "" &&
      filter1 === "" &&
      filter3 === ""
    ) {
      dispatch(updateWw(uu));
    } else if (
      filter2 !== "" &&
      filter === "" &&
      filter1 === "" &&
      filter3 !== ""
    ) {
      dispatch(updateWw(mm));
    } else if (
      filter !== "" &&
      filter1 !== "" &&
      filter2 === "" &&
      filter3 === ""
    ) {
      dispatch(updateWw(xx));
    } else if (
      filter !== "" &&
      filter1 !== "" &&
      filter2 === "" &&
      filter3 !== ""
    ) {
      dispatch(updateWw(pp));
    } else if (
      filter !== "" &&
      filter1 === "" &&
      filter2 !== "" &&
      filter3 === ""
    ) {
      dispatch(updateWw(yy));
    } else if (
      filter !== "" &&
      filter1 === "" &&
      filter2 !== "" &&
      filter3 !== ""
    ) {
      dispatch(updateWw(qq));
    } else if (
      filter1 !== "" &&
      filter2 !== "" &&
      filter === "" &&
      filter3 === ""
    ) {
      dispatch(updateWw(zz));
    } else if (
      filter1 !== "" &&
      filter2 !== "" &&
      filter === "" &&
      filter3 !== ""
    ) {
      dispatch(updateWw(jj));
    } else if (
      filter1 !== "" &&
      filter2 !== "" &&
      filter !== "" &&
      filter3 === ""
    ) {
      dispatch(updateWw(aa));
    } else if (
      filter1 !== "" &&
      filter2 !== "" &&
      filter !== "" &&
      filter3 !== ""
    ) {
      dispatch(updateWw(ii));
    } else {
      dispatch(updateWw(rr));
    }
  };

  //============================================================

  const DownloadFolders = async (): Promise<any> => {
    setLoading(true);
    const jszip = new JSZip();
    const xxx: any = jszip.folder("All");
    const proms2 = locations
      .map(async (loca: any) => {
        const ccc: any = xxx.folder(`${loca}`);
        const proms1 = routines
          .map(async (rot: any) => {
            ref(storage, `/itn/${loca}/${rot}`);
            console.log(
              "🚀 ~ file: log.tsx:387 ~ .map ~ storage:",
              `/itn/${loca}/${rot}`
            );

            // const folder = await listAll(ref(storage, `/itn/${loca}/${rot}`));
            // const promises = folder.items
            //   .map(async (item) => {
            //     const file = await getMetadata(item);
            //     const fileRef = ref(storage, item.fullPath);
            //     const fileBlob = await getDownloadURL(fileRef).then(
            //       async (url) => {
            //         const response = await fetch(url);
            //         return await response.blob();
            //       }
            //     );

            //     ccc.file(rot + "/" + file.name, fileBlob);
            //   })
            //   .reduce((acc, curr) => acc.then(() => curr), Promise.resolve());

            // await promises;
          })
          .reduce((acc, curr) => acc.then(() => curr), Promise.resolve());
        await proms1;
      })
      .reduce((acc, curr) => acc.then(() => curr), Promise.resolve());
    await proms2;
    // const blob = await xxx.generateAsync({ type: "blob" });
    // console.log("000", blob);
    // FileSaver.saveAs(blob, `QC.zip`);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  };
  //============================================================

  return (
    <div className="log" style={{ marginTop: 30 }}>
      <h2
        className="title1"
        style={{ marginBottom: status === "authorized" ? 110 : 0 }}
      >
        INSPECTION TEST NOTIFICATIONS
      </h2>

      {status === "manager" && (
        <div className="createDeleteB">
          <ModalM />
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

      <div className="grid" style={{ width: "100%", height: 380 }}>
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
                  onSelectionChanged={(v: any) =>
                    setSelected(v.api.getSelectedRows()[0]._id)
                  }
                  onFilterChanged={handleFilterChange}
                  getRowStyle={(params) => {
                    if (params.data?.review === "C1") {
                      return { background: "rgb(0,0,128,0.15)" };
                    } else if (params.data?.review === "C2") {
                      return { background: "rgb(0,255,0,0.15)" };
                    } else if (params.data?.review === "C3") {
                      return { background: "rgb(255,0,0,0.15)" };
                    } else return { background: "white" };
                  }}
                ></AgGridReact>
              </div>
            </div>{" "}
            <Button variant="contained" className="total1" color="secondary">
              Total = {ww.length} ITN
            </Button>
            {/* <div>
              <Button
                // disabled
                variant="contained"
                color="error"
                className="donwload"
                onClick={DownloadFolders}
                endIcon={loading && <CircularProgress color="secondary" />}
              >
                Download inspections &nbsp;
                <DownloadIcon />
              </Button>
            </div> */}
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
