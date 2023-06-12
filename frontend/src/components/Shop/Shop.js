import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../../store/session';


const Shop = () => {
  const [gold, setGold] = useState(0);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchPlayerGold = async () => {
      try {
        // Dispatch getCurrentUser action to get the user's data
        await getCurrentUser();
        // Retrieve the user's gold from the user object in the session store
        const gold = sessionStorage.getItem('gold');
        setGold(gold);
      } catch (error) {
        console.error('Error fetching player gold:', error);
      }
    };
  
    fetchPlayerGold();
  }, [pullCard]); //fix to refresh on gold spend
  
  const pullCard = () => {
    if (gold >= 10) {
      // Simulate pulling a card
        //post

      setCards([...cards, newCard]);
      setGold(gold - 10);
    } else {
      alert("You don't have enough gold to pull a card.");
    }
  };

  return (
    <div>
      <h1>Shop</h1>
      <p>Gold: {gold}</p>
      <button onClick={pullCard}>Pull a Card (Cost: 10 Gold)</button>
      <h2>Your Cards</h2>
      {cards.length === 0 ? (
        <p>No cards yet. Start pulling!</p>
      ) : (
        <ul>
          {cards.map((card, index) => (
            <li key={index}>
              <h3>{card.name}</h3>
              <p>Rarity: {card.rarity}</p>
              <p>Ability: {card.abilityType} ({card.abilityValue})</p>
              <img src={card.imageUrl} alt="Card" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Shop;
