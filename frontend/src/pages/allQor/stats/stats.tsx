import "./stats.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import { labelsName } from "../../../constants/constant";
import { useAppSelector } from "../../../state/hooks";
import { QorNcrData } from "../../../state/reducers/qorNcrSlice";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";

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

const Stats = () => {
  const { all, ww, selectedBox } = useAppSelector(QorNcrData);

  const labels: any = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  let uu: any = [];
  let uu1: any = [];
  let uu2: any = [];

  //===============================================================================the function start
  const lm = (v: any) => {
    const uuu = labels.map(
      (l: any) =>
        all
          .flat()
          .filter((f: any) => f.typeR === "QOR")
          .filter((f: any) => f.status === v)
          .filter((d: any) => d.dateRaised.slice(6, 7) === JSON.stringify(l))
          .length
    );
    v === "Closed" && uu.push(uuu);
    v === "Open" && uu1.push(uuu);
    v === "Pending" && uu2.push(uuu);
  };
  //==============================================================================the function end
  //==============================================================================location start

  lm("Closed");
  lm("Open");
  lm("Pending");

  const data: any = {
    labels: labelsName,

    datasets: [
      {
        label: "Closed",
        data: uu.flat(),
        borderColor: "#256fff",
        backgroundColor: "#256fff",
        tension: 0.3,
      },
      {
        label: "Open",
        data: uu1.flat(),
        borderColor: "#ff0044",
        backgroundColor: "#ff0044",

        tension: 0.3,
      },
      {
        label: "Pending",
        data: uu2.flat(),

        borderColor: "#85c600",
        backgroundColor: "#85c600",
        tension: 0.3,
      },
    ],
  };
  const statuss = ["Closed", "Pending", "Open"];

  const data1 = {
    labels: statuss,
    datasets: [
      {
        data: [
          uu.flat().reduce((a: any, b: any) => a + b),
          uu2.flat().reduce((a: any, b: any) => a + b),
          uu1.flat().reduce((a: any, b: any) => a + b),
        ],
        backgroundColor: ["#256fff", "#85c600", "#ff0044"],
        borderColor: ["#cccccc", "#cccccc", "#cccccc"],

        borderWidth: 1,
        fill: false,
      },
    ],
  };

  const optionsDoughnut = {
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

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      gap={4}
      p={0}
      sx={{
        transform: { xs: "scale(1)", sm: "scale(.87)", lg: "scale(.73)" },
        mt: { xs: 9, lg: 5 },
      }}
    >
      <Box
        p={2}
        width={{ xs: "100%", md: "35%" }} // Set width to 33.33% for the first box (1/3 of the width)
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
          QOR Total per status
        </Typography>
        <Doughnut data={data1} options={optionsDoughnut} />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap={4}
        width={{ xs: "100%", md: "65%" }} // Set width to 66.66% for the second box (2/3 of the width)
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
            QOR Status per month
          </Typography>
          <Bar options={optionsLine} data={data} />
        </Box>
      </Box>
    </Box>
  );
};

export default Stats;
