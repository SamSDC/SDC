import React from "react";
import styles from "./Reviews.module.css";

function BarFiller(props) {
  return (
    <span
      className={styles.icon}
      style={{ marginLeft: `${props.percentage}%` }}
    >▼</span>
  );
}

export default BarFiller;