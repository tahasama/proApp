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

  const optionsLine = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "left" as const,
      },
      title: {
        display: true,
        text: "QOR Status per month",
        font: { size: 18 },
      },
    },
  };

  const optionsDoughnut = {
    responsive: true,
    maintainAspectRatio: true,

    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "QOR Total per status",
        font: { size: 18 },
      },
    },
  };

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

  return (
    <>
      <Button
        variant="contained"
        style={{
          position: "relative",
          marginTop: 80,
          alignItems: "center",
          padding: 15,
          cursor: "auto",
          width: 500,
          fontSize: 18,
        }}
      >
        Total of QOR = {all.flat().filter((f: any) => f.typeR === "QOR").length}
      </Button>
      <div className="statsQor">
        <Bar
          options={optionsLine}
          data={data}
          style={{
            marginTop: 50,
            backgroundColor: "rgb(210,215,230,0.9)",
          }}
          className="statsQorLine"
        />
        <div className="statsQorDoughnut">
          <Doughnut
            options={optionsDoughnut}
            data={data1}
            style={{
              marginTop: 50,
              backgroundColor: "rgb(210,215,230,0.9)",
              // width: "100%",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Stats;
