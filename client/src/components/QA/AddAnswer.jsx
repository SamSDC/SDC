import React, { useState } from "react";

import Modal from "./Modal.jsx";
import AnswerForm from "./AnswerForm.jsx";

import style from "./QuestionList.module.css";

const AddAnswer = (props) => {
  const [showModal, setShowModal] = useState(false);


  const openOnClick = () => {
    setShowModal(true);
  }

  const closeOnClick = () => {
    setShowModal(false);
  }

  const modalSizeWide = false;

  return (
    <div>
      <div onClick={openOnClick}>
        Add Answer
      </div>
      {showModal &&
        <Modal closeOnClick={closeOnClick} size={modalSizeWide}>
          <AnswerForm
            questionId={props.questionId}
            productName={props.productName}
            questionBody={props.questionBody}
            addQuestion={props.addQuestion}
          />
        </Modal>
      }
    </div>
  )
};

export default AddAnswer;