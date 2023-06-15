import React from "react";
import Card from "../Card/Card";
import "./CardSelection.css";

const CardSelection = ({ cards, selectedCard, setSelectedCard, handleCardClick }) => {

  return (
    <div className="card-selection">
      {cards.map((card, index) => (
          <button
            key={index}
            className={`card-option gamecard-${index}`}
            onMouseEnter={() => setSelectedCard(index)}
            onMouseLeave={() => setSelectedCard(null)}
            onClick={(e) => handleCardClick(e, card, `.gamecard-${index}`)}
          >
            <div className="card-name">{card.name}</div>
            <div className="card-ability">{card.abilityType}</div>
            <div className="card-power">{card.abilityValue}</div>
            {selectedCard === index && (
              <div className="card-detail">
                <Card card={card} />
              </div>
            )}
          </button>
        )
      )}
    </div>
  );
};

export default CardSelection;
