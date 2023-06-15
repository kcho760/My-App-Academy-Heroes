import React from "react";
import Card from "../Card/Card";
import './CardSelection.css';

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
          {selectedCard === index && (
            <div className="card-detail">
              <Card card={card} />
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default CardSelection;
