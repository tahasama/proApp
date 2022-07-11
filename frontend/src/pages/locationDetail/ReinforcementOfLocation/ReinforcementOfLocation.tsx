import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

// import "./locationsItn.css";

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
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import {
  getAllReinforcements,
  getReinforcementsByItp,
  ReinforcementData,
} from "../../../state/reducers/reinforcementSlice";
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ReinforcementOfLocation = () => {
  const dispatch = useAppDispatch();
  const { allitp, all } = useAppSelector(ReinforcementData);
  const { itp } = useParams();
  //   console.log("ffffffff", all);

  const [filterBy, setFilterBy] = useState("All");

  useEffect(() => {
    dispatch(getReinforcementsByItp(itp));
    dispatch(getAllReinforcements());
  }, [allitp]);

  const routine = [
    "All",
    "Setting Out",
    "Excavation until foundation Bottom",
    "Conduites Installation ",
    "Lean Concrete",
    "Mass Concrete",
    "Reinforcement & Formwork",
    "Concrete placing and finishing",
    "Curing",
    "Waterproofing coat",
    "Backfilling",
    "Treatement protection layer",
    "Concrete Tests",
  ];
  //   console.log("allitp", allitp);
  const handleNumber = (num: any) => {
    return num < 10 ? "000" + num : num < 100 ? "00" + num : "0" + num;
  };
  let itpName = itp;

  const data = {
    labels: [itpName + "(%)", "Other Locations (%)"],
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
    // maintainAspectRatio: true,
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

  let u1 = all.flat().map((x: any) => new Date(x.dateOfUsage).getMonth() + 1);
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
  // const dew1 = (value: any) => all;
  const dew1 = (value: any) =>
    all
      .flat()
      .filter((i: any) => i.itp === itp)
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

  return (
    <div className="cover">
      <div>
        <Button
          variant="contained"
          style={{
            marginTop: 50,
            marginLeft: 340,
            padding: 15,
            cursor: "auto",
            width: 500,
          }}
        >
          Total = &nbsp;
          {all
            .flat()
            .filter((i: any) => i.itp === itp)
            .map((x: any) => x.quantity)
            .reduce((a, b): any => a + b, 0)}
          &nbsp; Kg
        </Button>
        <div className="DoughnutDimension" style={{ padding: 0, width: "32%" }}>
          <Pie
            options={optionsPie}
            data={data}
            style={{
              marginTop: 4,
              marginLeft: 100,

              backgroundColor: "rgb(230,230,230,0.9)",
            }}
          />
        </div>

        <div
          className="LineDimension"
          style={{ margin: 0, padding: 0, width: "52%" }}
        >
          <Line
            options={optionsLine}
            data={data2}
            style={{
              width: 340,
              marginTop: -175,
              marginLeft: 120,
              backgroundColor: "rgb(230,230,230,0.9)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ReinforcementOfLocation;
