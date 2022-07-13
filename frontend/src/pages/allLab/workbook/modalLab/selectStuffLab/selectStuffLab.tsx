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

export default function SelectStuffLab(individualLab: any) {
  const dispatch = useDispatch();
  const { all } = useAppSelector(LabData);
  const [type, setType] = useState<any>();
  const [location, setLocation] = useState<any>();

  const locations = [
    "secondaryClarifierP24",
    "secondaryClarifierP25",
    "secondaryClarifierP32",
    "PrimaryClarifierP7",
    "PrimaryClarifierP8",
    "PrimaryClarifierP9",
    "aerationTank",
    "GAT01",
    "GAT02",
    "GAT03",
    "GAT04",
    "Stock",
  ];

  const workbooks = [
    "Compaction Tests",
    "Compression Strength 7 days",
    "Compression Strength 28 days",
    "Concrete Formulation Report",
    "Convenience Report",
    "Geotechnical Study + Excavation Bottom Foundation Check",
    "Preliminairy Report",
    "Material Identification",
  ];

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
          {locations.map((u: any) => (
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
