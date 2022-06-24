import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import "./log.css";

import { Link } from "react-router-dom";

import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
// import ModalM from "./modalM/modalM";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  concreteData,
  getAllConcretes,
} from "../../../state/reducers/concreteSlice";

const handleNumber = (num: any) => {
  return num < 10 ? "000" + num : num < 100 ? "00" + num : "0" + num;
};

const columns: GridColDef[] = [
  {
    field: "type",
    headerName: "Type of Concrete",
    width: 210,
    headerAlign: "center",
    align: "center",
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
    field: "dateOfUsage",
    headerName: "dateOfUsage",
    width: 130,
    headerAlign: "center",
    align: "center",
    renderCell: (params: any) => (
      <p style={{ margin: 10 }}>
        {params.row.dateOfUsage.slice(2, 10).split("-").reverse().join("-")}
      </p>
    ),
  },
  {
    field: "quantity",
    headerName: "Quantity in m3",
    width: 120,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "related Itn",
    headerName: "relatedItn",
    width: 320,
    headerAlign: "center",
    align: "center",
    renderCell: (params: any) =>
      params.row.relatedItn && (
        <Link
          style={{ color: "blue" }}
          to={`/${params.row.itp}/${params.row.relatedItn._id}`}
        >
          QW211101-SNCE-QA-ITN-{handleNumber(params.row.relatedItn.num)}
        </Link>
      ),
  },
];

const Log = () => {
  const [filter, setFilter] = useState("");
  const dispatch = useAppDispatch();

  const { all } = useAppSelector(concreteData);

  const [x, setx] = useState<any>([]);

  //   const handleDelete = () => {
  //     let r = x.slice(-1).flat();
  //     r.map((f: any) => {
  //       dispatch(deleteItn(f));
  //     });
  //   };
  const [totalconcrete, setTotalconcrete] = useState(
    all
      .flat()
      .map((ds: any) => ds.quantity)
      .map((v) => (v === undefined ? 0 : v))
      .reduce((a, b) => a + b, 0)
  );

  useEffect(() => {
    dispatch(getAllConcretes());
  }, []);

  const getTotal = () => {
    let rr = all
      .flat()
      .filter(
        (filt: any) =>
          filt.type === filter ||
          filt.itp === filter ||
          filt.dateOfUsage.slice(5, 7).split("-").reverse().join("-") === filter
      )
      .map((ds: any) => ds.quantity)
      .map((v) => (v === undefined ? 0 : v))
      .reduce((a, b) => a + b, 0);
    setTotalconcrete(rr);
  };

  function filterModelChanged(props: any) {
    setFilter(props.items[0].value);
  }

  return (
    <div className="log">
      <div>
        <h2 className="title1">Concrete Usage</h2>
      </div>

      <div className="overrideButtonCreate toUp">{/* <ModalM /> */}</div>

      {/* <div>
        <Button
          variant="outlined"
          color="error"
          size="large"
          className="deleteButton"
          onClick={handleDelete}
        >
          Delete selected
        </Button>
      </div> */}

      <div className="grid" style={{ width: "100%" }}>
        {all.flat().length !== 1 ? (
          <>
            {" "}
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
              // components={{
              //   Footer: () => <div>hey a footer</div>,
              // }}
              componentsProps={{
                footer: { totalconcrete },
              }}
              onStateChange={getTotal}
              onFilterModelChange={(props) => filterModelChanged(props)}
            />
            <Button variant="contained">{totalconcrete}</Button>
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
