import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import "./allItn.css";
import { useEffect, useState } from "react";
import { deleteItn, removeItns, getAllItns, itnData } from "../../state";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Link } from "react-router-dom";
import "./allItn.css";

const handleNumber = (num: any) => {
  return num < 10 ? "000" + num : num < 100 ? "00" + num : "0" + num;
};

const columns: GridColDef[] = [
  {
    field: "num",
    headerName: "Number",
    width: 250,
    renderCell: (params: any) => (
      <Link to={`/${params.row.itp}/${params.id}`}>
        QW211101-SNCE-QA-ITN-{handleNumber(params.row.num)}
      </Link>
    ),
  },
  { field: "itp", headerName: "ITP", width: 150 },
  { field: "subLocation", headerName: "subLocation", width: 150 },
  { field: "routine", headerName: "routine", width: 150 },
  {
    field: "dateOfInspection",
    headerName: "dateOfInspection",
    width: 150,
    renderCell: (params: any) => (
      <p>{`${new Date(params.row.dateOfInspection).toLocaleDateString(
        navigator.language,
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )}`}</p>
    ),
  },
  { field: "review", headerName: "review", width: 150 },
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
  // const [data, setData] = useState(all.flat());

  let x: any[] = [];

  console.log("things to eliminate", x.length);

  const handleDelete = () => {
    // x.map((i: any) => (dispatch(deleteItn(i)), x.pop()));
    for (let index = 0; index < x.length; index++) {
      const element = x[index];
      console.log("element", element[index]);
      dispatch(deleteItn(element[index]));
      dispatch(removeItns(element[index]));
    }
  };

  useEffect(() => {
    dispatch(getAllItns());
    // setData(data);
  }, []);

  console.log("Proooooooooo", newAll);
  return (
    <div style={{ height: 500, width: "100%" }}>
      <button onClick={handleDelete}>Delete Selction</button>
      {all.flat().length !== 1 ? (
        <DataGrid
          getRowId={(row) => row._id}
          rows={all.flat()}
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
  );
}
