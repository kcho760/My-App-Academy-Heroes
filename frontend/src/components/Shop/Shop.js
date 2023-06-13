import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../../store/session';


const Shop = () => {
  const [gold, setGold] = useState(0);
  const [playerCards, setPlayerCards] = useState([]);

  
  const pullCard = async () => {
    if (gold >= 10) {
      try {
        // Dispatch getCurrentUser action to get the user's data
        const user = await getCurrentUser();
        const userId = user.userId; // Assuming the user object contains the userId property
  
        const response = await fetch('/cards', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });
        
        if (response.ok) {
          const updatedCard = await response.json();
          setPlayerCards([...playerCards, updatedCard]);
          setGold(gold - 10);
        } else {
          console.error('Failed to assign card:', response.status);
        }
      } catch (error) {
        console.error('Error assigning card:', error);
      }
    } else {
      alert("You don't have enough gold to pull a card.");
    }
  };
  
  useEffect(() => { //retrieve player gold and cards
    const fetchPlayerGoldAndCards = async () => {
      try {
        // Dispatch getCurrentUser action to get the user's data
        await getCurrentUser();

        // Retrieve the user's gold from the user object in the session store
        const playerGold = sessionStorage.getItem('gold');
        setGold(playerGold);

        // Retrieve the user's cards
        const response = await fetch('/cards/user/:userid'); // Replace :userid with the actual user ID
        if (response.ok) {
          const cards = await response.json();
          setPlayerCards(cards);
        } else {
          console.error('Failed to fetch player cards:', response.status);
        }
      } catch (error) {
        console.error('Error fetching player gold and cards:', error);
      }
    };

    fetchPlayerGoldAndCards();
  }, [pullCard]);
  
  
  
  return (
    <div>
      <h1>Shop</h1>
      <p>Gold: {gold}</p>
      <button onClick={pullCard}>Pull a Card (Cost: 10 Gold)</button>
      <h2>Your Cards</h2>
      {playerCards.length === 0 ? (
        <p>No cards yet. Start pulling!</p>
      ) : (
        <ul>
          {playerCards.map((card, index) => (
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
