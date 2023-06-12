import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../../store/questions";
import "./GamePage.css"

const GamePage = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => Object.values(state.questions));

  useEffect(() => {
    dispatch(fetchQuestions());
  }, []);

  return (
    <div className="game-page-container">
      <div className="game-page-content left">
        <div className="game-content game-user-info">USER PROFILE CARD</div>
        <div className="game-content game-user-deck">SELECTED CARD GOES HERE</div>
        <div className="game-content game-questions">QUESTIONS COMPONENT HERE</div>
      </div>
      <div className="game-page-content right">
        <div className="game-board">BOARD COMPONENT GOES HERE</div>
      </div>
    </div>
  )
};

export default GamePage;
