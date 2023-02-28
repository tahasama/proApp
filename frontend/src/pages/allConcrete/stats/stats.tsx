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
import {
  concreteData,
  getAllConcretes,
} from "../../../state/reducers/concreteSlice";
import { labelsName, locations } from "../../../constants/constant";
import { Button, Card } from "@mui/material";
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
  const { all } = useAppSelector(concreteData);

  const optionsPie = {
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Distribution of Concrete (m³) (all types)",
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
        text: "Total Concrete Poured per month (m³)",
        font: { size: 16 },
      },
    },
  };

  useEffect(() => {
    dispatch(getAllConcretes());
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
  let n: any[] = [];
  let o: any[] = [];
  let p: any[] = [];
  let q: any[] = [];
  let r: any[] = [];
  let s: any[] = [];
  let t: any[] = [];
  let v: any[] = [];
  let w: any[] = [];
  let x: any[] = [];
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
    } else if (val === "PrimaryClarifierP7") {
      b.push(dew(val));
      dict[2] = b;
    } else if (val === "PrimaryClarifierP8") {
      c.push(dew(val));
      dict[3] = c;
    } else if (val === "PrimaryClarifierP9") {
      d.push(dew(val));
      dict[4] = d;
    } else if (val === "secondaryClarifierP24") {
      e.push(dew(val));
      dict[5] = e;
    } else if (val === "secondaryClarifierP25") {
      f.push(dew(val));
      dict[6] = f;
    } else if (val === "secondaryClarifierP32") {
      g.push(dew(val));
      dict[7] = g;
    } else if (val === "mainBuilding") {
      h.push(dew(val));
      dict[8] = h;
    } else if (val === "workShop") {
      i.push(dew(val));
      dict[9] = i;
    } else if (val === "chlorinationTank") {
      j.push(dew(val));
      dict[10] = j;
    } else if (val === "pumpingStation2") {
      k.push(dew(val));
      dict[11] = k;
    } else if (val === "pumpingStation1") {
      l.push(dew(val));
      dict[12] = l;
    } else if (val === "sandFilter") {
      m.push(dew(val));
      dict[13] = m;
    } else if (val === "preliminaryTreatment") {
      n.push(dew(val));
      dict[14] = n;
    } else if (val === "closingWall") {
      o.push(dew(val));
      dict[15] = o;
    } else if (val === "blowersRoom") {
      p.push(dew(val));
      dict[16] = p;
    } else if (val === "mainStation") {
      q.push(dew(val));
      dict[17] = q;
    } else if (val === "electricalRoom1") {
      r.push(dew(val));
      dict[18] = r;
    } else if (val === "electricalRoom2") {
      s.push(dew(val));
      dict[19] = s;
    } else if (val === "waterPipesNetwork") {
      t.push(dew(val));
      dict[20] = t;
    } else if (val === "sludgeTreatmentBuilding") {
      v.push(dew(val));
      dict[21] = v;
    } else if (val === "digester1") {
      w.push(index);
      dict[22] = w;
    } else if (val === "digester2") {
      x.push(index);
      dict[23] = x;
    }
  });
  const data = {
    labels: locations,
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
          t[0],
          v[0],
          w[0],
          x[0],
        ],
        backgroundColor: [
          "#C0392B",
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
          "#A09090",
          "#FAD7A0",
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
    dict1[i] !== undefined ? uu1.push(dict1[i]) : uu1.push(0);
  });

  const data1: any = {
    labels: labelsName,

    datasets: [
      {
        label: "Total concrete poured this month",
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
      <Card className="buttonn1" style={{ marginTop: 5, marginLeft: 130 }}>
        <TipsAndUpdatesIcon color="warning" /> click on a location to show/hide
        it on the chart
      </Card>
      <div
        className="DoughnutDimension"
        style={{ marginLeft: -40, marginRight: 0, padding: 0, width: "34%" }}
      >
        <Doughnut
          options={optionsPie}
          data={data}
          style={{ marginTop: -84, backgroundColor: "rgb(210,215,230,0.9)" }}
        />
      </div>
      <div></div>
      <div
        className="LineDimension"
        style={{
          margin: 0,
          padding: 0,
          width: "38%",
        }}
      >
        <Line
          options={optionsLine}
          data={data1}
          style={{
            width: 522,

            marginTop: 0,

            backgroundColor: "rgb(210,215,230,0.9)",
          }}
        />
      </div>
      <div
        className="BarDimension"
        style={{
          marginTop: -90,

          padding: "0 30px",
          width: 520,
          marginLeft: -19,
        }}
      >
        <StatsPerReview all={all} />
      </div>
    </div>
  );
};

export default Stats;
