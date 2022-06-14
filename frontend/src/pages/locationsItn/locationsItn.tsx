import  { useEffect, useState } from "react";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { getItnsByItp, itnData } from "../../state";
import {  useParams } from "react-router-dom";

import "./locationsItn.css";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const LocationsItn = (itp: any) => {
  const dispatch = useAppDispatch();
  const { allitp } = useAppSelector(itnData);
  const params = useParams();

  const [filterBy, setFilterBy] = useState("All");

  useEffect(() => {
    dispatch(getItnsByItp(itp));
  }, []);

  const routine = [
    "All",
    "Setting Out",
    "Excavation until foundation Bottom",
    "Conduites Installation ",
    "Lean Concrete",
    "Mass Concrete",
    "Reinforcement Steel Installation",
    "Formwork Installation",
    "Concrete placing and finishing",
    "Curing",
    "Waterproofing coat ",
    "Backfilling",
    "Treatement protection layer",
    "Concrete Tests",
  ];

  const filterByRoutine = allitp.flat().filter((itn: any) => {
    return itn.routine === filterBy;
  });

  const arr = (filterBy !== "All" ? filterByRoutine : allitp).reverse();

  const handleNumber = (num: any) => {
    return num < 10 ? "000" + num : num < 100 ? "00" + num : "0" + num;
  };
  return (
    <div className="cover">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} className="boxes">
          <Grid item xs={1} width={120}>
            <Item
              style={{
                position: "fixed",
                marginLeft: -20,
                color: "pink",
                marginTop: 4,
                padding: 10,
              }}
            >
              <p>Filter By:</p>
            </Item>
          </Grid>
          <Grid item xs={5} width={850}>
            <Item style={{ position: "fixed" }}>
              {routine.map((i: any) => (
                <div onClick={() => setFilterBy(i)} className="filters">
                  {i}
                </div>
              ))}
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Timeline position="alternate">
                {arr
                  .flat()
                  .reverse()
                  .map((itn: any) => (
                    <TimelineItem key={itn._id}>
                      <TimelineOppositeContent color="text.secondary">
                        {new Date(itn.dateOfInspection).toLocaleDateString(
                          navigator.language,
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <div
                          className="linkToItn"
                        >
                          <a href={"/" + params.itp + "/" + itn._id}>
                            {" "}
                            QW211101-SNCE-QA-ITN-{handleNumber(itn.num)}
                            <h6> {itn.routine} </h6>{" "}
                          </a>
                        </div>

             
                      </TimelineContent>
                    </TimelineItem>
                  ))}
              </Timeline>
            </Item>
          </Grid>
        </Grid>{" "}
      </Box>
      <div></div>
    </div>
  );
};

export default LocationsItn;
