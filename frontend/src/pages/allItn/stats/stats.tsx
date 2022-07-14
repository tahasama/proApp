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
import { labelsName, locations } from "../../../constants/constant";

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
      },
    },
  };

  useEffect(() => {
    dispatch(getAllItns());
  }, []);

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
    } else if (val === "mainBuilding") {
      h.push(index);
      dict[8] = h;
    } else if (val === "workShop") {
      i.push(index);
      dict[9] = i;
    } else if (val === "chlorinationTank") {
      j.push(index);
      dict[10] = j;
    } else if (val === "pumpingStation2") {
      k.push(index);
      dict[11] = k;
    } else if (val === "pumpingStation1") {
      l.push(index);
      dict[12] = l;
    } else if (val === "sandFilter") {
      m.push(index);
      dict[13] = m;
    }
  });

  const data = {
    labels: locations,
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
          h.length,
          i.length,
          j.length,
          k.length,
          l.length,
          m.length,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.3)",
          "rgba(54, 162, 235, 0.3)",
          "rgba(255, 206, 86, 0.3)",
          "rgba(75, 192, 192, 0.3)",
          "rgba(153, 102, 255, 0.3)",
          "rgba(255, 159, 64, 0.3)",
          "rgba(225, 119, 64, 0.3)",
          "rgba(125, 59, 84, 0.3)",
          "rgba(135, 79, 44, 0.3)",
          "rgba(95, 187, 124, 0.3)",
          "rgba(245, 93, 222, 0.3)",
          "rgba(89, 219, 190, 0.3)",
          "rgba(45, 100, 64, 0.3)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(235, 119, 64, 1)",
          "rgba(125, 59, 84,1)",
          "rgba(135, 79, 44,1)",
          "rgba(95, 187, 124,1)",
          "rgba(245, 93, 222,1)",
          "rgba(89, 219, 190,1)",
          "rgba(45, 0, 64, 1)",
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
        style={{ margin: 0, padding: 0, width: "31%" }}
      >
        <Doughnut
          options={optionsPie}
          data={data}
          style={{ marginTop: -74, backgroundColor: "rgb(210,215,230,0.9)" }}
        />
      </div>

      <div className="LineDimension" style={{ padding: 0, width: 520 }}>
        <Line
          options={optionsLine}
          data={data1}
          style={{
            marginTop: -22,
            backgroundColor: "rgb(210,215,230,0.8)",
          }}
        />
      </div>
      <div
        className="BarDimension"
        style={{ marginTop: 3, marginLeft: 92, padding: 0, width: 520 }}
      >
        <StatsPerReview all={all} />
      </div>
    </div>
  );
};

export default Stats;
