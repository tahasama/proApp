import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";

import "./locationDetail.css";

import NavBar from "../Navbar/navbar";
import ModalC from "./modalC/modalC";
import ConcreteOfLocation from "./ConcreteOfLocation/concreteOfLocation";
import ReinforcementOfLocation from "./ReinforcementOfLocation/ReinforcementOfLocation";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import ModalD from "./modalD/modalD";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { getItp, itpData } from "../../state/reducers/itpSlice";
import { getAuthData } from "../../state/reducers/authSlice";
import LocationsItn from "./locationsItn/locationsItn";

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
  const { status, email } = useAppSelector(getAuthData);
  const { individualitp } = useAppSelector(itpData);
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState(0);
  const { itp } = useParams();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getItp(itp));
  }, [itp, dispatch]);

  return (
    <div>
      <div className="navbar">
        <NavBar />
      </div>

      <h6 className="locationName">{itp}: </h6>
      {status === "manager" && (
        <div style={{ position: "absolute", bottom: 100, left: 3, zIndex: 99 }}>
          <ModalC />
          <ModalD />
        </div>
      )}

      <Button
        variant="contained"
        size="large"
        color="inherit"
        className="getItp1"
        style={{ top: status !== "manager" ? 130 : 50 }}
      >
        <a
          style={{
            textDecoration: "none",
            color: "gray",
            fontWeight: "bold",
          }}
          href={`${individualitp.length > 0 ? individualitp[0].ItpUrl : ""}`}
          target="_blank"
          rel="noreferrer"
        >
          ITP
        </a>
      </Button>

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
            sx={{ borderRight: 1, borderColor: "divider", display: "flex" }}
          >
            <Tab
              label="ITN"
              {...a11yProps(0)}
              style={{
                position: "fixed",
                marginTop: 170,
                boxShadow: "7px 5px 5px grey",
                width: 150,
                backgroundColor: "#EBEDEF",
              }}
            />
            <Tab
              label="Concrete"
              {...a11yProps(1)}
              style={{
                position: "fixed",
                marginTop: 230,
                boxShadow: "7px 5px 5px grey",
                width: 150,
                backgroundColor: "#EBEDEF",
              }}
            />
            <Tab
              label="Reinforcement"
              {...a11yProps(2)}
              style={{
                position: "fixed",
                marginTop: 290,
                boxShadow: "7px 5px 5px grey",
                width: 150,
                backgroundColor: "#EBEDEF",
              }}
            />
          </Tabs>
          <TabPanel value={value} index={0}>
            <div style={{ marginLeft: 150, marginTop: 60 }}>
              <LocationsItn />
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div style={{ marginLeft: 200 }}>
              <ConcreteOfLocation />
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div style={{ marginLeft: 100 }}>
              <ReinforcementOfLocation />
            </div>
          </TabPanel>
        </Box>
      </div>
    </div>
  );
};

export default LocationDetails;
