import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../state/hooks";

import {
  getAllReinforcements,
  ReinforcementData,
  UpdateValuesOfSelect,
} from "../../../../state/reducers/reinforcementSlice";
import { getAllItns, itnData } from "../../../../state";

export default function SelectStuff(table: any) {
  const dispatch = useDispatch();
  const { all } = useAppSelector(itnData);
  const [location, setLocation] = useState<any>();
  const [type, setType] = useState<any>();
  const [related, setRelated] = useState<any>();

  const locations = [
    "secondaryClarifierP24",
    "secondaryClarifierP25",
    "secondaryClarifierP32",
    "PrimaryClarifierP7",
    "PrimaryClarifierP8",
    "PrimaryClarifierP9",
    "aerationTank",
  ];

  const types = ["B15", "B20", "B35", "B40"];
  const handleNumber = (num: any) => {
    return num < 10 ? "000" + num : num < 100 ? "00" + num : "0" + num;
  };
  const handleLocationChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value as string);
  };

  const handleRelatedChange = (event: SelectChangeEvent) => {
    setRelated(event.target.value as string);
  };

  useEffect(() => {
    dispatch(getAllItns());
  }, []);

  useEffect(() => {
    dispatch(
      UpdateValuesOfSelect({
        newLocation: location,
        newRelated: related,
      })
    );
  }, [location, type, related]);
  console.log("itnsssssss", all);
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Location</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue="aerationTank"
          value={location !== undefined && location}
          label="location"
          onChange={handleLocationChange}
        >
          {locations.map((j: any) => (
            <MenuItem value={j} key={j}>
              {j}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth style={{ marginTop: 12 }}>
        <InputLabel id="demo-simple-select-label">Related Itn</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={related !== undefined && related}
          label="relatedItn"
          onChange={handleRelatedChange}
        >
          {all.flat().map((w: any) => (
            <MenuItem value={w._id} key={w._id}>
              QW211101-SNCE-QA-ITN- {handleNumber(w.num)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
