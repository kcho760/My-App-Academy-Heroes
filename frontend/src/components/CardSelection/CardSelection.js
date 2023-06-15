import React from "react";

const CardSelection = ({ cards, selectedCard, setSelectedCard }) => {
  return (
    <div className="card-selection">
      {cards.map((card, index) => (
        <button
          key={index}
          className="card-option"
          onMouseEnter={() => setSelectedCard(index)}
          onMouseLeave={() => setSelectedCard(null)}
        >
          <div className="card-name">{card.name}</div>
          <div className="card-ability">{card.abilityType}</div>
          <div className="card-power">{card.abilityPower}</div>
        </button>
      ))}
    </div>
  );
};

export default CardSelection;
