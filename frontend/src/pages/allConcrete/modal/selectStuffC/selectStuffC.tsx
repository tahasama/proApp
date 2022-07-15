import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllItns, itnData, UpdateValuesOfSelect } from "../../../../state";
import { locations } from "../../../../constants/constant";

export default function SelectStuff() {
  const dispatch = useDispatch();
  const [location, setLocation] = useState<any>();
  const [type, setType] = useState<any>();
  // const [related, setRelated] = useState<any>();

  const concretTypes = ["B15", "B20", "B25", "B35", "B40"];

  const handleLocationChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value as string);
  };
  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };
  // const handleRelatedChange = (event: SelectChangeEvent) => {
  //   setRelated(event.target.value as string);
  // };

  useEffect(() => {
    dispatch(getAllItns());
  }, []);

  useEffect(() => {
    dispatch(
      UpdateValuesOfSelect({
        newLocation: location,
        newType: type,
        // newRelated: related,
      })
    );
  }, [location, type]);

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
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type !== undefined && type}
          label="type"
          onChange={handleTypeChange}
        >
          {concretTypes.map((k: any) => (
            <MenuItem value={k} key={k}>
              {k}
            </MenuItem>
          ))}
        </Select>
      </FormControl>{" "}
      {/* <FormControl fullWidth style={{ marginTop: 12 }}>
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
      </FormControl> */}
    </Box>
  );
}
