import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../../store/session";
import jwtFetch from "../../store/jwt";
import Card from "../Card/Card";
import "./Profile.css";
import SuperRareGacha from "../../assets/videoes/gacha-SR.mp4";
import RareGacha from "../../assets/videoes/gacha-R.mp4";
import NormalGacha from "../../assets/videoes/gacha-N.mp4";
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
  const [toggleButton, setToggleButton] = useState(false);
  const [sellLoad, setSellLoad] = useState(false);
  const [loading, setLoading] = useState(true);

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
          setLoading(true);
          setTimeout(() => {
            setIsModalOpen(false);
            setLoading(false);
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
  const handleToggleCardSelection = async (cardId, isSelected) => {
    try {
      const response = await jwtFetch(`/api/cards/${cardId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selected: !isSelected }), // toggle selected state
      });

      if (response.ok) {
        setToggleButton((prev) => !prev);
        fetchallCards();
      } else {
        console.error("Failed to toggle card selection:", response.status);
      }
    } catch (error) {
      console.error("Error toggling card selection:", error);
    }
  };

  const sellCard = async (cardId, owner) => {
    setSellLoad(() => true);
    try {
      const response = await jwtFetch(`/api/cards/${cardId}`, {
        method: "DELETE",
        body: JSON.stringify({ userId: owner, gold: 5 }),
      });
      if (response.ok) {
        dispatch(getCurrentUser());
      }
    } catch (error) {
      console.error("Error selling card:", error);
    } finally {
      setSellLoad(() => false);
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
    const fetchCurrentUser = async () => {
      setLoading(true);
      await dispatch(getCurrentUser());
      setLoading(false);
    };
    fetchCurrentUser();
  }, [pulling, toggleButton, dispatch]);

  useEffect(() => {
    fetchallCards();
  }, []);

  const lastCardRarity =
    playerCards.length > 0 ? playerCards[playerCards.length - 1].rarity : null;
  return (
    <div className="profile-container">
      <div className="profile-div">
        <span className="profile-text">Profile</span>
        <div className="profile-pic">
          {" "}
          <img className="defaultPic" src={currentUser.imageUrl} />{" "}
        </div>
        <div className="profile-details">
          <p>username: {currentUser.username} </p>
          <p>email: {currentUser.email} </p>
          <p>gold: {gold} </p>
          <p>cards: {playerCards.length}</p>
          <div className="gachButton-wrapper">
            <button onClick={pullCard} className="gachButton">
              Pull a Card (Cost: 10 Gold)
            </button>
          </div>
        </div>
        <div className="gach">
          <span className="profile-text">Your deck</span>
          <div className="profile-deck">
            {playerCards
              .filter((card) => card.selected)
              .map((card, index) => (
                <div key={index}>
                  <Card card={card} />
                  <div className="deck-deselect-button">
                    <button
                      onClick={() =>
                        handleToggleCardSelection(card._id, card.selected)
                      }
                      className="deselectButton"
                    >
                      Deselect
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="card-collection">
        <div className="collection-title">Collection</div>
        {allCards.length === 0 ? (
          <p>No cards in collection.</p>
        ) : (
          <ul>
            {allCards.map((card, index) => {
              const matchingPlayerCards = playerCards.filter(
                (ownedCard) => ownedCard.name === card.name
              );
              let firstCard;
              if (matchingPlayerCards.length > 0) {
                firstCard = matchingPlayerCards[0];
              }
              const isOwned = playerCards.some(
                (ownedCard) => ownedCard.name === card.name
              );
              const amountOwned = isOwned
                ? playerCards.filter(
                    (ownedCard) => ownedCard.name === card.name
                  ).length
                : 0;
              return (
                <li key={index} className="cardContainer">
                  <Card card={card} />
                  <p>Amount owned: {amountOwned}</p>
                  {isOwned &&
                    playerCards.filter((card) => card.selected === true)
                      .length < 4 && (
                      <>
                        <button
                          className="selectButton"
                          disabled={sellLoad}
                          onClick={() =>
                            handleToggleCardSelection(
                              firstCard._id,
                              firstCard.selected
                            )
                          }
                        >
                          {firstCard.selected ? "Deselect" : "Select"}
                        </button>
                        <button
                          className="sellButton"
                          disabled={sellLoad}
                          onClick={() =>
                            sellCard(firstCard._id, firstCard.owner)
                          }
                        >
                          Sell: 5 Gold
                        </button>
                      </>
                    )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {!loading && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          style={{
            content: {
              position: "absolute",
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              transform: "translate(-50%, -50%)", // Centres the modal box
              display: "flex", // These three styles will help center the video.
              justifyContent: "center",
              alignItems: "center",
            },
          }}
        >
          <video autoPlay style={{ width: "100%", height: "auto" }}>
            {/* {const lastCardRarity = playerCards[playerCards.length - 1]} */}
            {lastCardRarity === "SR" && (
              <source src={SuperRareGacha} type="video/mp4" />
            )}
            {lastCardRarity === "R" && (
              <source src={RareGacha} type="video/mp4" />
            )}
            {lastCardRarity === "N" && (
              <source src={NormalGacha} type="video/mp4" />
            )}
            Your browser does not support the video tag.
          </video>
        </Modal>
      )}
    </div>
  );
};

export default Profile;
