import React from "react";
import "./Card.css";

function Card({ card }) {
  const borderColors = {
    common: "green",
    uncommon: "purple",
    rare: "orange",
  };

  const borderColor = borderColors[card.rarity] || "black";

  return (
    <div
      className={`card-body ${card.rarity}`}
      style={{
        border: `1px solid ${borderColor}`,
        padding: "10px",
        margin: "10px",
        borderRadius: "5px",
        maxWidth: "200px",
      }}
    >
      <div className="card-header">
        <h2>{card.name}</h2>
        <p>{card.rarity}</p>
      </div>
      <img src={card.imageUrl} alt={card.name} style={{ width: "100%" }} />
      <div className="card-footer">
        <p>{card.abilityType}</p>
        <p>{card.abilityValue}</p>
        <button>Use</button>
      </div>
    </div>
  );
}

export default Card;
