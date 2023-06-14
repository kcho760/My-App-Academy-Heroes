import React from "react";
import idle from "../GamePage/assets/idle.gif";
import './gamePlayer.css';
import attack from "../GamePage/assets/attack.gif";
const GamePlayer = ({ user, attackAnimation }) => {
  // Add your player character component logic here

  return (
    <div className="player-character">
      <div className="player-image">
        <img className="player-picture" src={user.imageUrl} alt="User" />
      </div>
      <div className="player-sprite"> 
      {attackAnimation ? <img className="p-sprite" src={attack} alt="Attack" /> : <img className="p-sprite" src={idle} alt="Sprite" />}
      </div>
    </div>
  );
};

export default GamePlayer;
