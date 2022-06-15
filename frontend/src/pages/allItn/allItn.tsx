import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  renderActionsCell,
} from "@mui/x-data-grid";
import "./allItn.css";
import { useEffect, useState } from "react";
import { deleteItn, removeItns, getAllItns, itnData } from "../../state";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Link } from "react-router-dom";
import "./allItn.css";
import ModalC from "../locationDetail/modalC/modalC";

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
      <Link to={`/${params.row.itp}/${params.id}`}>
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
    width: 150,
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
    width: 150,
    headerAlign: "center",
    align: "center",
    renderCell: (params: any) => (
      <p style={{ margin: 10 }}>{`${new Date(
        params.row.dateOfInspection
      ).toLocaleDateString(navigator.language, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`}</p>
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
    width: 150,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "Jinsp",
    headerName: "Jesa Inspector",
    width: 150,
    headerAlign: "center",
    align: "center",
  },
];

// // for later use
// console.log(
//   "ffffffff",
//   rows.filter((i: any) => {
//     return i.lastName.includes("ann");
//   }).length
// );

export default function AllItn() {
  const dispatch = useAppDispatch();

  const { all, newAll } = useAppSelector(itnData);
  console.log("my arrray x", all);

  // const [data, setData] = useState(all.flat());

  let x: any[] = [];

  console.log("things to eliminate", x.length);

  const handleDelete = () => {
    // x.map((i: any) => (dispatch(deleteItn(i)), x.pop()));
    for (let index = 0; index < x.length; index++) {
      const element = x[index];
      console.log("element", element[index]);
      setTimeout(() => {
        dispatch(deleteItn(element[index]));
        dispatch(removeItns(element[index]));
        x[index].pop();
      }, 1500);
    }
  };

  useEffect(() => {
    dispatch(getAllItns());
    // setData(data);
  }, []);

  return (
    <div>
      <h2 className="title1 ">INSPECTION TEST NOTIFICATIONS</h2>

      <div className="overrideButtonCreate">
        <ModalC />
      </div>
      <div className="grid" style={{ height: 500, width: "100%" }}>
        <button onClick={handleDelete}>Delete Selction</button>
        {all.flat().length !== 1 ? (
          <DataGrid
            getRowId={(row) => row._id}
            rows={all.flat().reverse()}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            rowCount={all.flat().length}
            onSelectionModelChange={(id: any) => (
              console.log("selected stuff", id), x.push(id)
            )}
          />
        ) : (
          <p>Loading</p>
        )}
      </div>
    </div>
  );
}
