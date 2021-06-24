import React, { useState } from "react";
import AnswerTile from "./AnswerTile.jsx";
import style from "./QuestionList.module.css";

const AnswerList = (props) => {
  const [preview, setPreview] = useState(true);


  const handleMoreAnswersClick = () => {
    setPreview(!preview);
  }

  const first = 'seller' ;

  const sortedAnswerList = props.answers && props.answers.sort((a, b) => {
    if (first === a[1].answerer_name.toLowerCase() && first !==  b[1].answerer_name.toLowerCase()) {
      return -1
    }

    if (first !== a[1].answerer_name.toLowerCase() && first ===  b[1].answerer_name.toLowerCase()) {
      return 1
    }

    return b[1].helpfulness - a[1].helpfulness
  });


  const answerList = preview ? sortedAnswerList.slice(0, 2) :
  sortedAnswerList;

  const showAnswers =  props.answers.length > 2;

  const showMoreAnswers = preview ?  'See more answers' : 'Collapse answers';

  return (
    <div>
      <div className={style.answerList}>
        {props.answers &&
          <div className={style.answerSection}>
              {answerList.map(answer =>
                <AnswerTile answer={answer[1]} key={answer[1].id}/>
              )}
          </div>
        }
        { showAnswers &&
          <div
            className={style.loadMoreAnswers}
            onClick={handleMoreAnswersClick}>
              {showMoreAnswers}
          </div>
        }
      </div>
    </div>
  );

 };
 export default AnswerList;