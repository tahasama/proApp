import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UpdateValuesOfSelect } from "../../../../../state/reducers/labSlice";
import { locationsL, workbooks } from "../../../../../constants/constant";

export default function SelectStuffLab(individualLab: any) {
  const dispatch = useDispatch();
  const [type, setType] = useState<any>();
  const [location, setLocation] = useState<any>();

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };
  const handleLocationChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value as string);
  };

  useEffect(() => {
    dispatch(
      UpdateValuesOfSelect({
        newType: type,
        newLocation: location,
      })
    );
  }, [type]);
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Location</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={individualLab.individualLab.location}
          label="Location"
          onChange={handleLocationChange}
        >
          {locationsL.map((u: any) => (
            <MenuItem value={u} key={u}>
              {u}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={individualLab.individualLab.typeL}
          label="type"
          onChange={handleTypeChange}
        >
          {workbooks.map((j: any) => (
            <MenuItem value={j} key={j}>
              {j}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
