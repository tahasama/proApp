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

export default function SelectStuff({ individualReinforcement }: any) {
  const dispatch = useDispatch();
  const { all } = useAppSelector(itnData);
  const [location, setLocation] = useState<any>();
  const [type, setType] = useState<any>();
  const [review, setReview] = useState<any>();

  const locations = ["secondaryClarifier", "PrimaryClarifier", "aerationTank"];
  const types = ["Reinforcement", "Conduites"];
  const reviews = ["C1", "C2", "C3"];
  const handleNumber = (num: any) => {
    return num < 10 ? "000" + num : num < 100 ? "00" + num : "0" + num;
  };

  console.log("maaadjkljiedfgv", individualReinforcement);
  const handleLocationChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value as string);
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };
  const handleReviewChange = (event: SelectChangeEvent) => {
    setReview(event.target.value as string);
  };

  useEffect(() => {
    dispatch(getAllReinforcements());
  }, []);

  useEffect(() => {
    dispatch(
      UpdateValuesOfSelect({
        newLocation: location,
        newType: type,
        newReview: review,
      })
    );
  }, [location, type, review]);
  console.log("itnsssssss", all);
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Location</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
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
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue="Reinforcement"
          value={type !== undefined && type}
          label="Type"
          onChange={handleTypeChange}
        >
          {types.map((d: any) => (
            <MenuItem value={d} key={d}>
              {d}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <InputLabel id="demo-simple-select-label">Review</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue="C1"
          value={review !== undefined && review}
          label="Review"
          onChange={handleReviewChange}
        >
          {reviews.map((l: any) => (
            <MenuItem value={l} key={l}>
              {l}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
