import "./Question.css";
import { shuffleArray } from "../Utils/Helpers/HelperFunctions";
import { useEffect, useState } from "react";

const Question = ({ question, idx, setIdx, max }) => {
  const [selected, setSelected] = useState(false);
  const title = question.question;
  const correctAnswer = question.answers[question.correct_answer];
  const possibleAnswers = Object.values(question.answers).filter(
    (answer) => answer !== null
  );

  useEffect(() => {
    setSelected(false);
  }, [question]);

  const shuffledAnswers = shuffleArray(possibleAnswers);
  console.log("All possible answers:");
  console.log(possibleAnswers);
  console.log("Shuffled answers:");
  console.log(shuffledAnswers);
  console.log("The correct answer:");
  console.log(correctAnswer);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.value === correctAnswer) {
      console.log("Thats the correct answer!");
      setSelected(true);
      if (idx + 1 < max) {
        console.log("current idx:");
        console.log(idx);
        setIdx((prevIdx) => prevIdx + 1);
      } else {
        console.log("no more questions");
        setIdx(0);
      }
    } else {
      console.log("Opps thats wrong");
    }
  };
  return (
    <div className="question-field">
      <h2 className="question-title">Question: {title}</h2>
      <p className="question-tag">Tags: {Object.values(...question.tags).join(",")}</p>
      <div className="separator">
        <hr />
      </div>
      <div className="answer-group">
        {shuffledAnswers.map((answer) => {
          return (
            <button
            key={answer}
              className="answer-item"
              value={answer}
              disabled={selected}
              onClick={handleClick}
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
