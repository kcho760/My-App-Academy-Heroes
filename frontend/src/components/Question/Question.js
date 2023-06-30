import "./Question.css";
import { useEffect } from "react";

const Question = ({
  question,
  selected,
  setSelected,
  handleSelect,
  message,
  setMessage,
}) => {
  const title = question.question;
  const possibleAnswers = Object.values(question.answers).filter(
    (answer) => answer !== null
  );

  useEffect(() => {
    setSelected(false);
    setMessage(<></>);
  }, [question]);

  return (
    <div className="question-field">
      <h2 className="question-title"><span>Question:</span> {title}</h2>
      <p className="question-tag">
        Tag: {Object.values(...question.tags).join(",")}
      </p>
      <div className="separator">
        <hr />
      </div>
      {message}
      <span className="answer-ins">Choose your answer:</span>
      <div className="answer-group">
        {possibleAnswers.map((answer) => {
          return (
            <button
              key={answer}
              className="answer-item"
              value={answer}
              disabled={selected}
              onClick={(e) => handleSelect(e)}
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
