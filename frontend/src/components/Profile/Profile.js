import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../../store/session";
import jwtFetch from "../../store/jwt";
import Card from "../Card/Card";
import "./Profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const gold = currentUser.gold;
  const playerCards = useSelector((state) => state.session.user.ownedCards);
  const [pulling, setPulling] = useState(false);
  const [allCards, setAllCards] = useState([]);

  const pullCard = async () => {
    if (gold >= 10) {
      try {
        setPulling(true);
        const response = await jwtFetch("/api/cards", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: currentUser }),
        });

        if (response.ok) {
          // const updatedCard = await response.json();
        } else {
          console.error("Failed to assign card:", response.status);
        }
      } catch (error) {
        console.error("Error assigning card:", error);
      } finally {
        setPulling(false); // Set pulling back to false after the request is complete
      }
    } else {
      alert("You don't have enough gold to pull a card.");
    }
  };

  const fetchallCards = async () => {
    try {
      const response = await jwtFetch("/api/cards", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const cards = await response.json();
        setAllCards(cards);
      } else {
        console.error("Failed to get cards:", response.status);
      }
    } catch (error) {
      console.error("Error getting card:", error);
    }
  };

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [pulling, dispatch]);
  useEffect(() => {
    fetchallCards();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-div">
        Profile
        <div className="profile-pic">Your face header</div>
        <div className="profile-details">
          <p>username: {currentUser.username} </p>
          <p>email: {currentUser.email} </p>
          <p>gold: {gold} </p>
          <p>cards: {playerCards.length}</p>
          <button onClick={pullCard}>Pull a Card (Cost: 10 Gold)</button>
        </div>
        <div className="gach">
          Your deck
          {playerCards.length === 0 ? (
            <p>No cards yet. Start pulling!</p>
          ) : (
            <ul>
              {playerCards.map((card, index) => (
                <li key={index}>
                  <Card card={card} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="card-collection">
        Collection
        {allCards.length === 0 ? (
          <p>No cards in collection.</p>
        ) : (
          <ul>
            {allCards.map((card, index) => (
              <li key={index}>
                <Card card={card} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
