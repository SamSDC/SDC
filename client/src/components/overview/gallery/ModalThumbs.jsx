import React, { useEffect, useState } from "react";
import style from "../MainOverview.module.css";

const ModalThumbs = ({ thumbUrl, handleThumb }) => {
  
  return (
    <div id={style.thumbModalImage} style={{borderRadius: '0%', backgroundColor: '#D96C06', marginBottom: '28px'}}
      onClick={(e) => {
        handleThumb(e, thumbUrl);
      }}
      >      
    </div>
  );
};

export default ModalThumbs;
