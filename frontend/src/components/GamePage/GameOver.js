import "./GameOver.css";
import { useHistory } from "react-router-dom/";

const GameOver = ({ restart }) => {
  const history = useHistory();
  const toProfile = (e) => {
    e.preventDefault();
    history.push("/profile");
  };
  return (
    <div className="game-over-container">
      <div className="game-over-content">
        <h2 className="game-over-header">GAME OVER...</h2>
        <div className="game-over-text">
          <p>
            Cards in your current deck has been <span>DELETED</span>
          </p>
          <p>Go back to profile to pull or select more cards</p>
          <p>Or restart the game right away...</p>
        </div>
        <div className="game-over-buttons">
          <button className="to-profile-btn" onClick={toProfile}>
            Profile
          </button>
          <button className="restart-btn" onClick={restart}>Restart</button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
