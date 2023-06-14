import "./Question.css";
import { shuffleArray } from "../Utils/Helpers/HelperFunctions";
import { useEffect, useState } from "react";

const Question = ({ question, selected, setSelected, handleSelect, message, setMessage }) => {
  const title = question.question;
  const possibleAnswers = Object.values(question.answers).filter(
    (answer) => answer !== null
  );
  const shuffledAnswers = shuffleArray(possibleAnswers);

  useEffect(() => {
    setSelected(false);
    setMessage(<></>)
  }, [question]);


  return (
    <div className="question-field">
      <h2 className="question-title">Question: {title}</h2>
      <p className="question-tag">Tag: {Object.values(...question.tags).join(",")}</p>
      <div className="separator">
        <hr />
      </div>
      {message}
      <div className="answer-group">
        {shuffledAnswers.map((answer) => {
          return (
            <button
            key={answer}
              className="answer-item"
              value={answer}
              disabled={selected}
              onClick={handleSelect}
            >
              {answer}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Question;
