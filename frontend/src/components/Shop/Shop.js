import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../../store/session';
import { useDispatch } from 'react-redux'; // Import useDispatch from react-redux
import jwtFetch from '../../store/jwt';
import { useSelector } from 'react-redux';

const Shop = () => {
  // const [gold, setGold] = useState(0);
  // const [playerCards, setPlayerCards] = useState([]);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  // const gold = useSelector(state => state.session.user.gold);
  const gold = currentUser.gold;
  const playerCards = useSelector(state => state.session.user.ownedCards);
  const [pulling, setPulling] = useState(false);
  const pullCard = async () => {
    if (gold >= 10) {
      try {
        setPulling(true);
        const response = await jwtFetch('/api/cards', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({user: currentUser}),
        });
        
        if (response.ok) {
          // const updatedCard = await response.json();
          
        } else {
          console.error('Failed to assign card:', response.status);
        }
      } catch (error) {
        console.error('Error assigning card:', error);
      } finally {
        setPulling(false); // Set pulling back to false after the request is complete
      }
    } else {
      alert("You don't have enough gold to pull a card.");
    }
  };
  
useEffect(() => {
  dispatch(getCurrentUser());
}, [pulling,dispatch]);

  
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
