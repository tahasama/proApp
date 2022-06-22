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
import { Bar } from "react-chartjs-2";

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

const StatsPerReview = (all: any) => {
  const optionsLine = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "left" as const,
      },
      title: {
        display: true,
        text: "Inspection reviews per month",
        font: { size: 18 },
      },
    },
  };

  const labels: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  let dict: any = {};
  let uu: any = [];
  let uu1: any = [];
  let uu2: any = [];

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
    all.all
      .flat()
      .filter((loca: any) => loca.review === v)
      .map((x: any) => new Date(x.dateOfInspection).getMonth() + 1)
      .forEach((val: any, index: any) => {
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
  lm("C1");

  labels.map((i: any) => {
    dict[i] !== undefined ? uu.push(dict[i]) : uu.push(0);
  });
  dict = {};
  lm("C2");

  labels.map((i: any) => {
    dict[i] !== undefined ? uu1.push(dict[i]) : uu1.push(0);
  });
  dict = {};
  lm("C3");
  labels.map((i: any) => {
    dict[i] !== undefined ? uu2.push(dict[i]) : uu2.push(0);
  });

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

  const data: any = {
    labels: labelsName,

    datasets: [
      {
        label: "C1",
        data: uu,
        borderColor: "#85c600",
        backgroundColor: "#85c600",
        tension: 0.3,
      },
      {
        label: "C2",
        data: uu1,
        borderColor: "#256fff",
        backgroundColor: "#256fff",
        tension: 0.3,
      },
      {
        label: "C3",
        data: uu2,

        borderColor: "#ff0044",
        backgroundColor: "#ff0044",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="statsPerMonth">
      <div className="statsPerMonthFilterButton"></div>
      <Bar
        options={optionsLine}
        data={data}
        style={{ width: 340, marginTop: -20 }}
        className="statsPerMonthLine"
      />
    </div>
  );
};

export default StatsPerReview;
