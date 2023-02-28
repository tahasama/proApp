import plan from "../../images/plan.png";
import { Link } from "react-router-dom";

import "./fullPlan.css";
import NavBar from "../Navbar/navbar";
import { locations } from "../../constants/constant";

const FullPlan = () => {
  return (
    <div>
      <div className="navbar">
        <NavBar />
      </div>
      <div className="fullPage">
        <div className="masterPlan">
          <img src={plan} alt="" className="fullPlan" />
          {locations.flat().map((i: any) => (
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
          <Link to={`../closingWall`} className="closingWall">
            <p className="wallText">closingWall</p>
            <div className="arrow">
              <div className="line"></div>
              <div className="point"></div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FullPlan;
