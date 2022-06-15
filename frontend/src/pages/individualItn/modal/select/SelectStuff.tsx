import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppSelector } from "../../../../state/hooks";
import { itnData, UpdateValuesOfSelect } from "../../../../state";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function SelectStuff(table: any) {
  const dispatch = useDispatch();
  const { individualItn } = useAppSelector(itnData);
  const [location, setLocation] = useState<any>(individualItn.itp);
  const [routine, setRoutine] = useState<any>(individualItn.routine);
  const [review, setReview] = useState<any>(individualItn.review);

  const locations = [
    "secondaryClarifierP24",
    "secondaryClarifierP25",
    "secondaryClarifierP32",
    "PrimaryClarifierP7",
    "PrimaryClarifierP8",
    "PrimaryClarifierP9",
    "aerationTank",
  ];

  const routines = [
    "all",
    "Setting Out",
    "Excavation until foundation Bottom",
    "Conduites Installation ",
    "Lean Concrete",
    "Mass Concrete",
    "Reinforcement Steel & Formwork Installations",
    "Concrete placing and finishing",
    "Curing",
    "Waterproofing coat ",
    "Backfilling",
    "Treatement protection layer",
    "Concrete Tests",
  ];

  const reviews = ["C1", "C2", "C3", "C4"];

  const handleLocationChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value as string);
  };
  const handleRoutineChange = (event: SelectChangeEvent) => {
    setRoutine(event.target.value as string);
  };
  const handleReviewChange = (event: SelectChangeEvent) => {
    setReview(event.target.value as string);
  };

  useEffect(() => {
    dispatch(
      UpdateValuesOfSelect({
        newLocation: location,
        newRoutine: routine,
        newReview: review,
      })
    );
  }, [location, routine, review]);

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
        <InputLabel id="demo-simple-select-label">Routine</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue="Curing"
          value={routine !== undefined && routine}
          label="routine"
          onChange={handleRoutineChange}
        >
          {routines.map((k: any) => (
            <MenuItem value={k} key={k}>
              {k}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth style={{ marginTop: 12 }}>
        <InputLabel id="demo-simple-select-label">Review</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue="C4"
          value={review !== undefined && review}
          label="review"
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
