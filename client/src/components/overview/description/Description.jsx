import React from "react";
import Features from "./Features.jsx";
import style from "../MainOverview.module.css";

const Description = ({ prod }) => {
  return (
    <div>
      <div className={style.slogan}>{prod && prod.slogan}</div>
      <br></br>
      <div className={style.info}>{prod && prod.description}</div>
      <br></br>
      <div className={style.social}>
        <div id={style.twitter}>
          <i className="fab fa-twitter"></i>
        </div>
        <div id={style.insta}>
          <i className="fab fa-instagram"></i>
        </div>
        <div id={style.fb}>
          <i className="fab fa-facebook"></i>
        </div>
        <div id={style.link}>
          <i className="fab fa-linkedin"></i>
        </div>
      </div>
    </div>
  );
};

export default Description;
