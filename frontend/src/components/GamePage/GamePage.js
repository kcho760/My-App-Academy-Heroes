import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../../store/questions";
import "./GamePage.css";
import PlayerStat from "../PlayerStat/PlayerStat";
import Question from "../Question/Question";
import LoadingPage from "../Utils/Loading/LoadingPage";
import { Redirect } from "react-router-dom/";
import Enemy from "../Enemy/enemy.js";
import enemy1 from "../Enemy/enemy1.js";
import enemy2 from "../Enemy/enemy2.js";

const GamePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const questions = useSelector((state) => Object.values(state.questions));
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, []);

  if(!user) return <Redirect to="/login" />
  if (questions.length === 0) return <LoadingPage />;

  const totalQuestions = questions.length;

  return (
    <div className="game-page-container">
      <div className="game-page-content left">
        <div className="game-content game-user-info">
          <PlayerStat />
        </div>
        <div className="game-content game-questions">
          <Question
            question={questions[idx]}
            idx={idx}
            setIdx={setIdx}
            max={totalQuestions}
          />
        </div>
      </div>
      <div className="game-page-content right">
        <div className="game-content enemy-board">
          <Enemy enemy={enemy1} />
        </div>
        <div className="game-content player-board">
          <div className="game-player">Player character</div><div className="game-player-cards">Player selected cards</div>

        </div>
      </div>
    </div>
  );
};

export default GamePage;
