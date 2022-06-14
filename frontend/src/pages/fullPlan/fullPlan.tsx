import plan from "../../images/plan.png";
import { Link } from "react-router-dom";

import "./fullPlan.css";

const FullPlan = () => {
  const locations = [
    "secondaryClarifierP24",
    "secondaryClarifierP25",
    "secondaryClarifierP32",
    "PrimaryClarifierP7",
    "PrimaryClarifierP8",
    "PrimaryClarifierP9",
    "aerationTank",
  ];

  return (
    <div>
      <div className="masterPlan">
        <img src={plan} alt="" width={1100} />
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
      </div>
    </div>
  );
};

export default FullPlan;
