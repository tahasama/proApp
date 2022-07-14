import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  getAllReinforcements,
  UpdateValuesOfSelect,
} from "../../../../state/reducers/reinforcementSlice";
import { locationsR } from "../../../../constants/constant";

export default function SelectStuff() {
  const dispatch = useDispatch();
  const [location, setLocation] = useState<any>();
  const [type, setType] = useState<any>();
  const [review, setReview] = useState<any>();

  const types = ["Reinforcement", "Conduites"];
  const reviews = ["C1", "C2", "C3"];

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
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      UpdateValuesOfSelect({
        newLocation: location,
        newType: type,
        newReview: review,
      })
    );
  }, [location, type, review]);

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
          {locationsR.map((j: any) => (
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
