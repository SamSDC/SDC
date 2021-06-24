import React, { useState } from "react";
import Thumbnail from "./Thumbnail.jsx";
import style from "./QuestionList.module.css";
import { DateTime } from "luxon";

const AnswerTile = (props) => {
  let [helpfulCount, setHelpfulCount] = useState(props.answer.helpfulness);
  let [updateHelpfulness, setUpdateHelpfulness] = useState(false);
  let [updateReport, setUpdateReport] = useState(' Report');
  let [checkReport, setCheckReport] = useState(false);

  const answer_id = props.answer.id;

  const handleHelpfulnessClick = async () => {
    setUpdateHelpfulness(true);

    if (!updateHelpfulness) {
      setHelpfulCount(helpfulCount + 1);

      try {
        const response = await fetch(`/api/qa/answers/${answer_id}/helpful`, {
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
    setCheckReport(true)

    if (!checkReport) {
      try {
        const response = await fetch(`/api/qa/answers/${answer_id}/report`, {
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

  let answerNameStyle = props.answer.answerer_name.toLowerCase() === 'seller' ? style.answerNameBold : style.answerName;

  let reportedStyle = updateReport === 'Reported' ? style.answerReportBold : style.answerReport;

  return (
    <div>
      <div className={style.answerBody}>
        <div className={style.answerLetter}>
          A:
        </div>
        <div className={style.answerText}>
          {props.answer.body}
        </div>
      </div>
      <div>
          <div className={style.thumbails}>
            {props.answer.photos.map(photo =>
              <Thumbnail source={photo} key={photo}/>
            )}
          </div>
      </div>
      <div className={style.answerMeta}>
        <div className={answerNameStyle}>
          by {props.answer.answerer_name}
        </div>
        <div className={style.answerDate}>
          {DateTime.fromISO(props.answer.date, {zone: "UTC"}).toFormat('DDD')}
        </div>
        <div className={style.answerHelpful}>
          Helpful?
        </div>
        <div
          className={style.answerHelpfulness}
          onClick={handleHelpfulnessClick}>
            Yes ({helpfulCount})
        </div>
        <div
          className={reportedStyle}
          onClick={handleReportClick}>
            {updateReport}
        </div>
      </div>
    </div>
  );
};

export default AnswerTile;