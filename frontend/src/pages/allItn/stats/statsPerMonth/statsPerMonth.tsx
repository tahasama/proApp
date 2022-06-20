import React, { useEffect, useState } from "react";

import { getAllItns, getItnsByItp, itnData } from "../../../../state";
import { useAppDispatch, useAppSelector } from "../../../../state/hooks";
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

const StatsPerMonth = () => {
  const dispatch = useAppDispatch();
  const { allitp, all } = useAppSelector(itnData);
  useEffect(() => {
    dispatch(getAllItns());
  }, [all]);
  const optionsLine = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const labels: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  let dict: any = {};
  let uu: any = [];
  let uu1: any = [];
  let uu2: any = [];
  let uu3: any = [];
  let uu4: any = [];
  let uu5: any = [];
  let uu6: any = [];

  //===============================================================================the function start
  const lm = (v: any) => {
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
    all
      .flat()
      .filter((loca: any) => loca.itp === v)
      .map((x: any) => new Date(x.dateOfInspection).getMonth() + 1)
      .forEach((val, index) => {
        if (val === 1) {
          a.push(index);
          dict[1] = a.length;
        } else if (val === 2) {
          b.push(index);
          dict[2] = b.length;
        } else if (val === 3) {
          c.push(index);
          dict[3] = c.length;
        } else if (val === 4) {
          d.push(index);
          dict[4] = d.length;
        } else if (val === 5) {
          e.push(index);
          dict[5] = e.length;
        } else if (val === 6) {
          f.push(index);
          dict[6] = f.length;
        } else if (val === 7) {
          g.push(index);
          dict[7] = g.length;
        } else if (val === 8) {
          h.push(index);
          dict[8] = h.length;
        } else if (val === 9) {
          i.push(index);
          dict[9] = i.length;
        } else if (val === 10) {
          j.push(index);
          dict[10] = j.length;
        } else if (val === 11) {
          k.push(index);
          dict[11] = k.length;
        } else if (val === 12) {
          l.push(index);
          dict[12] = l.length;
        }
      });
  };
  //==============================================================================the function end
  //==============================================================================location start

  dict = {};
  lm("aerationTank");

  labels.map((i: any) => {
    dict[i] !== undefined ? uu.push(dict[i]) : uu.push(0);
  });
  dict = {};
  lm("PrimaryClarifierP7");

  labels.map((i: any) => {
    dict[i] !== undefined ? uu1.push(dict[i]) : uu1.push(0);
  });
  dict = {};
  lm("PrimaryClarifierP8");

  labels.map((i: any) => {
    dict[i] !== undefined ? uu2.push(dict[i]) : uu2.push(0);
  });
  dict = {};
  lm("PrimaryClarifierP9");

  labels.map((i: any) => {
    dict[i] !== undefined ? uu3.push(dict[i]) : uu3.push(0);
  });
  lm("secondaryClarifierP24");
  labels.map((i: any) => {
    dict[i] !== undefined ? uu4.push(dict[i]) : uu4.push(0);
  });
  dict = {};

  lm("secondaryClarifierP25");

  labels.map((i: any) => {
    dict[i] !== undefined ? uu5.push(dict[i]) : uu5.push(0);
  });
  dict = {};
  lm("secondaryClarifierP32");

  labels.map((i: any) => {
    dict[i] !== undefined ? uu6.push(dict[i]) : uu6.push(0);
  });

  const data: any = {
    labels: labels,

    datasets: [
      {
        label: "Aeration",
        data: uu,
        borderColor: "#cc0000",
        tension: 0.3,
      },
      {
        label: "P7",
        data: uu1,
        borderColor: "#ff8800",
        tension: 0.3,
      },
      {
        label: "P8",
        data: uu2,
        borderColor: "#007e33",
        tension: 0.3,
      },
      {
        label: "P9",
        data: uu3,
        borderColor: "#0099cc",
        tension: 0.3,
      },
      {
        label: "P24",
        data: uu4,
        borderColor: "#00695c",
        tension: 0.3,
      },
      {
        label: "P25",
        data: uu5,
        borderColor: "#0d47a1",
        tension: 0.3,
      },
      {
        label: "P32",
        data: uu6,
        borderColor: "#9933cc",
        tension: 0.3,
      },
    ],
  };
  return (
    <div>
      <Line
        options={optionsLine}
        data={data}
        style={{ width: 340, marginTop: -20 }}
      />
    </div>
  );
};

export default StatsPerMonth;
