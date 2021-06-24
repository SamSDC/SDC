import React, { useState, useEffect } from "react";
import regeneratorRuntime from "regenerator-runtime";

import SearchBox from ".././SearchBox.jsx";
import QuestionTile from ".././QuestionTile.jsx";
import AddQuestion from ".././AddQuestion.jsx";

import style from ".././QuestionList.module.css";

const QuestionList = (props) => {
  const [questions, setQuestion] = useState(null);
  const [preview, setPreview] = useState(true);
  const [search, setSearch] = useState('');
  let [updateQuestions, setUpdateQuestions] = useState(0);

  useEffect(async () => {
    try {
      const response = await fetch(`/api/qa/questions?product_id=${props.id}&page=${1}&count=${100}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json();
      setQuestion(data);
    } catch(err) {
      console.log("err", err)
    }
  }, [updateQuestions]);


  const getQuestionList = () => {
    if (!questions) {
      return [];
    }

    if (search.length >= 3) {
      let filteredList = questions.filter(question => {
        return question.question_body.toLowerCase().includes(search.toLowerCase())
      })
      return filteredList;
    }

    if (preview) {
      return questions.slice(0, 4);
    }

    return questions;
  }

  const questionsList = getQuestionList();

  const handleMoreQuestionsClick = () => {
    setPreview(!preview);
  }

  const searchQuestionList = (searchTerm) => {
    setSearch(searchTerm);
  }

  const addQuestion = () => {
    setUpdateQuestions(++updateQuestions)
  }

  const moreQuestions = questions && questions.length > 2;

  const addMoreQuestions = preview ? 'MORE ANSWERED QUESTIONS' : 'COLLAPSE ANSWERED QUESTIONS';

  return (
    <div className={style.qaSection}>
      <div>
        <div className={style.qaTitle}>
          <div>QUESTIONS & ANSWERS</div>
        </div>
        {questions &&
        <div>
          <div>
            <SearchBox
            searchQuestionList={searchQuestionList}/>
          </div>
          <div className={style.qaList}>
              {questionsList.map(question =>
                <QuestionTile
                  productName={props.productName}
                  question={question}
                  key={question.question_id}
                  addQuestion={addQuestion}
                  search={search}
                />
              )}
          </div>
        </div>
        }
        <div className={style.questionListButtons}>
          { moreQuestions &&
            <button
              onClick={handleMoreQuestionsClick}>
                {addMoreQuestions}
            </button>
          }
          <AddQuestion
            productId={props.id}
            productName={props.productName}
            addQuestion={addQuestion}
          />
        </div>
      </div>
    </div>
  )
};

export default QuestionList;
