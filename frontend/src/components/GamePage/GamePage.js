import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../../store/questions";
import "./GamePage.css";
import PlayerStat from "../PlayerStat/PlayerStat";
import Question from "../Question/Question";
import LoadingPage from "../Utils/Loading/LoadingPage";
import { Redirect } from "react-router-dom";
import Enemy from "../Enemy/enemy.js";
import enemy1 from "../Enemy/enemy1.js";
import enemy2 from "../Enemy/enemy2.js";
import kinTheConqueror from "../Enemy/kinTheConqueror.js";
import Kyletronic from "../Enemy/kyletronic";
import GamePlayer from "../GameCharacter/gamePlayer";
import { updateUser, getCurrentUser } from "../../store/session";
import GameOver from "./GameOver";
import Card from "../Card/Card";
import CardSelection from "../CardSelection/CardSelection";
import jwtFetch from "../../store/jwt";
import attackAudio1 from "../../assets/audio/attackAudio.mp3";
import attackAudio2 from "../../assets/audio/yamatoCannon3.mp3";
import explosionAudio from "../../assets/audio/Explosion2.mp3";

const GamePage = () => {
  const defaultPlayerAttack = 25;
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
  const [round, setRound] = useState(1);
  const [playerAttack, setPlayerAttack] = useState(defaultPlayerAttack);
  const [showExplosion, setShowExplosion] = useState(false);
  const [showPlayerExplosion, setShowPlayerExplosion] = useState(false);
  const [attackAnimation, setAttackAnimation] = useState(false);
  const [isDefeated, setIsDefeated] = useState(false);
  const [shouldAnimateOut, setShouldAnimateOut] = useState(false);
  const playerCards = useSelector((state) => state.session.user.ownedCards);
  const [selectedCard, setSelectedCard] = useState(null);
  const filteredCards = playerCards.filter((card) => card.selected).slice(0, 4);
  const [loadBuffer, setLoadBuffer] = useState(true);
  const [incorrectAudio, setIncorrectAudio] = useState(null);

  useEffect(() => {
    setIncorrectAudio(new Audio(explosionAudio));
  }, []);


  useEffect(() => {
    dispatch(fetchQuestions())
      .then(() => setLoadBuffer(false))
      .catch((error) => console.error(error));
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
      const correctAudio = new Audio(attackAudio1);
      correctAudio.play();
      setTimeout(() => {
        setShowExplosion(true);
      }, 800);
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
    } else {
      if (user.health - enemy.attack <= 0) {
        setGameover(true);
        deleteCards();
        user.health = 100;

        return;
      } else {
        user.health -= enemy.attack;
      
        if (incorrectAudio) {
          incorrectAudio.currentTime = 0;
          incorrectAudio.play();
        }
      
        setShowPlayerExplosion(false); // Hide the explosion initially
      
        setTimeout(() => {
          setShowPlayerExplosion(true); // Show the explosion after 1 second
        }, 1000);
      
        setTimeout(() => {
          setShowPlayerExplosion(false); // Hide the explosion after 2 seconds
        }, 2000);
      }
      

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
        deleteCards();
        user.health = 100;
        dispatch(updateUser(user));

        return;
      } else {
        user.health -= enemy.attack;
      }
    }

    // need to dispatch an update to player becuase of gold and hp update
    //all changes above are temporary and only in frontend store state, reset upon refresh currently

    nextQuestion();
  };

  const nextQuestion = () => {
    // giving 2s buffer before switching to next question
    setPlayerAttack(()=>defaultPlayerAttack);
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

  const handleEnemyLogic = (instantKill = false) => {
    if (instantKill || enemy.health - playerAttack <= 0) {
      // Handle enemy defeated logic, such as updating round, gaining rewards, etc.
      // For example:
      user.gold += enemy.gold;
      const newRound = round + 1;
      setRound(newRound);

      if ((newRound + 5) % 5 === 3 || (newRound + 5) % 5 === 4) {
        setAttackAnimation(true);
        setTimeout(() => {
          setEnemy((prevEnemy) => ({
            ...prevEnemy,
            health: 0, // Show enemy health as 0 during the delay
          }));
          setTimeout(() => {
            setShouldAnimateOut(true);
            setTimeout(() => {
              setEnemy(enemy2);
              setEnemy((prevEnemy) => ({
                ...prevEnemy,
                health: prevEnemy.defaultHealth,
              }));
              setShouldAnimateOut(false);
              setAttackAnimation(false);
            }, 500);
          }, 700);
        }, 1000);
      } else if (newRound % 5 === 0) {
        setAttackAnimation(true);
        setTimeout(() => {
          setEnemy((prevEnemy) => ({
            ...prevEnemy,
            health: 0, // Show enemy health as 0 during the delay
          }));
          setTimeout(() => {
            setShouldAnimateOut(true);
            setTimeout(() => {
              const randomEnemy =
                Math.random() < 0.5 ? kinTheConqueror : Kyletronic;
              setEnemy(randomEnemy);
              setEnemy((prevEnemy) => ({
                ...prevEnemy,
                health: prevEnemy.defaultHealth,
              }));
              setShouldAnimateOut(false);
              setAttackAnimation(false);
            }, 500);
          }, 700);
        }, 1000);
      } else {
        setAttackAnimation(true);
        setTimeout(() => {
          setEnemy((prevEnemy) => ({
            ...prevEnemy,
            health: 0, // Show enemy health as 0 during the delay
          }));
          setTimeout(() => {
            setEnemy(enemy1);
            setEnemy((prevEnemy) => ({
              ...prevEnemy,
              health: prevEnemy.defaultHealth,
            }));
            setAttackAnimation(false);
          }, 700);
        }, 1000);
      }

      if (newRound % 5 === 1) {
        setTimeout(() => resetCardUse(), 1000);
      }
    } else {
      setEnemy((prevEnemy) => ({
        ...prevEnemy,
        health: prevEnemy.health - playerAttack,
      }));
    }
  };

  const handleCardClick = (e, card, elClassName) => {
    e.preventDefault();
    const cardEl = document.querySelector(elClassName);
    cardEl.classList.add("card-in-use");
    if (!cardEl.disabled) {
      cardEl.disabled = true;
      switch (card.abilityType) {
        case "Attack Up":
          setPlayerAttack((prev) => prev + card.abilityValue);
          break;
        case "Attack Multiplier":
          setPlayerAttack((prev) => prev * card.abilityValue);
          break;
        case "Heal":
          user.health += card.abilityValue;
          break;
        case "Instant Kill":
          const newTotal = totalAnswered + 1;
          setTotalAnswered(newTotal);
          handleEnemyLogic(true);
          nextQuestion();
          break;
        default:
          break;
      }
    }
  };

  const resetCardUse = () => {
    const cardsInUse = document.querySelectorAll(".card-in-use");
    cardsInUse.forEach((button) => {
      button.disabled = false;
    });
  };

  const deleteCards = async () => {
    const cardsToDelete = filteredCards.map((card) => card._id);
    const userId = user._id;

    const payload = { userId, cardsToDelete };

    try {
      const res = await jwtFetch("/api/cards", {
        method: "DELETE",
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Error deleting cards:", error);
    } finally {
      dispatch(getCurrentUser());
    }
  };

  const restart = () => {
    setLoadBuffer(true);
    setPlayerAttack(defaultPlayerAttack);
    setTotalAnswered(0);
    setTotalCorrects(0);
    setRound(1);
    setEnemy(enemy1);
    setEnemy((prevEnemy) => ({
      ...prevEnemy,
      health: prevEnemy.defaultHealth,
    }));

    setTimeout(() => {
      setGameover(false);
    }, 500);

    setTimeout(() => {
      setLoadBuffer(false);
    }, 1000);

    dispatch(fetchQuestions()).then(() => {
      setTimeout(() => {
        setGameover(false);
      }, 500);

      setTimeout(() => {
        setLoadBuffer(false);
      }, 1000);
    });
  };

  if (loadBuffer) return <LoadingPage />;

  return (
    <div className="game-page-container">
      <div className="game-page-content left">
        <div className="game-content game-user-info">
          <PlayerStat playerAttack={playerAttack} />
        </div>
        <div className="answered-stats">
          <div className="total-answered">
            Total questions answered: {totalAnswered}
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
        <div
          className={`game-content enemy-board ${
            shouldAnimateOut ? "animate-out" : ""
          }`}
        >
          <Enemy
            enemy={enemy}
            showExplosion={showExplosion}
            isDefeated={isDefeated}
          />
        </div>
        <div className="game-content player-board">
          <div>
            <GamePlayer
              user={user}
              attackAnimation={attackAnimation}
              showPlayerExplosion={showPlayerExplosion}
            />
          </div>
          {!gameOver && filteredCards.length !== 0 && (
            <div className="Card-Choice-Container">
              <CardSelection
                cards={filteredCards}
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
                handleCardClick={handleCardClick}
              />
              {selectedCard !== null && (
                <div className="card-detail">
                  <Card card={filteredCards[selectedCard]} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
