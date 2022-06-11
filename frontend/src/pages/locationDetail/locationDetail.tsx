import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";

import "./locationDetail.css";
import LocationsItn from "../locationsItn/locationsItn";
import NavBar from "../Navbar/navbar";

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
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const LocationDetails = () => {
  const [value, setValue] = React.useState(0);
  const { itp } = useParams();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="navbar">
        <NavBar />
      </div>

      <h2 className="locationName">{itp}: </h2>
      <div className="restOfPage">
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            height: 0,
            width: 0,
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab
              label="Inspection Test Notification"
              {...a11yProps(0)}
              style={{
                position: "fixed",
                marginTop: 40,
                boxShadow: "10px 5px 5px grey",
                width: 300,
                backgroundColor: "#EBEDEF",
              }}
            />
            <Tab
              label="Concrete"
              {...a11yProps(1)}
              style={{
                position: "fixed",
                marginTop: 105,
                boxShadow: "10px 5px 5px grey",
                width: 300,
                backgroundColor: "#EBEDEF",
              }}
            />
            <Tab
              label="Reinforcement and Formwork"
              {...a11yProps(2)}
              style={{
                position: "fixed",
                marginTop: 170,
                boxShadow: "10px 5px 5px grey",
                width: 300,
                backgroundColor: "#EBEDEF",
              }}
            />
            <Tab
              label="Non Confority Report"
              {...a11yProps(2)}
              style={{
                position: "fixed",
                marginTop: 235,
                boxShadow: "10px 5px 5px grey",
                width: 300,
                backgroundColor: "#EBEDEF",
              }}
            />
            <Tab
              label="Quality Observation Report"
              {...a11yProps(2)}
              style={{
                position: "fixed",
                marginTop: 300,
                boxShadow: "10px 5px 5px grey",
                width: 300,
                backgroundColor: "#EBEDEF",
              }}
            />
          </Tabs>
          <TabPanel value={value} index={0}>
            <div style={{ marginLeft: 380 }}>
              <LocationsItn itp={itp} />
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div style={{ marginLeft: 200 }}>2222222222222</div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div style={{ marginLeft: 100 }}>33333333333</div>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <div style={{ marginLeft: 100 }}>4444444444444</div>
          </TabPanel>
        </Box>
      </div>
    </div>
  );
};

export default LocationDetails;