import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import NavBar from "../Navbar/navbar";
import Log from "./log/log";
import Stats from "./stats/stats";
import StatsPerMonth from "./stats/statsPerMonth/statsPerMonth";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"div"} variant={"body2"}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AllItn() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="navbar">
        <NavBar />
      </div>
      <div style={{ marginTop: 68 }}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="fullWidth"
              style={{
                marginTop: -8,
                padding: 0,
                backgroundColor: "#CCCCFF",
              }}
            >
              <Tab label="LOG" {...a11yProps(0)} />
              <Tab label="STATS" {...a11yProps(1)} />
              <Tab label="DETAILED CHART" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Log />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Stats />
          </TabPanel>{" "}
          <TabPanel value={value} index={2}>
            <StatsPerMonth />
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}
