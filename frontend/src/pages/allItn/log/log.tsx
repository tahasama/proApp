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

const handleNumber = (num: any) => {
  return num < 10 ? "000" + num : num < 100 ? "00" + num : "0" + num;
};

const Log = () => {
  const dispatch = useAppDispatch();

  const { all } = useAppSelector(itnData);

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
      valueGetter: (params: any) => {
        return params.data !== undefined && params.data;
      },
      cellRenderer: (params: any) => {
        console.log("her is an itn number", params.value.num);

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
      filter: "agTextColumnFilter",
    },
    {
      field: "subLocation",
      headerName: "Sub-Location",
      filter: "agTextColumnFilter",
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

      <div className="grid" style={{ width: "100%" }}>
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
                  // onFilterChanged={handleFilterChange}
                  onSelectionChanged={(v: any) =>
                    setSelected(v.api.getSelectedRows()[0]._id)
                  }
                ></AgGridReact>
              </div>
            </div>{" "}
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
