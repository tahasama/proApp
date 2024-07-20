import { useEffect, useState } from "react";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { getAllItns, getItnsByItp, itnData } from "../../../state";
import { useParams } from "react-router-dom";

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
import {
  handleNumber,
  labelsName,
  routines,
} from "../../../constants/constant";
import { Button, Chip, Typography } from "@mui/material";

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

const LocationsItn = () => {
  const dispatch = useAppDispatch();
  const { allitp, all } = useAppSelector(itnData);
  const { itp } = useParams();

  const [filterBy, setFilterBy] = useState("All");

  useEffect(() => {
    !routines.includes("All") && routines.unshift("All");
  }, []);

  useEffect(() => {
    dispatch(getItnsByItp(itp));
    dispatch(getAllItns());
  }, []);
  const filterByRoutine = allitp.flat().filter((itn: any) => {
    return itn.routine === filterBy;
  });
  const arr = (filterBy !== "All" ? filterByRoutine : allitp).reverse();

  let itpName = itp;

  console.log(allitp, "AND", all);
  const data = {
    labels: [`${itpName} (%)`, "Other ITN (%)"],
    datasets: [
      {
        data: [
          (allitp.flat().length * 100) / all.flat().length,
          ((all.flat().length - allitp.flat().length) * 100) /
            all.flat().length,
        ],
        backgroundColor: ["rgba(54, 162, 235, 0.3)", "rgba(255, 99, 132, 0.3)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const optionsPie = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 14, // Set the desired font size
          },
          color: "#cfe0e3", // Set the desired font color
        },
      },
      title: {
        display: false,
        text: "Distribution of quality inspections",

        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
  };

  const optionsLine = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#2ac50f", // Set the color of the X-axis labels (months names)
          font: {
            size: 15, // Set the font size of the X-axis labels
          },
        },
      },
      y: {
        ticks: {
          color: "#2ac50f", // Set the color of the Y-axis tick marks
          font: {
            size: 15, // Set the font size of the X-axis labels
          },
        },
      },
    },
  };

  let u = allitp
    .flat()
    .map((x: any) => new Date(x.dateOfInspection).getMonth() + 1);

  const labels: any = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
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
    return dict[i] !== undefined ? uu.push(dict[i]) : uu.push(0);
  });

  const data2: any = {
    labels: labelsName,

    datasets: [
      {
        label: "ITN per month",
        data: uu,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(75, 142, 192, 0.2)",

        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <Grid
      container
      columnSpacing={{ xs: 1, md: 2, lg: 3 }}
      rowSpacing={{ xs: 2.5, md: 0 }}
      mt={30}
    >
      <Grid item xs={12} sm={6} md={4}>
        <Paper
          elevation={5}
          style={{
            backgroundColor: "transparent",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: 2,
          }}
        >
          <Typography variant="h6" component="p" color={"GrayText"}>
            Stats:
          </Typography>
          <Box width={"73%"}>
            <Pie options={optionsPie} data={data} />
          </Box>
          <Box width={"100%"}>
            <Line options={optionsLine} data={data2} />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper
          elevation={5}
          style={{ backgroundColor: "transparent", padding: 4 }}
        >
          <Typography variant="h6" component="p" color={"GrayText"}>
            Filter By:
          </Typography>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {routines.map((routine, index) => (
              <li key={index}>
                <Button
                  variant="outlined"
                  onClick={() => setFilterBy(routine)}
                  sx={{
                    my: 0.5,
                    color: "skyblue",
                    cursor: "pointer",
                    width: "100%",
                    "&:hover": {
                      color: "blue",
                      backgroundColor: "rgb(218, 252, 241)",
                      transform: "translate(1px)",
                    },
                  }}
                >
                  {routine}
                </Button>
              </li>
            ))}
          </ul>
        </Paper>
      </Grid>
      <Grid item xs={12} md={5}>
        <Paper
          sx={{
            height: "100%",
            width: "100%",
            // overflowX: "auto",
            backgroundColor: "transparent",
            display: "flex",
            justifyContent: "center",
            // alignItems: "center",
            padding: 5,
          }}
          elevation={5}
        >
          <Timeline
            position="alternate"
            sx={{
              fontFamily: "Arial, sans-serif",
              width: "100%",
              mt: 5,
              flexGrow: 0,
            }}
          >
            {arr
              .flat()
              .reverse()
              .map((itn: any) => (
                <TimelineItem key={itn._id}>
                  <TimelineOppositeContent color="yellowgreen">
                    {new Date(itn.dateOfInspection).toLocaleDateString(
                      navigator.language,
                      { year: "numeric", month: "short", day: "numeric" }
                    )}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <a
                      href={`/${itp}/${itn._id}`}
                      style={{ cursor: "pointer" }}
                    >
                      <Typography fontSize={{ xs: 14, sm: 17 }} color="white">
                        DM2023-OKY-AQ-DOC-{handleNumber(itn.num)}
                      </Typography>
                      <Typography
                        variant="h6"
                        fontSize={{ xs: 12, sm: 15 }}
                        color="skyblue"
                      >
                        {itn.routine}
                      </Typography>
                    </a>
                  </TimelineContent>
                </TimelineItem>
              ))}
          </Timeline>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LocationsItn;
