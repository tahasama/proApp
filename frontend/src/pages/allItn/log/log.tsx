import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./log.css";

import { Link } from "react-router-dom";

import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { deleteItn, getAllItns, itnData } from "../../../state";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import ModalM from "./modalM/modalM";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const handleNumber = (num: any) => {
  return num < 10 ? "000" + num : num < 100 ? "00" + num : "0" + num;
};

const columns: GridColDef[] = [
  {
    field: "num",
    headerName: "Number",
    width: 210,
    headerAlign: "center",
    align: "center",
    renderCell: (params: any) => (
      <Link style={{ color: "blue" }} to={`/${params.row.itp}/${params.id}`}>
        QW211101-SNCE-QA-ITN-{handleNumber(params.row.num)}
      </Link>
    ),
  },
  {
    field: "itp",
    headerName: "ITP",
    width: 170,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "subLocation",
    headerName: "subLocation",
    width: 120,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "routine",
    headerName: "routine",
    width: 200,
    headerAlign: "center",
    align: "center",
    renderCell: (params: any) => (
      <p
        style={{
          whiteSpace: "pre-wrap",
          maxHeight: 30,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {params.row.routine}{" "}
      </p>
    ),
  },
  {
    field: "dateOfInspection",
    headerName: "dateOfInspection",
    width: 130,
    headerAlign: "center",
    align: "center",
    renderCell: (params: any) => (
      <p style={{ margin: 10 }}>
        {params.row.dateOfInspection
          .slice(0, 10)
          .split("-")
          .reverse()
          .join("-")}
      </p>
    ),
  },
  {
    field: "review",
    headerName: "review",
    width: 70,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "Sinsp",
    headerName: "Snce Inspector",
    width: 120,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "Jinsp",
    headerName: "Jesa Inspector",
    width: 120,
    headerAlign: "center",
    align: "center",
  },
];

const Log = () => {
  const dispatch = useAppDispatch();

  const { all } = useAppSelector(itnData);

  const [x, setx] = useState<any>([]);

  const handleDelete = () => {
    let r = x.slice(-1).flat();
    r.map((f: any) => {
      dispatch(deleteItn(f));
    });
  };

  useEffect(() => {
    dispatch(getAllItns());
  }, [dispatch]);
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
        {all.flat().length !== 1 ? (
          <DataGrid
            getRowId={(row) => row._id}
            rows={all.flat().reverse()}
            columns={columns}
            pageSize={10}
            scrollbarSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            rowCount={x.length}
            onSelectionModelChange={(id: any) => setx((x: any) => [...x, id])}
          />
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
