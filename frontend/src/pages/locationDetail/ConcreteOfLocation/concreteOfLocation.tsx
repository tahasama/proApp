import { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import {
  concreteData,
  getAllConcretes,
} from "../../../state/reducers/concreteSlice";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { labelsName } from "../../../constants/constant";

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
const ConcreteOfLocation = () => {
  const dispatch = useAppDispatch();

  const { all } = useAppSelector(concreteData);
  const { itp } = useParams();

  useEffect(() => {
    dispatch(getAllConcretes());
  }, [dispatch]);

  const optionsLine = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "left" as const,
      },
      title: {
        display: true,
        text: "Concrete poured by types per month",
        font: { size: 18 },
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
      all
        .flat()
        .filter((f: any) => f.type === v)
        .filter((l: any) => l.itp === itp)
        .filter((d: any) => d.dateOfUsage.slice(6, 7) === JSON.stringify(l))
        .map((q: any) => q.quantity)
        .reduce((a: any, b: any) => a + b, 0)
    );
    v === "B40" && uu.push(uuu);
    v === "B35" && uu1.push(uuu);
    v === "B25" && uu2.push(uuu);
    v === "B20" && uu3.push(uuu);
    v === "B15" && uu4.push(uuu);
  };
  //==============================================================================the function end
  //==============================================================================location start

  lm("B40");
  lm("B35");
  lm("B25");
  lm("B20");
  lm("B15");

  const data: any = {
    labels: labelsName,

    datasets: [
      {
        label: "B15",
        data: uu4.flat(),
        borderColor: "#DAE42E",
        backgroundColor: "#DAE42E",
        tension: 0.3,
      },
      {
        label: "B20",
        data: uu3.flat(),
        borderColor: "#256fff",
        backgroundColor: "#256fff",
        tension: 0.3,
      },
      {
        label: "B25",
        data: uu2.flat(),

        borderColor: "#ff0044",
        backgroundColor: "#ff0044",
        tension: 0.3,
      },
      {
        label: "B35",
        data: uu1.flat(),

        borderColor: "#c27ba0",
        backgroundColor: "#c27ba0",
        tension: 0.3,
      },
      {
        label: "B40",
        data: uu.flat(),

        borderColor: "#00ff00",
        backgroundColor: "#00ff00",
        tension: 0.3,
      },
    ],
  };
  //======================================================Total Table
  function createData(
    name: string,
    B15: number,
    B20: number,
    B25: number,
    B35: number,
    B40: number,
    Tot: number
  ) {
    return { name, B15, B20, B40, B25, B35, Tot };
  }

  const totalB = (v: string) =>
    all
      .flat()
      .filter((f: any) => f.type === v)
      .filter((l: any) => l.itp === itp)
      .map((q: any) => q.quantity)
      .reduce((a: any, b: any) => a + b, 0);

  const rows = [
    createData(
      "Total",
      totalB("B15"),
      totalB("B20"),
      totalB("B25"),
      totalB("B35"),
      totalB("B40"),

      all
        .flat()
        .filter((l: any) => l.itp === itp)
        .map((q: any) => q.quantity)
        .reduce((a: any, b: any) => a + b, 0)
    ),
  ];

  return (
    <>
      {" "}
      <TableContainer
        component={Paper}
        style={{ marginLeft: 120, marginTop: -105 }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{itp}</TableCell>
              <TableCell align="right">B15&nbsp;(m³)</TableCell>
              <TableCell align="right">B20&nbsp;(m³)</TableCell>
              <TableCell align="right">B25&nbsp;(m³)</TableCell>
              <TableCell align="right">B35&nbsp;(m³)</TableCell>
              <TableCell align="right">B40&nbsp;(m³)</TableCell>
              <TableCell align="right">Total&nbsp;(m³)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.B15}</TableCell>
                <TableCell align="right">{row.B20}</TableCell>
                <TableCell align="right">{row.B25}</TableCell>
                <TableCell align="right">{row.B35}</TableCell>
                <TableCell align="right">{row.B40}</TableCell>
                <TableCell align="right">{row.Tot}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        className="statsPerMonth"
        style={{ marginTop: 0, padding: 0, width: "80%" }}
      >
        <Bar
          options={optionsLine}
          data={data}
          style={{
            width: "10%",
            marginTop: 40,
            marginLeft: 70,
            backgroundColor: "rgb(230,230,230,0.9)",
          }}
          className="statsPerMonthLine"
        />
      </div>
    </>
  );
};

export default ConcreteOfLocation;
