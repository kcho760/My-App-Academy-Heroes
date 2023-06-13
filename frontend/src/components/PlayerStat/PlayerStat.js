import { useSelector } from "react-redux";
import defaultAvatar from "../../assets/images/defaultAvatar.png";
import "./PlayerStat.css";
import { useHistory } from "react-router-dom";

const PlayerStat = () => {
  const player = useSelector((state) => state.session.user);
  const history = useHistory()
  
  if (!player) {history.push('/')};

  const avatar = player.imageUrl ? player.imageUrl : defaultAvatar;
  return (
    <div className="player-stat-badge">
      <div className="player-stat-content left player-img">
        <img className="player-stat-avatar" src={avatar} alt="player avatar" />
      </div>
      <div className="player-stat-content right">
        <h2>{player.username}</h2>
        <p>HP: {player.health}</p>
        <p>Coins: {player.coin ? player.coin : "Need adjustment"}</p>
      </div>
    </div>
  );
};

export default PlayerStat;
