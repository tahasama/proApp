import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { getAllItns, itnData } from "../../../state";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import "./stats.css";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";
import StatsPerReview from "./statsPerReview/statsPerReview";

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
  const { all } = useAppSelector(itnData);
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

  const optionsPie = {
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Distribution of quality inspections",
        font: { size: 16 },
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
        display: true,
        text: "Total Inspections per month",
        font: { size: 16 },
        // padding: 80,
      },
    },
  };

  useEffect(() => {
    dispatch(getAllItns());
  }, []);

  const locations1 = [
    "aerationTank",
    "PrimaryClarifierP7",
    "PrimaryClarifierP8",
    "PrimaryClarifierP9",
    "secondaryClarifierP24",
    "secondaryClarifierP25",
    "secondaryClarifierP32",
  ];

  //-------------------------------------for doughnut chart start

  let u = all.flat().map((i: any) => i.itp);
  let a: any[] = [];
  let b: any[] = [];
  let c: any[] = [];
  let d: any[] = [];
  let e: any[] = [];
  let f: any[] = [];
  let g: any[] = [];
  let dict: any = {};

  u.forEach((val, index) => {
    if (val === "aerationTank") {
      a.push(index);
      dict[1] = a;
    } else if (val === "PrimaryClarifierP7") {
      b.push(index);
      dict[2] = b;
    } else if (val === "PrimaryClarifierP8") {
      c.push(index);
      dict[3] = c;
    } else if (val === "PrimaryClarifierP9") {
      d.push(index);
      dict[4] = d;
    } else if (val === "secondaryClarifierP24") {
      e.push(index);
      dict[5] = e;
    } else if (val === "secondaryClarifierP25") {
      f.push(index);
      dict[6] = f;
    } else if (val === "secondaryClarifierP32") {
      g.push(index);
      dict[7] = g;
    }
  });

  const data = {
    labels: locations1,
    datasets: [
      {
        data: [
          a.length,
          b.length,
          c.length,
          d.length,
          e.length,
          f.length,
          g.length,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.3)",
          "rgba(54, 162, 235, 0.3)",
          "rgba(255, 206, 86, 0.3)",
          "rgba(75, 192, 192, 0.3)",
          "rgba(153, 102, 255, 0.3)",
          "rgba(255, 159, 64, 0.3)",
          "rgba(225, 119, 64, 0.3)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(235, 119, 64, 1)",
        ],
        borderWidth: 1,
        fill: false,
      },
    ],
  };
  //-------------------------------------for doughnut chart end

  //-----------------------------------------------------------------for all itn total per month start
  let u1 = all
    .flat()
    .map((x: any) => new Date(x.dateOfInspection).getMonth() + 1);

  const labels1: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
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

  u1.forEach((val, index) => {
    if (val === 1) {
      a1.push(index);
      dict1[1] = a1.length;
    } else if (val === 2) {
      b1.push(index);
      dict1[2] = b1.length;
    } else if (val === 3) {
      c1.push(index);
      dict1[3] = c1.length;
    } else if (val === 4) {
      d1.push(index);
      dict1[4] = d1.length;
    } else if (val === 5) {
      e1.push(index);
      dict1[5] = e1.length;
    } else if (val === 6) {
      f1.push(index);
      dict1[6] = f1.length;
    } else if (val === 7) {
      g1.push(index);
      dict1[7] = g1.length;
    } else if (val === 8) {
      h1.push(index);
      dict1[8] = h1.length;
    } else if (val === 9) {
      i1.push(index);
      dict1[9] = i1.length;
    } else if (val === 10) {
      j1.push(index);
      dict1[10] = j1.length;
    } else if (val === 11) {
      k1.push(index);
      dict1[11] = k1.length;
    } else if (val === 12) {
      l1.push(index);
      dict1[12] = l1.length;
    }
  });
  let uu1: any = [];
  labels1.map((i: any) => {
    dict1[i] !== undefined ? uu1.push(dict1[i]) : uu1.push(0);
  });

  const data1: any = {
    labels: labelsName,

    datasets: [
      {
        label: "Total inspections per month",
        data: uu1,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(75, 142, 192, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div>
      <div
        className="DoughnutDimension"
        style={{ margin: 0, padding: 0, width: "30%" }}
      >
        <Doughnut options={optionsPie} data={data} style={{ marginTop: -84 }} />
      </div>

      <div
        className="LineDimension"
        style={{ margin: 0, padding: 0, width: "38%" }}
      >
        <Line
          options={optionsLine}
          data={data1}
          style={{ width: 340, marginTop: -20 }}
        />
      </div>
      <div
        className="BarDimension"
        style={{ margin: 0, padding: 0, width: "38%" }}
      >
        <StatsPerReview all={all} />
      </div>
    </div>
  );
};

export default Stats;
