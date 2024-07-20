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

      {/* Tabs */}
      <Tabs
        orientation="horizontal"
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          width: "100%",
          backgroundColor: "#f0f8ff",
          mt: 7.5,
          // display: "flex",
        }}
      >
        <Tab label="Inspection" />
        <Tab label="Concrete" />
        <Tab label="Reinforcement" />
      </Tabs>

      {status === "manager" && (
        <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 99 }}>
          <ModalC />
        </div>
      )}

      {/* Main Content */}
      <Box sx={{ p: 3, mt: 0 }}>
        <Box>
          {/* Render content based on selected tab */}
          {value === 0 && <LocationsItn />}
          {value === 1 && <ConcreteOfLocation />}
          {value === 2 && <ReinforcementOfLocation />}
        </Box>
      </Box>
    </div>
  );
};

export default LocationDetails;
