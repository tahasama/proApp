import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { labelsName } from "../../../../constants/constant";

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

  const labels: any = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  let uu: any = [];
  let uu1: any = [];
  let uu2: any = [];

  //===============================================================================the function start
  const lm = (v: any) => {
    const uuu = labels.map(
      (l: any) =>
        all.all
          .flat()
          .filter((f: any) => f.review === v)
          .filter(
            (d: any) => d.dateOfInspection.slice(6, 7) === JSON.stringify(l)
          ).length
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

  const data: any = {
    labels: labelsName,

    datasets: [
      {
        label: "C1",
        data: uu.flat(),
        borderColor: "#256fff",
        backgroundColor: "#256fff",
        tension: 0.3,
      },
      {
        label: "C2",
        data: uu1.flat(),
        borderColor: "#85c600",
        backgroundColor: "#85c600",

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
