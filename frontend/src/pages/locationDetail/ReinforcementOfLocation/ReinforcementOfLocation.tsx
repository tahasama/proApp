import { useEffect } from "react";
import "./ReinforcementOfLocation.css";
import { useParams } from "react-router-dom";

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
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import {
  getAllReinforcements,
  getReinforcementsByItp,
  ReinforcementData,
} from "../../../state/reducers/reinforcementSlice";
import Button from "@mui/material/Button";
import { labelsName } from "../../../constants/constant";
import { Box, useTheme } from "@mui/material";

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

const ReinforcementOfLocation = () => {
  const dispatch = useAppDispatch();
  const { all } = useAppSelector(ReinforcementData);
  const { itp } = useParams();

  useEffect(() => {
    dispatch(getReinforcementsByItp(itp));
    dispatch(getAllReinforcements());
  }, [itp, dispatch]);

  let itpName =
    itp === "secondaryClarifierP24" ||
    itp === "secondaryClarifierP25" ||
    itp === "secondaryClarifierP32"
      ? "Secondary Clarifiers"
      : itp === "PrimaryClarifierP7" ||
        itp === "PrimaryClarifierP8" ||
        itp === "PrimaryClarifierP9"
      ? "Primary Clarifiers"
      : itp;
  const morFilterated = all
    .flat()
    .filter((i: any) => {
      return itp === "secondaryClarifierP24" ||
        itp === "secondaryClarifierP25" ||
        itp === "secondaryClarifierP32"
        ? i.itp === "secondaryClarifier"
        : itp === "PrimaryClarifierP7" ||
          itp === "PrimaryClarifierP8" ||
          itp === "PrimaryClarifierP9"
        ? i.itp === "PrimaryClarifier"
        : itp === i.itp;
    })
    .map((xxv: any) => xxv.quantity)
    .reduce((nn: any, mm: any) => nn + mm, 0);

  const data = {
    labels: [itpName + "(%)", "Other Locations (%)"],
    datasets: [
      {
        data: [
          (morFilterated * 100) /
            all
              .flat()
              .map((xxv: any) => xxv.quantity)
              .reduce((nn: any, mm: any) => nn + mm, 0),
          ((all
            .flat()
            .map((xxv: any) => xxv.quantity)
            .reduce((nn: any, mm: any) => nn + mm, 0) -
            morFilterated) *
            100) /
            all
              .flat()
              .map((xxv: any) => xxv.quantity)
              .reduce((nn: any, mm: any) => nn + mm, 0),
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
            size: 16, // Set the desired font size
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
        color: "#cfe0e3", // Set the desired font color
      },
    },
  };

  const optionsLine = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 16, // Set the desired font size
          },
          color: "#cfe0e3", // Set the desired font color
        },
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
      .filter((i: any) => {
        return itp === "secondaryClarifierP24" ||
          itp === "secondaryClarifierP25" ||
          itp === "secondaryClarifierP32"
          ? i.itp === "secondaryClarifier"
          : itp === "PrimaryClarifierP7" ||
            itp === "PrimaryClarifierP8" ||
            itp === "PrimaryClarifierP9"
          ? i.itp === "PrimaryClarifier"
          : itp === i.itp;
      })
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

  const data2: any = {
    labels: labelsName,

    datasets: [
      {
        label: "Reinforcement used per month",
        data: uu1,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(75, 142, 192, 0.2)",

        tension: 0.3,
        fill: true,
      },
    ],
  };
  const theme = useTheme();

  return (
    <Box width="100%" p={2}>
      <Box width={"100%"} display={"flex"} justifyContent={"center"}>
        <Button
          variant="contained"
          style={{
            marginBottom: 2,
            cursor: "auto",
            fontSize: "1rem",
            borderRadius: "8px",
          }}
          sx={{ paddingX: 15, paddingY: 2 }}
        >
          Total = &nbsp;
          {all
            .flat()
            .filter((i: any) => {
              return (
                ((itp === "secondaryClarifierP24" ||
                  itp === "secondaryClarifierP25" ||
                  itp === "secondaryClarifierP32") &&
                  i.itp === "secondaryClarifier") ||
                ((itp === "PrimaryClarifierP7" ||
                  itp === "PrimaryClarifierP8" ||
                  itp === "PrimaryClarifierP9") &&
                  i.itp === "PrimaryClarifier") ||
                itp === i.itp
              );
            })
            .map((x: any) => x.quantity)
            .reduce((a, b) => a + b, 0)}
          &nbsp; Kg
        </Button>
      </Box>

      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
        mt={4}
      >
        {/* Line Chart */}
        <Box width="100%" maxWidth={{ xs: "100%", md: "58%" }} mb={2}>
          <Line options={optionsLine} data={data2} />
        </Box>

        {/* Pie Chart */}
        <Box width="100%" maxWidth={{ xs: "100%", md: "32%" }}>
          <Pie options={optionsPie} data={data} />
        </Box>
      </Box>
    </Box>
  );
};

export default ReinforcementOfLocation;
