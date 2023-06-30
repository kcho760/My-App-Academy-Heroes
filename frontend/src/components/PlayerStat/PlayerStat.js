import { useSelector } from "react-redux";
import "./PlayerStat.css";

const PlayerStat = ({playerAttack}) => {
  const player = useSelector((state) => state.session.user);

  return (
    <div className="player-stat-badge">
      <div className="avatar-container">
        <img className="player-stat-avatar" src={player.imageUrl} alt="player avatar" />
      </div>
      <div className="player-stat-content">
        <h2>{player.username}</h2>
        <p className="player-info">Gold: {player.gold}</p>
        <p className="player-attack">Attack: {playerAttack}</p>
        <div className="health-bar-container player-info">
          <span className="health-text">HP: {player.health}</span>
          <div className="health-bar-wrapper">
            <div className="health-bar outter">
              <div
                className="health-bar inner"
                style={{
                  width: `calc(${
                    player.health / 100 > 1 ? 1 : player.health / 100
                  } * 100%)`,
                  backgroundImage: player.health < 50 ? "linear-gradient(to right, #ff6e6e 0%, #ff4444 10%, #ff0000 40%, #ff0000 60%, #ff4444 90%, #ff6e6e 100%)" : ""
                }}></div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStat;
