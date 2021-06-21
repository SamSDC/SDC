import React, { useState } from "react";
import Modal from ".././reviews/Modal.jsx";
import style from "./QuestionList.module.css";
import styleReview from ".././reviews/Reviews.module.css";
import LazyLoad from "react-lazyload";

const Thumbnail = (props) => {
  const [showModal, setShowModal] = useState(false);

  const openOnClick = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <LazyLoad height={70} once>
        <img
          onClick={openOnClick}
          className={style.smallImg}
          src={`${props.source}`}
        />
      </LazyLoad>
      {showModal && (
        <Modal>
          <div className={style.closeIcon}>
            <i className="fas fa-times"></i>
          </div>
          <div className={styleReview.modal}>
            <img src={props.source} onClick={openOnClick} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Thumbnail;
