import React, { useEffect, useState } from "react";
import style from "../MainOverview.module.css";

const Thumbnails = ({ thumbUrl, handleThumb }) => {
  

  return (
    <div id={style.thumbImage} style={{background: thumbUrl ? `url('${thumbUrl}') center / cover` : null}}
      onClick={(e) => {
        handleThumb(e, thumbUrl);
      }}
    >
    </div>
  );
};

export default Thumbnails;
