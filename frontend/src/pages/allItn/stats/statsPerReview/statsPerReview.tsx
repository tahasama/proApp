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
    const uuu = labels.map(
      (l: any) =>
        all.all
          .flat()
          .filter((f: any) => f.review === v)
          .filter(
            (d: any) => d.dateOfInspection.slice(6, 7) === JSON.stringify(l)
          ).length
      // .map((q: any) => q.review)
      // .reduce((a: any, b: any) => a + b, 0)
    );
    v === "C1" && uu.push(uuu);
    v === "C2" && uu1.push(uuu);
    v === "C3" && uu2.push(uuu);
  };
  //==============================================================================the function end
  //==============================================================================location start

  lm("C1");
  lm("C2");
  lm("C3");

  // dict = {};
  // labels.map((i: any) => {
  //   dict[i] !== undefined ? uu.push(dict[i]) : uu.push(0);
  // });
  // dict = {};
  // labels.map((i: any) => {
  //   dict[i] !== undefined ? uu1.push(dict[i]) : uu1.push(0);
  // });
  // dict = {};
  // labels.map((i: any) => {
  //   dict[i] !== undefined ? uu2.push(dict[i]) : uu2.push(0);
  // });

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
        data: uu.flat(),
        borderColor: "#85c600",
        backgroundColor: "#85c600",
        tension: 0.3,
      },
      {
        label: "C2",
        data: uu1.flat(),
        borderColor: "#256fff",
        backgroundColor: "#256fff",
        tension: 0.3,
      },
      {
        label: "C3",
        data: uu2.flat(),

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
        style={{ marginTop: -20, backgroundColor: "rgb(210,215,230,0.8)" }}
        className="statsPerMonthLine"
      />
    </div>
  );
};

export default StatsPerReview;
