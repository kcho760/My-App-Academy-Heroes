import { useSelector } from "react-redux";
import defaultAvatar from "../../assets/images/defaultAvatar.png";
import "./PlayerStat.css";

const PlayerStat = () => {
  const player = useSelector((state) => state.session.user);

  const avatar = player.imageUrl ? player.imageUrl : defaultAvatar;
  return (
    <div className="player-stat-badge">
      <div className="player-stat-content left player-img">
        <img className="player-stat-avatar" src={avatar} alt="player avatar" />
      </div>
      <div className="player-stat-content right">
        <h2>{player.username}</h2>
        <p className="player-info">Coins: {player.coin ? player.coin : "Need adjustment"}</p>
        <div className="health-bar-container player-info">
          <span>HP: {player.health}</span>
          <div className="health-bar-wrapper">
            <div className="health-bar outter">
              <div
                className="health-bar inner"
                style={{
                  width: `calc(${
                    player.health / 100 > 1 ? 1 : player.health / 100
                  } * 100%)`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStat;
