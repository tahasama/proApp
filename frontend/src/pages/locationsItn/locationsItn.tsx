import React, { useEffect, useState } from "react";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { getItnsByItp, itnData } from "../../state";
import { Link, useParams } from "react-router-dom";

import "./locationsItn.css";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const LocationsItn = (itp: any) => {
  const dispatch = useAppDispatch();
  const { allitp, all } = useAppSelector(itnData);
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
    "Reinforcement & Formwork",
    "Concrete placing and finishing",
    "Curing",
    "Waterproofing coat",
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
  // const labels = ["January", "February", "March", "April", "May", "June"];
  let itpName = itp.itp;
  // const itnByLoc = (allitp.flat().length / all.flat().length) * 100;
  const data = {
    labels: [itpName, "Other ITN"],
    datasets: [
      {
        data: [allitp.flat().length, all.flat().length - allitp.flat().length],
        backgroundColor: ["rgba(54, 162, 235, 0.3)", "rgba(255, 99, 132, 0.3)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
        // maintainAspectRatio: false,
        fill: true,
      },
    ],
  };

  const optionsPie = {
    // responsive: true,
    responsive: true,
    maintainAspectRatio:true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };
  const optionsLine = {
    // responsive: true,
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  let u = allitp
    .flat()
    .map((x: any) => new Date(x.dateOfInspection).getMonth() + 1);
  const labelsName: any = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const labels: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let a: any[] = [];
  let b: any[] = [];
  let c: any[] = [];
  let d: any[] = [];
  let e: any[] = [];
  let f: any[] = [];
  let g: any[] = [];
  let h: any[] = [];
  let i: any[] = [];
  let j: any[] = [];
  let k: any[] = [];
  let l: any[] = [];
  let dict: any = {};

  u.forEach((val, index) => {
    if (val === 1) {
      a.push(index);
      dict[1] = a.length;
    } else if (val === 2) {
      b.push(index);
      dict[2] = b.length;
    } else if (val === 3) {
      c.push(index);
      dict[3] = c.length;
    } else if (val === 4) {
      d.push(index);
      dict[4] = d.length;
    } else if (val === 5) {
      e.push(index);
      dict[5] = e.length;
    } else if (val === 6) {
      f.push(index);
      dict[6] = f.length;
    } else if (val === 7) {
      g.push(index);
      dict[7] = g.length;
    } else if (val === 8) {
      h.push(index);
      dict[8] = h.length;
    } else if (val === 9) {
      i.push(index);
      dict[9] = i.length;
    } else if (val === 10) {
      j.push(index);
      dict[10] = j.length;
    } else if (val === 11) {
      k.push(index);
      dict[11] = k.length;
    } else if (val === 12) {
      l.push(index);
      dict[12] = l.length;
    }
  });
  let uu: any = [];
  labels.map((i: any) => {
    dict[i] !== undefined ? uu.push(dict[i]) : uu.push(0);
  });

  const data2: any = {
    labels: labelsName,

    datasets: [
      {
        label: "ITN per month",

        // data: [2, 3, 1, 4, 2, 3, 4, 2, 1, 5, 6],
        data: uu,
        borderColor: "rgb(54, 162, 235)",

        backgroundColor: "rgba(75, 142, 192, 0.2)",

        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div className="cover">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={3} className="boxes">
            <Item
              style={{
                position: "fixed",
                marginLeft: -18,
                marginTop: 6,
                width: 333,
              }}
            >
              <p style={{ margin: 0, padding: 0 }}>Stats:</p>
              <div className="PieDimension">
                <Pie
                  options={optionsPie}
                  data={data}
                  style={{ padding: 30, marginTop: -30 }}
            
                />
              </div>
              <div>
                <Line
                  options={optionsLine}
                  data={data2}
                  style={{ width: 340, marginTop: -20 }}
                />
              </div>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item
              style={{ position: "fixed", marginLeft: 339, marginTop: -10 }}
            >
              <p style={{ margin: 0, padding: 0 }}>Filter By: </p>
              {routine.map((i: any) => (
                <div onClick={() => setFilterBy(i)} className="filters">
                  {i}
                </div>
              ))}
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item
              style={{
                position: "absolute",
                marginLeft: 619,
                marginTop: -25,
                width: 310,
                paddingLeft: 4,
                paddingRight: 4,
              }}
            >
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
                        <a
                          href={"/" + params.itp + "/" + itn._id}
                          className="tulipeDimensions"
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <h5
                            className="tulipeDimensions"
                            // style={{ marginLeft: 4 }}
                          >
                            QW211101-SNCE-QA-ITN-{handleNumber(itn.num)}
                          </h5>
                          <h6 className="tulipeDimensions"> {itn.routine} </h6>{" "}
                        </a>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
              </Timeline>
            </Item>
          </Grid>
        </Grid>
      </Box>
      <div></div>
    </div>
  );
};

export default LocationsItn;
