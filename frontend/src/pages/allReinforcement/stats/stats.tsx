import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";

import { Box, Button, Card, Typography } from "@mui/material";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";

import {
  getAllReinforcements,
  ReinforcementData,
} from "../../../state/reducers/reinforcementSlice";
import { labelsName, locations, locationsR } from "../../../constants/constant";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Stats = () => {
  const dispatch = useAppDispatch();
  const { all } = useAppSelector(ReinforcementData);

  const optionsPie = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          font: {
            size: 17, // Set the desired font size
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
        display: false,
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

  useEffect(() => {
    dispatch(getAllReinforcements());
  }, [dispatch]);

  //-------------------------------------for doughnut chart start

  let u = all.flat().map((i: any) => i.itp);
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
  let m: any[] = [];
  let n: any[] = [];
  let o: any[] = [];
  let p: any[] = [];
  let q: any[] = [];
  let r: any[] = [];
  let s: any[] = [];
  let dict: any = {};

  const dew = (value: any) =>
    all
      .flat()
      .filter((y: any) => y.itp === value)
      .map((x: any) => x.quantity)
      .reduce((a, b): any => a + b, 0);

  u.forEach((val, index) => {
    if (val === "aerationTank") {
      a.push(dew(val));
      dict[1] = a;
    } else if (val === "PrimaryClarifier") {
      b.push(dew(val));
      dict[2] = b;
    } else if (val === "secondaryClarifier") {
      c.push(dew(val));
      dict[3] = c;
    } else if (val === "mainBuilding") {
      d.push(dew(val));
      dict[4] = d;
    } else if (val === "workShop") {
      e.push(dew(val));
      dict[5] = e;
    } else if (val === "chlorinationTank") {
      f.push(dew(val));
      dict[6] = f;
    } else if (val === "pumpingStation2") {
      g.push(dew(val));
      dict[7] = g;
    } else if (val === "pumpingStation1") {
      h.push(dew(val));
      dict[8] = h;
    } else if (val === "sandFilter") {
      i.push(dew(val));
      dict[9] = i;
    } else if (val === "preliminaryTreatment") {
      j.push(dew(val));
      dict[10] = j;
    } else if (val === "closingWall") {
      k.push(dew(val));
      dict[11] = k;
    } else if (val === "mainStation") {
      l.push(dew(val));
      dict[12] = l;
    } else if (val === "electricalRoom1") {
      m.push(dew(val));
      dict[13] = m;
    } else if (val === "electricalRoom2") {
      n.push(dew(val));
      dict[14] = n;
    } else if (val === "mainStation") {
      o.push(dew(val));
      dict[15] = o;
    } else if (val === "waterPipesNetwork") {
      p.push(dew(val));
      dict[16] = p;
    } else if (val === "sludgeTreatmentBuilding") {
      q.push(dew(val));
      dict[17] = q;
    } else if (val === "digester") {
      r.push(dew(val));
      dict[18] = r;
    }
  });
  const data = {
    labels: locationsR,
    datasets: [
      {
        data: [
          a[0],
          b[0],
          c[0],
          d[0],
          e[0],
          f[0],
          g[0],
          h[0],
          i[0],
          j[0],
          k[0],
          l[0],
          m[0],
          n[0],
          o[0],
          p[0],
          q[0],
          r[0],
          s[0],
        ],
        backgroundColor: [
          "#E74C3C",
          "#AF7AC5",
          "#8E44AD",
          "#2980B9",
          "#3498DB",
          "#1ABC9C",
          "#16A085",
          "#27AE60",
          "#2ECC71",
          "#F1C40F",
          "#F39C12",
          "#E67E22",
          "#D35400",
          "#512E5F",
          "#154360",
          "#0B5345",
          "#7D6608",
          "#6E2C00",
          "#F1948A",
          "#D4EFDF",
          "#FAD7A0",
          "#D5F5E3",
          "#C0392B",
          "#6AD7A0",
          "#A5F5E3",
        ],
        borderColor: [
          "#85C1E9",
          "#85C1E9",
          "#85C1E9",
          "#85C1E9",
          "#85C1E9",
          "#85C1E9",
          "#85C1E9",
          "#85C1E9",
          "#85C1E9",
          "#85C1E9",
          "#85C1E9",
          "#85C1E9",
          "#85C1E9",
          "#85C1E9",
          "#85C1E9",
          "#85C1E9",
          "#85C1E9",
          "#85C1E9",
          "#85C1E9",
          "#85C1E9",
          "#85C1E9",
          "#85C1E9",
          "#85C1E9",
          "#85C1E9",
          "#C0392B",
          "#6AD7A0",
          "#A5F5E3",
        ],
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  //-------------------------------------for doughnut chart end

  //-----------------------------------------------------------------for all itn total per month start
  let u1 = all.flat().map((x: any) => new Date(x.dateOfUsage).getMonth() + 1);

  const labels1: any = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  let a1: any[] = [];
  let b1: any[] = [];
  let c1: any[] = [];
  let d1: any[] = [];
  let e1: any[] = [];
  let f1: any[] = [];
  let g1: any[] = [];
  let h1: any[] = [];
  let i1: any[] = [];
  let j1: any[] = [];
  let k1: any[] = [];
  let l1: any[] = [];
  let dict1: any = {};
  const dew1 = (value: any) =>
    all
      .flat()
      .filter((y: any) => y.dateOfUsage.slice(6, 7) === JSON.stringify(value))
      .map((x: any) => x.quantity)
      .reduce((a, b): any => a + b, 0);

  u1.forEach((val, index) => {
    if (val === 1) {
      a1.push(dew1(val));
      dict1[1] = a1[0];
    } else if (val === 2) {
      b1.push(dew1(val));
      dict1[2] = b1[0];
    } else if (val === 3) {
      c1.push(dew1(val));
      dict1[3] = c1[0];
    } else if (val === 4) {
      d1.push(dew1(val));
      dict1[4] = d1[0];
    } else if (val === 5) {
      e1.push(dew1(val));
      dict1[5] = e1[0];
    } else if (val === 6) {
      f1.push(dew1(val));
      dict1[6] = f1[0];
    } else if (val === 7) {
      g1.push(dew1(val));
      dict1[7] = g1[0];
    } else if (val === 8) {
      h1.push(dew1(val));
      dict1[8] = h1[0];
    } else if (val === 9) {
      i1.push(dew1(val));
      dict1[9] = i1[0];
    } else if (val === 10) {
      j1.push(dew1(val));
      dict1[10] = j1[0];
    } else if (val === 11) {
      k1.push(dew1(val));
      dict1[11] = k1[0];
    } else if (val === 12) {
      l1.push(dew1(val));
      dict1[12] = l1[0];
    }
  });
  let uu1: any = [];
  labels1.map((i: any) => {
    return dict1[i] !== undefined ? uu1.push(dict1[i]) : uu1.push(0);
  });

  const data1: any = {
    labels: labelsName,

    datasets: [
      {
        label: "Total reinforcement used per month",
        data: uu1,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(75, 142, 192, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      gap={4}
      p={0}
      sx={{
        transform: { xs: "scale(1)", sm: "scale(.87)", lg: "scale(.73)" },
        mt: { xs: 9, lg: -12 },
      }}
    >
      <Box
        p={2}
        width={{ xs: "100%", md: "45%" }} // Set width to 33.33% for the first box (1/3 of the width)
        sx={{
          backgroundColor: "rgba(96, 48, 150, 0.35)",
          borderRadius: 10,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          color="primary.light"
          mb={{ sx: 0, md: 10 }}
          textAlign={{ sx: "left", md: "center" }}
        >
          Distribution of Reinforcement (kg)
        </Typography>
        <Doughnut data={data} options={optionsPie} />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap={4}
        width={{ xs: "100%", md: "55%" }} // Set width to 66.66% for the second box (2/3 of the width)
        sx={{}}
        justifyContent={"center"}
      >
        <Box
          p={2}
          sx={{
            backgroundColor: "rgba(96, 48, 150, 0.35)",
            borderRadius: 10,
          }}
        >
          <Typography variant="h6" gutterBottom color="primary.light">
            Total reinforcement used per month (kg)
          </Typography>
          <Line data={data1} options={optionsLine} />
        </Box>
      </Box>
    </Box>
  );
};

export default Stats;
