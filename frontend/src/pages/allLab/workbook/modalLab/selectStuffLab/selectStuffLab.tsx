import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getAllLab,
  LabData,
  UpdateValuesOfSelect,
} from "../../../../../state/reducers/labSlice";
import { useAppSelector } from "../../../../../state/hooks";
import { locations, workbooks } from "../../../../../constants/constant";

export default function SelectStuffLab(individualLab: any) {
  const dispatch = useDispatch();
  const { all } = useAppSelector(LabData);
  const [type, setType] = useState<any>();
  const [location, setLocation] = useState<any>();

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };
  const handleLocationChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value as string);
  };
  const locationsR = [
    "secondaryClarifier",
    "PrimaryClarifier",
    "aerationTank",
    "mainBuilding",
    "workShop",
    "chlorinationTank",
    "pumpingStation2",
    "pumpingStation1",
    "sandFilter",
    "closingWall",
    "GAT01",
    "GAT02",
    "GAT03",
    "GAT04",
    "Stock",
  ];

  console.log("hhhhhhhhzzzzz", locations);
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
          {locationsR.map((u: any) => (
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
          defaultValue={individualLab.individualLab.type}
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