import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../../store/session";
import jwtFetch from "../../store/jwt";
import Card from "../Card/Card";
import "./Profile.css";
import RareGacha from "../../assets/videoes/gacha-rare.mp4";
import Modal from "react-modal";

Modal.setAppElement("#root"); // replace '#root' with the id of your app's root element

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const gold = currentUser.gold;
  const playerCards = useSelector((state) => state.session.user.ownedCards);
  const [pulling, setPulling] = useState(false);
  const [allCards, setAllCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pullCard = async () => {
    if (gold >= 10) {
      setIsModalOpen(true);
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
          setTimeout(() => {
            setIsModalOpen(false);
          }, 8000);
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
        <div className="profile-pic"> <img className = 'defaultPic' src = {currentUser.imageUrl}/> </div>
        <div className="profile-details">
          <p>username: {currentUser.username} </p>
          <p>email: {currentUser.email} </p>
          <p>gold: {gold} </p>
          <p>cards: {playerCards.length}</p>
          <button onClick={pullCard} className="gachButton">Pull a Card (Cost: 10 Gold)</button>
        </div>
        <div className="gach">Your deck</div>
      </div>

      <div className="card-collection">
        Collection
        {allCards.length === 0 ? (
          <p>No cards in collection.</p>
        ) : (
          <ul>
            {allCards.map((card, index) => {
              const isOwned = playerCards.some(
                (ownedCard) => ownedCard.name === card.name
              );
              const amountOwned = isOwned
                ? playerCards.filter(
                    (ownedCard) => ownedCard.name === card.name
                  ).length
                : 0;
              return (
                <li key={index}>
                  <Card card={card} />
                  <p>Amount owned: {amountOwned}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={
          {
            /* Custom modal styles here */
          }
        }
      >
        <video controls autoPlay style={{ width: "100%", height: "auto" }}>
          <source src={RareGacha} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Modal>
    </div>
  );
};

export default Profile;
