import plan from "../../images/plan.png";
import { Link } from "react-router-dom";

import "./fullPlan.css";
import NavBar from "../Navbar/navbar";
import { locations } from "../../constants/constant";
import { Box, Chip } from "@mui/material";

const FullPlan = () => {
  return (
    <div className="fullPage">
      <div className="navbar">
        <NavBar />{" "}
      </div>
      {/* <p>Please rotate your screen for better experience</p> */}

      <Box
        className="masterPlan"
        sx={{
          mt: { xs: 36, sm: 8, md: 6, lg: -1 },
          transform: { xs: "rotate(-90deg) scale(1.6)", sm: "rotate(0deg)" },
        }}
      >
        <img
          src={plan}
          alt=""
          className="masterPlan"
          style={{ transform: "scale(.9)" }}
        />
        {locations.map((i: any) => (
          <div key={i}>
            <Link to={`../${i}`} className={i}></Link>
            <div className={"name-" + i}>
              <i>
                <b>
                  <u>{i}</u>
                </b>
              </i>
            </div>
          </div>
        ))}
      </Box>
    </div>
  );
};

export default FullPlan;
