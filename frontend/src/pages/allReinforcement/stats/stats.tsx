import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
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
import { labelsName, locationsR } from "../../../constants/constant";

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
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Distribution of Reinforcement usage (Kg)",
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
        text: "Total Reinforcement used per month (Kg)",
        font: { size: 16 },
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
      dict[7] = h;
    } else if (val === "sandFilter") {
      i.push(dew(val));
      dict[7] = i;
    } else if (val === "preliminaryTreatment") {
      j.push(dew(val));
      dict[8] = j;
    }
  });
  const data = {
    labels: locationsR,
    datasets: [
      {
        data: [a[0], b[0], c[0], d[0], e[0], f[0], g[0], h[0], i[0], j[0]],
        backgroundColor: [
          "rgba(255, 99, 132, 0.3)",
          "rgba(54, 162, 235, 0.3)",
          "rgba(255, 206, 86, 0.3)",
          "rgba(75, 192, 192, 0.3)",
          "rgba(153, 102, 255, 0.3)",
          "rgba(255, 159, 64, 0.3)",
          "rgba(225, 119, 64, 0.3)",
          "rgba(25, 189, 164, 0.3)",
          "rgba(205, 19, 94, 0.3)",
          "rgba(25, 109, 194, 0.3)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(235, 119, 64, 1)",
          "rgba(225, 119, 64, 1)",
          "rgba(25, 189, 164, 1)",
          "rgba(205, 19, 94, 1)",
          "rgba(25, 109, 194, 1)",
        ],
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  //-------------------------------------for doughnut chart end

  //-----------------------------------------------------------------for all itn total per month start
  let u1 = all.flat().map((x: any) => new Date(x.dateOfUsage).getMonth() + 1);

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
    <div>
      <div
        className="DoughnutDimension"
        style={{ margin: 0, padding: 0, width: "33%" }}
      >
        <Doughnut
          options={optionsPie}
          data={data}
          style={{
            marginTop: -54,
            marginLeft: 60,
            backgroundColor: "rgb(210,215,230,0.9)",
          }}
        />
      </div>

      <div
        className="LineDimension"
        style={{ margin: 0, padding: 0, width: "48%" }}
      >
        <Line
          options={optionsLine}
          data={data1}
          style={{
            width: 340,
            height: "100%",
            marginTop: -240,
            marginLeft: -60,
            backgroundColor: "rgb(210,215,230,0.9)",
          }}
        />
      </div>
    </div>
  );
};

export default Stats;
