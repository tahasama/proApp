import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import "./allItn.css";
import { useEffect, useState } from "react";
import { getAllItns, itnData } from "../../state";
import { useAppDispatch, useAppSelector } from "../../state/hooks";

const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 150 },
  { field: "itp", headerName: "ITP", width: 150 },
  { field: "subLocation", headerName: "subLocation", width: 150 },
  { field: "routine", headerName: "routine", width: 150 },
  { field: "dateOfInspection", headerName: "dateOfInspection", width: 150 },
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
  const { all } = useAppSelector(itnData);
  const [data, setData] = useState(all.flat());

  useEffect(() => {
    dispatch(getAllItns());
    setData(data);
  }, []);

  console.log("all itns", data);

  const rows = all.flat();
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        rowCount={rows.length}
      />
    </div>
  );
}
