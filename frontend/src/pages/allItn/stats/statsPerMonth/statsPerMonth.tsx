import { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button, Card } from "@mui/material";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { getAllItns, itnData } from "../../../../state";
import { useAppDispatch, useAppSelector } from "../../../../state/hooks";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import "./statsPerMonth.css";
import { labelsName, locations } from "../../../../constants/constant";

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
  const { all } = useAppSelector(itnData);
  useEffect(() => {
    dispatch(getAllItns());
  }, [all]);
  const optionsLine = {
    // responsive: true,
    // maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Inspection for every location",
        font: { size: 18 },
      },
    },
  };

  const labels: any = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  let dict: any = {};
  let uu: any = [];
  let uu1: any = [];
  let uu2: any = [];
  let uu3: any = [];
  let uu4: any = [];
  let uu5: any = [];
  let uu6: any = [];
  let uu7: any = [];
  let uu8: any = [];
  let uu9: any = [];
  let uu10: any = [];
  let uu11: any = [];
  let uu12: any = [];
  let uu13: any = [];
  let uu14: any = [];
  let uu15: any = [];
  let uu16: any = [];
  let uu17: any = [];
  let uu18: any = [];

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
    return dict[i] !== undefined ? uu.push(dict[i]) : uu.push(0);
  });

  dict = {};
  lm("PrimaryClarifierP7");

  labels.map((i: any) => {
    return dict[i] !== undefined ? uu1.push(dict[i]) : uu1.push(0);
  });

  dict = {};
  lm("PrimaryClarifierP8");

  labels.map((i: any) => {
    return dict[i] !== undefined ? uu2.push(dict[i]) : uu2.push(0);
  });

  dict = {};
  lm("PrimaryClarifierP9");

  labels.map((i: any) => {
    return dict[i] !== undefined ? uu3.push(dict[i]) : uu3.push(0);
  });

  dict = {};
  lm("secondaryClarifierP24");

  labels.map((i: any) => {
    return dict[i] !== undefined ? uu4.push(dict[i]) : uu4.push(0);
  });

  dict = {};
  lm("secondaryClarifierP25");

  labels.map((i: any) => {
    return dict[i] !== undefined ? uu5.push(dict[i]) : uu5.push(0);
  });

  dict = {};
  lm("secondaryClarifierP32");

  labels.map((i: any) => {
    return dict[i] !== undefined ? uu6.push(dict[i]) : uu6.push(0);
  });

  dict = {};
  lm("mainBuilding");

  labels.map((i: any) => {
    return dict[i] !== undefined ? uu7.push(dict[i]) : uu7.push(0);
  });

  dict = {};
  lm("workShop");

  labels.map((i: any) => {
    return dict[i] !== undefined ? uu8.push(dict[i]) : uu8.push(0);
  });

  dict = {};
  lm("chlorinationTank");

  labels.map((i: any) => {
    return dict[i] !== undefined ? uu9.push(dict[i]) : uu9.push(0);
  });

  dict = {};
  lm("pumpingStation2");

  labels.map((i: any) => {
    return dict[i] !== undefined ? uu10.push(dict[i]) : uu10.push(0);
  });

  dict = {};
  lm("pumpingStation1");

  labels.map((i: any) => {
    return dict[i] !== undefined ? uu11.push(dict[i]) : uu11.push(0);
  });

  dict = {};
  lm("sandFilter");

  labels.map((i: any) => {
    return dict[i] !== undefined ? uu12.push(dict[i]) : uu12.push(0);
  });

  dict = {};
  lm("preliminaryTreatment");

  labels.map((i: any) => {
    return dict[i] !== undefined ? uu13.push(dict[i]) : uu13.push(0);
  });

  dict = {};
  lm("closingWall");

  labels.map((i: any) => {
    return dict[i] !== undefined ? uu14.push(dict[i]) : uu14.push(0);
  });

  dict = {};
  lm("blowersRoom");

  labels.map((i: any) => {
    return dict[i] !== undefined ? uu15.push(dict[i]) : uu15.push(0);
  });

  dict = {};
  lm("mainStation");

  labels.map((i: any) => {
    return dict[i] !== undefined ? uu16.push(dict[i]) : uu16.push(0);
  });

  dict = {};
  lm("electricalRoom1");

  labels.map((i: any) => {
    return dict[i] !== undefined ? uu17.push(dict[i]) : uu17.push(0);
  });

  dict = {};
  lm("electricalRoom2");

  labels.map((i: any) => {
    return dict[i] !== undefined ? uu18.push(dict[i]) : uu18.push(0);
  });

  // const [q, setQ] = useState<any[]>(locations);
  // const [filters, setFilters] = useState(true);
  const [lineBar, setLineBar] = useState(false);

  const data: any = {
    labels: labelsName,

    datasets: [
      {
        label: "Aeration",
        // data: q.includes("aerationTank") ? uu : [0],
        data: uu,
        borderColor: "#cc0000",
        backgroundColor: "#cc0000",
        tension: 0.3,
      },
      {
        label: "P7",
        // data: !q.includes("PrimaryClarifierP7") ? [0] : uu1,
        data: uu1,

        borderColor: "#ff8800",
        backgroundColor: "#ff8800",
        tension: 0.3,
      },
      {
        label: "P8",
        // data: !q.includes("PrimaryClarifierP8") ? [0] : uu2,
        data: uu2,

        borderColor: "#a07e33",
        backgroundColor: "#a07e33",
        tension: 0.3,
      },
      {
        label: "P9",
        // data: !q.includes("PrimaryClarifierP9") ? [0] : uu3,
        data: uu3,

        borderColor: "#0099cc",
        backgroundColor: "#0099cc",
        tension: 0.3,
      },
      {
        label: "P24",
        // data: !q.includes("secondaryClarifierP24") ? [0] : uu4,
        data: uu4,

        borderColor: "#00695c",
        backgroundColor: "#00695c",

        tension: 0.3,
      },
      {
        label: "P25",
        // data: !q.includes("secondaryClarifierP25") ? [0] : uu5,
        data: uu5,

        borderColor: "#0d47a1",
        backgroundColor: "#0d47a1",

        tension: 0.3,
      },
      {
        label: "P32",
        // data: !q.includes("secondaryClarifierP32") ? [0] : uu6,
        data: uu6,

        borderColor: "#ffd000",
        backgroundColor: "#ffd000",
        tension: 0.3,
      },
      {
        label: "mainB",
        // data: !q.includes("mainBuilding") ? [0] : uu7,
        data: uu7,

        borderColor: "#1933cc",
        backgroundColor: "#1933cc",
        tension: 0.3,
      },
      {
        label: "workShop",
        // data: !q.includes("workShop") ? [0] : uu8,
        data: uu8,

        borderColor: "#9f33cc",
        backgroundColor: "#9f33cc",
        tension: 0.3,
      },
      {
        label: "chlorinationT",
        // data: !q.includes("chlorinationTank") ? [0] : uu9,
        data: uu9,

        borderColor: "#99007c",
        backgroundColor: "#99007c",
        tension: 0.3,
      },
      {
        label: "SP2",
        // data: !q.includes("pumpingStation2") ? [0] : uu10,
        data: uu10,

        borderColor: "#9ee3cc",
        backgroundColor: "#9ee3cc",
        tension: 0.3,
      },
      {
        label: "SP1",
        // data: !q.includes("pumpingStation1") ? [0] : uu11,
        data: uu11,

        borderColor: "#00ff00",
        backgroundColor: "#00ff00",
        tension: 0.3,
      },
      {
        label: "sandFilter",
        // data: !q.includes("sandFilter") ? [0] : uu12,
        data: uu12,

        borderColor: "#ff33cc",
        backgroundColor: "#ff33cc",
        tension: 0.3,
      },
      {
        label: "pre Treatment",
        // data: !q.includes("preliminaryTreatment") ? [0] : uu13,
        data: uu13,

        borderColor: "#e0c3cc",
        backgroundColor: "#e0c3cc",
        tension: 0.3,
      },
      {
        label: "C.Wall",
        // data: !q.includes("preliminaryTreatment") ? [0] : uu13,
        data: uu14,

        borderColor: "#2fc3cc",
        backgroundColor: "#2fc3cc",
        tension: 0.3,
      },
      {
        label: "Blowers.R",
        // data: !q.includes("preliminaryTreatment") ? [0] : uu13,
        data: uu15,

        borderColor: "#2d93cc",
        backgroundColor: "#2d93cc",
        tension: 0.3,
      },
      {
        label: "M.Station",
        // data: !q.includes("preliminaryTreatment") ? [0] : uu13,
        data: uu16,

        borderColor: "#8003cc",
        backgroundColor: "#8003cc",
        tension: 0.3,
      },
      {
        label: "Electrical.R1",
        // data: !q.includes("preliminaryTreatment") ? [0] : uu13,
        data: uu17,

        borderColor: "#dd03cc",
        backgroundColor: "#dd03cc",
        tension: 0.3,
      },
      {
        label: "Electrical.R2",
        // data: !q.includes("preliminaryTreatment") ? [0] : uu13,
        data: uu18,

        borderColor: "#a103cc",
        backgroundColor: "#a103cc",
        tension: 0.3,
      },
    ],
  };

  // const handleCheckBox = (e: any, key: any) => {
  //   let w = e.target.name;
  //   key ? setQ([...q, w]) : setQ(q.filter((t: any) => t !== w));
  // };

  return (
    <div className="statsPerMonth">
      {/* <div className="statsPerMonthFilterButton">
        <div>
          {filters ? (
            <Button variant="contained" onClick={() => setFilters(!filters)}>
              Hide Filters
            </Button>
          ) : (
            <Button variant="contained" onClick={() => setFilters(!filters)}>
              Show Filters
            </Button>
          )}
        </div>
        <div
          className="statsPerMonthFilter"
          style={{
            backgroundColor: "rgb(210,215,230,0.8)",
            color: "#000033",
          }}
        >
          {filters && (
            <FormGroup>
              {locations.map((xgonna: any) => (
                <FormControlLabel
                  className="hayya"
                  key={xgonna}
                  control={
                    <Checkbox
                      name={xgonna}
                      defaultChecked
                      onChange={(e: any, key: any) => handleCheckBox(e, key)}
                      style={{
                        padding: 5,
                        marginLeft: 10,
                      }}
                    />
                  }
                  label={xgonna}
                />
              ))}
            </FormGroup>
          )}
        </div>
      </div> */}
      <Button
        variant="contained"
        className="buttonn"
        color="error"
        onClick={() => setLineBar(!lineBar)}
      >
        to {lineBar ? "Line" : "Bar"} Chart
      </Button>
      <Card className="buttonn1">
        <TipsAndUpdatesIcon color="warning" />
        click on the button above to switch from Dohgnut Bar chart to Line chart
        and vice versa
      </Card>
      <Card className="buttonn1" style={{ marginTop: 150 }}>
        <TipsAndUpdatesIcon color="warning" /> click on a location to show/hide
        it on the chart
      </Card>
      {lineBar ? (
        <div className="statsPerMonthLine">
          <Bar
            options={optionsLine}
            data={data}
            style={{
              //   marginTop: -20,
              //   marginRight: 80,
              backgroundColor: "rgb(210,215,230,0.8)",
              //   width: "1400px",
            }}
          />
        </div>
      ) : (
        <div className="statsPerMonthLine">
          <Line
            options={optionsLine}
            data={data}
            style={{
              //   marginTop: -20,
              backgroundColor: "rgb(210,215,230,0.8)",
              //   width: "1400px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default StatsPerMonth;
