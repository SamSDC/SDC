import React, { useState, useEffect } from "react";
import regeneratorRuntime from "regenerator-runtime";

import AnswerList from "./AnswerList.jsx";
import AddAnswer from "./AddAnswer.jsx";

import style from "./QuestionList.module.css";

const QuestionTile = (props) => {
  let [helpfulCount, setHelpfulCount] = useState(props.question.question_helpfulness);
  let [updated, setUpdate] = useState(false);
  let [updateReport, setUpdateReport] = useState(' Report');
  let [checkReport, setCheckReport] = useState(false);

  const question_id = props.question.question_id;

  const handleHelpfulnessClick = async () => {
    setUpdate(true);

    if (!updated) {
      setHelpfulCount(helpfulCount + 1);

      try {
        const response = await fetch(`/api/qa/questions/${question_id}/helpful`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            helpfulness: true
          })
        })
      } catch(err) {
        console.log("err", err)
      }
    }
  }

  const handleReportClick = async () => {
    setUpdateReport('Reported');
    setCheckReport(true);

    if (!checkReport) {
      try {
        const response = await fetch(`/api/qa/questions/${question_id}/report`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reported: true
          })
        })
      } catch(err) {
        console.log("err", err)
      }
    }
  }


  const questionBody = props.question.question_body;

  const questionWords =
    props.search.length >= 3 ?
    questionBody.toLowerCase().split(props.search.toLowerCase()) :
    null;

  let reportedStyle = updateReport === 'Reported' ? style.answerReportBold : style.answerReport;

  return (
    <div>
      <div className={style.questionBody}>
        <div className={style.questionLetter}>
          Q:
        </div>
        <div className={style.questionText}>
          {props.search.length >= 3 ?
          <span>
            {questionWords.map((word, i) => {
              if (i === 0) {
                  return word
              }
              return (
                <>
                  <span className={style.highlightText}>
                    {props.search}
                  </span>
                  {word}
                </>
              )
            })}
          </span>
          : <span>{questionBody}</span>}
        </div>
        <div className={style.questionHelpful}>
          Helpful?
        </div>
        <div
          className={style.questionHelpfulness}
          onClick={handleHelpfulnessClick}>
            Yes ({helpfulCount})
        </div>
        <div
          className={style.questionAddAnswer}>
          <AddAnswer
            questionId={question_id}
            productName={props.productName}
            questionBody={props.question.question_body}
            addQuestion={props.addQuestion}
          />
        </div>
        <div
          className={reportedStyle}
          onClick={handleReportClick}>
          {updateReport}
        </div>
      </div>
      <div>
        <AnswerList
          questionAsker={props.question.asker_name}
          answers={Object.entries(props.question.answers)}
        />
      </div>
    </div>
  )
};

export default QuestionTile;