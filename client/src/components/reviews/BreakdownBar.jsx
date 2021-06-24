import React from "react";
import styles from "./Reviews.module.css";
import BarFiller from "./BarFiller.jsx";
import BarIcon from "./BarIcon.jsx";

function BreakdownBar(props) {
  if (props.fill) {
    return (
      <div className={styles.bar}>
        <BarFiller percentage={props.percentage} number={props.number}/>
      </div>
    );
  } else {
    return (
      <div>
        <div className={styles.bar} style={{ width: "100%" }}>
          <BarIcon percentage={props.percentage} />
        </div>

        <div style={{ width: "100%" }}>
          <div
            style={{
              display: "inline-block",
              float: "left",
              fontSize: "12px",
              color: "#d96c06",
            }}
          >
            {props.low}
          </div>

          <div
            style={{
              display: "inline-block",
              float: "right",
              fontSize: "12px",
              color: "#d96c06",
            }}
          >
            {props.high}
          </div>
        </div>
      </div>
    );
  }
}

export default BreakdownBar;
