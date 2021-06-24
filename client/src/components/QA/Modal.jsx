import React, { useState } from "react";
import style from "./QuestionList.module.css";

const Modal = (props) => {
  let modalContentStyle = props.size
    ? style.modalContentWide
    : style.modalContent;

  return (
    <div>
      <div className={style.backgroundModal}>
        <div className={style.modalWrapper}>
          <div className={modalContentStyle}>
            <div className={style.closeIcon} onClick={props.closeOnClick}>
              <i className="fas fa-times"></i>
            </div>
            <div>{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
