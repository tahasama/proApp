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
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };
  const optionsLine = {
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
    <div className="cover">
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
        <Grid item xs={4}>
          <Item style={{ height: "77vh" }}>
            <p style={{ margin: 0, padding: 0 }}>Stats:</p>
            <div>
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
        <Grid item xs={4}>
          <Item style={{ height: "77vh" }}>
            {" "}
            <span style={{ margin: 0, padding: 0 }}>Filter By: </span>
            {routines.map((i: any) => (
              <div key={i} onClick={() => setFilterBy(i)} className="filters">
                {i}
              </div>
            ))}
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item
            className="example"
            style={{
              width: "100%",
              maxHeight: "77vh",
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
                        href={"/" + itp + "/" + itn._id}
                        className=""
                        style={{
                          cursor: "pointer",
                          width: 4,
                        }}
                      >
                        <h5
                        // style={{ marginLeft: 4 }}
                        >
                          QW211101-SNCE-QA-ITN-{handleNumber(itn.num)}
                        </h5>
                        <h6 className=""> {itn.routine} </h6>{" "}
                      </a>
                    </TimelineContent>
                  </TimelineItem>
                ))}
            </Timeline>
          </Item>
        </Grid>
      </Grid>
    </div>
  );
};

export default LocationsItn;
