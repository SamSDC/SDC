import React from "react";
import styles from "./Reviews.module.css";
import fullStar from "./starImages/fullStar.png";
import starOutline from "./starImages/starOutline.png";
import halfStar from "./starImages/halfStar.png";
import quarterStar from "./starImages/quarterStar.png";
import threeFourthStar from "./starImages/threeFourthStar.png";

function Star(props) {
  var star =
    props.rating === 0
      ? starOutline
      : props.rating === 1
      ? fullStar
      : props.rating === 0.25
      ? quarterStar
      : props.rating === 0.5
      ? halfStar
      : threeFourthStar;

  return <img alt='star-rating' onClick={props.onClick} className={styles.star} src={star}></img>
}

export default Star;
