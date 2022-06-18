import React, { useEffect } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { getAllItns, getItnsByItp, itnData } from "../../../state";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";

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
  const dispatch = useAppDispatch();
  const { allitp, all } = useAppSelector(itnData);
  const params = useParams();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "left" as const,
      },
      title: {
        display: true,
        text: "Distribution of quality inspections",
        font: { size: 16 },
      },
    },
  };

  useEffect(() => {
    dispatch(getAllItns());
  }, []);

  const locations = [
    { itp: "secondaryClarifierP24" },
    { itp: "secondaryClarifierP25" },
    { itp: "secondaryClarifierP32" },
    { itp: "PrimaryClarifierP7" },
    { itp: "PrimaryClarifierP8" },
    { itp: "PrimaryClarifierP9" },
    { itp: "aerationTank" },
  ];
  const locations1 = [
    "aerationTank",
    "PrimaryClarifierP7",
    "PrimaryClarifierP8",
    "PrimaryClarifierP9",
    "secondaryClarifierP24",
    "secondaryClarifierP25",
    "secondaryClarifierP32",
  ];

  // const dataaArray: any = [];
  // const dataa = () => (
  //   locations.map((i: any) => dispatch(getItnsByItp(i))),
  //   console.log("dataaa", allitp.flat().length),
  //   dataaArray.push(allitp.flat().length),
  //   console.log("please work", dataaArray)
  // );

  // useEffect(() => {
  //   dataa();
  // }, []);

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

  console.log("yaaay", dict[6]);

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
        // maintainAspectRatio: false,
        fill: false,
      },
    ],
  };
  return (
    <div>
      {" "}
      <p>Stats</p>{" "}
      <div
        className="DoughnutDimension"
        style={{ margin: 0, padding: 0, width: "39%" }}
      >
        <Doughnut options={options} data={data} style={{ marginTop: -84 }} />
      </div>
    </div>
  );
};

export default Stats;
