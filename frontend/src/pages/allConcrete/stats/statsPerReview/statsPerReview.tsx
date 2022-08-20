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
        text: "Concrete Poured by types per month (m³)",
        font: { size: 16 },
      },
    },
  };

  const labels: any = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  let uu: any = [];
  let uu1: any = [];
  let uu2: any = [];
  let uu3: any = [];
  let uu4: any = [];

  //===============================================================================the function start

  const lm = (v: any) => {
    const uuu = labels.map((l: any) =>
      all.all
        .flat()
        .filter((f: any) => f.type === v)
        .filter((d: any) => d.dateOfUsage.slice(6, 7) === JSON.stringify(l))
        .map((q: any) => q.quantity)
        .reduce((a: any, b: any) => a + b, 0)
    );
    v === "B40" && uu4.push(uuu);
    v === "B35" && uu3.push(uuu);
    v === "B25" && uu2.push(uuu);
    v === "B20" && uu1.push(uuu);
    v === "B15" && uu.push(uuu);
  };
  //==============================================================================the function end
  //==============================================================================location start

  lm("B40");
  lm("B35");

  lm("B20");
  lm("B25");

  lm("B15");

  const data: any = {
    labels: labelsName,

    datasets: [
      {
        label: "B15",
        data: uu.flat(),
        borderColor: "#009975",
        backgroundColor: "#009975",
        tension: 0.3,
      },
      {
        label: "B20",
        data: uu1.flat(),
        borderColor: "#256fff",
        backgroundColor: "#256fff",
        tension: 0.3,
      },
      {
        label: "B25",
        data: uu2.flat(),

        borderColor: "#ad463e",
        backgroundColor: "#ad463e",
        tension: 0.3,
      },
      {
        label: "B35",
        data: uu3.flat(),

        borderColor: "#ff0044",
        backgroundColor: "#ff0044",
        tension: 0.3,
      },
      {
        label: "B40",
        data: uu4.flat(),

        borderColor: "#2acaea",
        backgroundColor: "#2acaea",
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
        style={{ marginTop: -20, backgroundColor: "rgb(210,215,230,0.9)" }}
        className="statsPerMonthLine"
      />
    </div>
  );
};

export default StatsPerReview;
