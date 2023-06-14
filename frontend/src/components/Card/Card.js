import React from "react";
import "./Card.css";
import { useSelector } from "react-redux";

function Card({ card }) {
  const ownedCards = useSelector((state) => state.session.user.ownedCards);

  const isOwned = ownedCards.some((ownedCard) => ownedCard.name === card.name);
  const amountOwned = isOwned
    ? ownedCards.filter((ownedCard) => ownedCard.name === card.name).length
    : 0;

  const borderColors = {
    N: "green",
    R: "purple",
    SR: "orange",
  };

  const borderColor = borderColors[card.rarity] || "black";

  return (
    <div
      className={`card ${isOwned ? `card-body ${card.rarity}` : ""}`}
      style={{
        border: `1px solid ${borderColor}`,
        padding: "10px",
        margin: "10px",
        borderRadius: "5px",
        maxWidth: "200px",
        minHeight: "250px",
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
      </div>
    </div>
  );
}

export default Card;
