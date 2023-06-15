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
import GamePlayer from "../GameCharacter/gamePlayer";
import { updateUser } from "../../store/session";
import GameOver from "./GameOver";

const GamePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const questions = useSelector((state) => Object.values(state.questions));
  const [idx, setIdx] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [totalCorrects, setTotalCorrects] = useState(0);
  const [selected, setSelected] = useState(false);
  const [gameOver, setGameover] = useState(false);
  const [message, setMessage] = useState(<></>);
  const [enemy, setEnemy] = useState(enemy1);
  const [round, setRound] = useState(1); // for use when kill enemy
  const [playerAttack, setPlayerAttack] = useState(50); // for use when kill enemy
  const [showExplosion, setShowExplosion] = useState(false);
  const [attackAnimation, setAttackAnimation] = useState(false); // for use when kill enemy
  useEffect(() => {
    dispatch(fetchQuestions());
  }, []);

  useEffect(() => {
    dispatch(updateUser(user));
  }, [user.gold, user.health]);

  if (!user) return <Redirect to="/login" />;
  if (questions.length === 0) return <LoadingPage />;

  const max = questions.length;
  const question = questions[idx];
  const correctAnswers = Object.values(question.correct_answers)
    .map((correct, idx) => {
      if (correct === "true") {
        return Object.values(question.answers)[idx];
      } else return null;
    })
    .filter((ans) => ans);

  console.log(correctAnswers);

  const correct = (ans) =>
    correctAnswers.find((correctAns) => correctAns === ans);

  const handleSelect = (e) => {
    e.preventDefault();
    setSelected(true);
    const newTotal = totalAnswered + 1;
    setTotalAnswered(newTotal);
    const answer = e.target.value;
    if (!!correct(answer)) {
      // stuff that happens when user answers correctly
      setAttackAnimation(true);
      setTimeout(() => {
        setShowExplosion(true);
      }, 1000);

      setTimeout(() => {
        setAttackAnimation(false);
        setShowExplosion(false);
      }, 2000);

      handleEnemyLogic();
      const newCorrects = totalCorrects + 1;
      setTotalCorrects(newCorrects);
      user.gold += 1;
      setMessage(
        <div className="answer-result correct">
          <div className="result">
            Your answer:{" "}
            <span className="selected-answer correct">{e.target.value}</span>
          </div>
          <div>Nice. That was correct !</div>
        </div>
      );
      // deduct enemy hp and check if enemy hp will be 0 or lower
      // count round
    } else {
      // stuff that happends when user answers wrong
      const healthText = document.querySelector(".health-text");
      healthText.classList.add("flash-red");
      setTimeout(() => {
        healthText.classList.remove("flash-red");
      }, 1500);

      setMessage(
        <div className="answer-result incorrect">
          <div className="result">
            Your answer:{" "}
            <span className="selected-answer incorrect">{e.target.value}</span>
          </div>
          <div>Oops... That was incorrect...</div>
        </div>
      );
      if (user.health - enemy.attack <= 0) {
        setGameover(true);
        user.health = 100;
        // can reset player hp to 100 instead
      } else {
        user.health -= enemy.attack;
      }
    }

    // need to dispatch an update to player becuase of gold and hp update
    //all changes above are temporary and only in frontend store state, reset upon refresh currently

    // giving 2s buffer before switching to next question
    setTimeout(() => {
      if (idx + 1 < max) {
        setIdx((prevIdx) => prevIdx + 1);
      } else {
        dispatch(fetchQuestions()).finally(() => {
          setIdx(0);
        });
      }
    }, 2000);
  };

  const handleEnemyLogic = () => {
    if (enemy.health - playerAttack <= 0) {
      // Handle enemy defeated logic, such as updating round, gaining rewards, etc.
      // For example:
      user.gold += enemy.gold;
      const newRound = round + 1;
      setRound(newRound);
      if (newRound % 3 === 0) {
        setEnemy(enemy2);
        // enemy.health = enemy2.defaultHealth;
      } else {
        setEnemy(enemy1);
        // enemy.health = enemy1.defaultHealth;
      }

      setEnemy((prevEnemy) => ({
        ...prevEnemy,
        health: prevEnemy.defaultHealth,
      }));
    } else {
      setEnemy((prevEnemy) => ({
        ...prevEnemy,
        health: prevEnemy.health - playerAttack,
      }));
    }
  };

  const restart = () => {
    // restart logic, reseting states, etc...
  };

  return (
    <div className="game-page-container">
      <div className="game-page-content left">
        <div className="game-content game-user-info">
          <PlayerStat />
        </div>
        <div className="answered-stats">
          <div className="total-answered">
            Total questions anwered: {totalAnswered}
          </div>
          <div className="total-correct-answered">
            Total correct answered: {totalCorrects}
          </div>
          <div>
            <div className="round">Round: {round}</div>
          </div>
        </div>
        <div className="game-content game-questions">
          {gameOver ? (
            <GameOver restart={restart} />
          ) : (
            <Question
              question={question}
              selected={selected}
              setSelected={setSelected}
              message={message}
              setMessage={setMessage}
              handleSelect={handleSelect}
            />
          )}
        </div>
      </div>
      <div className="game-page-content right">
        <div className="game-content enemy-board">
          <Enemy enemy={enemy} showExplosion={showExplosion} />
        </div>
        <div className="game-content player-board">
          <GamePlayer user={user} attackAnimation={attackAnimation} />
        </div>
      </div>
    </div>
  );
};

export default GamePage;
