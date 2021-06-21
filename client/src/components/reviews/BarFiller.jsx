import React from "react";
import styles from "./Reviews.module.css";

function BarFiller(props) {
  return (
    <div
      className={styles.filler}
      style={{ width: `${props.percentage}%`, verticalAlign: "bottom" }}
    >
      {props.number}
    </div>
  );
}

export default BarFiller;
