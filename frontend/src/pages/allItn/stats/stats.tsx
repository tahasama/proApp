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
    } else if (val === "preliminaryTreatment") {
      n.push(index);
      dict[14] = n;
    } else if (val === "blowersRoom") {
      o.push(index);
      dict[15] = o;
    } else if (val === "closingWall") {
      p.push(index);
      dict[16] = p;
    } else if (val === "mainStation") {
      q.push(index);
      dict[17] = q;
    } else if (val === "electricalRoom1") {
      r.push(index);
      dict[18] = r;
    } else if (val === "electricalRoom2") {
      s.push(index);
      dict[19] = s;
    } else if (val === "waterPipesNetwork") {
      t.push(index);
      dict[20] = t;
    } else if (val === "sludgeTreatmentBuilding") {
      v.push(index);
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
          n.length,
          o.length,
          p.length,
          q.length,
          r.length,
          s.length,
          t.length,
          v.length,
          w.length,
          x.length,
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
        borderWidth: 1,
        fill: true,
      },
    ],
  };
  //-------------------------------------for doughnut chart end

  //-----------------------------------------------------------------for all itn total per month start
  let u1 = all
    .flat()
    .map((x: any) => new Date(x.dateOfInspection).getMonth() + 1);

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
      <Card className="buttonn1" style={{ marginLeft: 100 }}>
        <TipsAndUpdatesIcon color="warning" /> click on a location to show/hide
        it on the chart
      </Card>
      <div
        className="DoughnutDimension"
        style={{ margin: 0, padding: 0, width: "29%" }}
      >
        <Doughnut
          options={optionsPie}
          data={data}
          style={{
            marginTop: -94,
            marginLeft: -65,
            backgroundColor: "rgb(210,215,230,0.9)",
          }}
        />
      </div>

      <div className="LineDimension" style={{ padding: 0, width: 520 }}>
        <Line
          options={optionsLine}
          data={data1}
          style={{
            marginTop: -22,
            backgroundColor: "rgb(210,215,230,0.9)",
          }}
        />
      </div>
      <div
        className="BarDimension"
        style={{ marginTop: -97, marginLeft: -18, padding: 0, width: 520 }}
      >
        <StatsPerReview all={all} />
      </div>
    </div>
  );
};

export default Stats;
