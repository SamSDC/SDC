import React from "react";
import styles from "./Reviews.module.css";
import Star from "./Star.jsx";

function Stars(props) {
  var rating = props.rating || 0;
  var stars = [];
  while (stars.length < 5) {
    if (rating > 1) {
      stars.push(1);
    } else if (rating > 0) {
      var empty = Math.abs(0 - rating);
      var quart = Math.abs(0.25 - rating);
      var half = Math.abs(0.5 - rating);
      var three = Math.abs(0.75 - rating);
      var full = Math.abs(1 - rating);
      var closest = Math.min(empty, quart, half, three, full);
      if (closest === empty) {
        stars.push(0);
      } else if (closest === quart) {
        stars.push(0.25);
      } else if (closest === half) {
        stars.push(0.5);
      } else if (closest === three) {
        stars.push(0.75);
      } else if (closest === full) {
        stars.push(1);
      }
    } else {
      stars.push(0);
    }
    rating--;
  }

  return stars.map((item, i) => {
    return (
      <div key={i} className={styles.stars}>
        <Star rating={item} />
      </div>
    );
  });
}

export default Stars;
