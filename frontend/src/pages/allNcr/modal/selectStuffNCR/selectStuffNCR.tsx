import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../state/hooks";

import { getAllItns, itnData } from "../../../../state";
import {
  getAllQorNcrs,
  QorNcrData,
  UpdateValuesOfSelect,
} from "../../../../state/reducers/qorNcrSlice";

export default function SelectStuff(table: any) {
  const dispatch = useDispatch();
  const { all } = useAppSelector(QorNcrData);
  const [status, setStatus] = useState<any>();
  const [type, setType] = useState<any>();
  const [related, setRelated] = useState<any>();

  const statusArray = ["Open", "Closed", "Pending"];

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  useEffect(() => {
    dispatch(getAllQorNcrs());
  }, []);

  useEffect(() => {
    dispatch(
      UpdateValuesOfSelect({
        newStatus: status,
      })
    );
  }, [status]);
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue="aerationTank"
          // value={status !== undefined && status}
          label="status"
          onChange={handleStatusChange}
        >
          {statusArray.map((j: any) => (
            <MenuItem value={j} key={j}>
              {j}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
