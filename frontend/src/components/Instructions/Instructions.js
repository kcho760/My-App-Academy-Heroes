import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import "./Instructions.css";
import "../NavBar/NavBar.css";

function Instructions() {
  const [instructionTab, setInstructionTab] = useState("generalTab");

  const handleTabClick = (tab) => {
    setInstructionTab(tab);
  };

  return (
    <div className="instructions-container">
      <div className="modal-tabs">
        <button
          className={`tab ${
            instructionTab === "generalTab" && "instructionTab"
          }`}
          onClick={() => handleTabClick("generalTab")}
        >
          General
        </button>

        <button
          className={`tab ${instructionTab === "gameTab" && "instructionTab"}`}
          onClick={() => handleTabClick("gameTab")}
        >
          Game
        </button>

        <button
          className={`tab ${
            instructionTab === "profileTab" && "instructionTab"
          }`}
          onClick={() => handleTabClick("profileTab")}
        >
          Profile
        </button>

        {/* <button
          className={`tab ${instructionTab === "other" && "instructionTab"}`}
          onClick={() => handleTabClick("other")}
        >
          Warnings
        </button> */}
      </div>
      <div className="tab-contents">
        {instructionTab === "generalTab" && (
          <div className="tab">
            <ul className="tabDescription">
              {/* <h1 className="li-space">
                ** WELCOME TO THE INSTRUCTIONS TAB **
              </h1> */}
              {/* <li className="li-space">
                You can access the "Instructions" and "Teams" tab whenever
                without interrupting gameplay
              </li> */}
              {/* <li className="li-space">
                **"Profile" and "Game" tabs only visible when logged in**
              </li> */}
              {/* <li className="li-space">
                "Team" tab shows the developers behind the game.
              </li> */}
              <li className="li-space">
                Make an account by clicking "SIGNUP"and providing a valid email/username/password.
                <br/> 
                <br/>
                **Optional**<br/>Use the
                camera to make an AI profile icon.
              </li>
              {/* <li className="li-space">
                To the left of "SIGNUP" is the "LOGIN" button which you can use
                your email/password made to log in to your account in the
                future.
              </li> */}
              <li className="li-space">
                
                There is a "Demo Log In" on the "LOGIN" form which lets you
                test out the game without making an account.
              </li>
              
            </ul>
          </div>
        )}
        {instructionTab === "gameTab" && (
          <div className="tab">
            <ol className="tabDescription">
              {/* <li className="li-space">
                The "Game" tab is where the actual gameplay takes place.
              </li> */}

              <li className="li-space">
                {/* On the top left; you'd see your player icon as well as your stats such as your health
                (HP), your Attack power, and amount of Gold (currency in this
                game). */}
                The top left contains your:<br/> 
                -Player icon<br/>
                -Health (HP)<br/>
                -Attack power<br/>
                -Gold.
              </li>

              <li className="li-space">
                {/* On the bottom left; you'd see the questions you need to answer
                along with the possible answer choices underneath. */}
                -The bottom left contains the questions and answer choices.
              </li>

              <li className="li-space">
                -Answer a question by clicking on one of the
                answers.
              </li>

              {/* <li className="li-space">
                If you answer correctly; a "green" indicator below the question
                will pop up and you'd see an animation effect on the right side
                where your red robot will perform an attack causing the enemy on
                the top right to take damage. The amount of damage the enemy
                takes depends on your "Attack" power on the top left.
              </li>

              <li className="li-space">
                If you answer incorrectly, you'd see a "red" indicator below the
                question and your character will take damage; your HP will
                decrease depending on the enemy.
              </li> */}

              {/* <li className="li-space">
                On the middle left; you'd see a counter for the amount of
                questions answered as well as the amount you answered correctly
                and incorrectly.
              </li> */}

              <li className="li-space">
                {/* When the enemy health hits "0"; your "Round" increases and a new
                wave of enemies will spawn. */}
                -When the enemy health hits "0"; you move on to the next round.<br/>
                -Enemies get stronger every 2 rounds
              </li>

              <li className="li-space">
                -For every correct answer; you receive some
                gold. Defeating an enemy grants additional gold.
              </li>

              <li className="li-space">
                -The gold you earn can be used on your "Profile" tab to obtain
                "cards".
              </li>

              <li className="li-space">
                -Cards that are selected will appear on the bottom right with their names and effects.<br/>
                -These cards can only be used once and will refresh after killing the boss.<br/>
                -If your health reaches 0; you lose your selected cards.
              </li>

              <li className="li-space">
              </li>
            </ol>
          </div>
        )}

        {instructionTab === "profileTab" && (
          <div className="tab">
            <ol className="tabDescription">
              {/* <li className="li-space">
                On the "Profile" tab; you'd see 2 different screens on your left and right.
              </li> */}
              <li className="li-space">
                {/* To the right is your "Collection" which are all the available cards that can be obtained. */}
                -Cards give you power-ups and can be obtained by using gold.<br/>
                -All cards are visible on the right. Owned cards are glowing.
              </li>
              {/* <li className="li-space">
                Cards that have been obtained will have a glowing effect surrounding the card.
              </li> */}
              <li className="li-space">
                There are 3 rarities:<br/>
                -Normal (Green)<br/>
                -Rare (Purple)<br/>
                -Super-Rare(Orange)
              </li>
              <li className="li-space">
                {/* Underneath each card you own; you have an option to "Select" if your cards in your deck is less than 4. 
                Otherwise it would say "Deselect". You can also sell cards you own but don't want for 5 gold. */}
                -You can select up to 4 owned cards to be in your deck.<br/>
                {/* -You can deselect cards from your deck on the left.<br/> */}
                -You can sell cards you own but don't want for 5 gold.
              </li>
              {/* <li className="li-space">
                On the left; you'd see your profile information on the top left as well as the amount of gold you currently
                have and amount of cards you've obtained.
              </li> */}
              {/* <li className="li-space">
                On the bottom left is your deck. You can only have 4 cards at once in your deck. You can "Deselect" cards you
                don't want in your deck in order to make room for something else.
              </li> */}
              <li className="li-space">
                {/* In the middle of the left screen; you'd see the option to "Pull a Card". Pulling a card will cost 10 gold and 
                would give you a random card from the collection whether you already own it or not. */}
                -You can pull a card for 10 gold. This will give you a random card from the pool.
              </li>
              <li className="li-space">
                  -Heal: Regenerates HP <br/>
                  -Atk Up: Increases your attack power for one round<br/>
                  -Atk Multiplier: Multiplies your attack power for one round<br/>
                  -Instant Kill: Win the round instantly<br/>
              </li>
            </ol>
          </div>
        )}

        {/* {instructionTab === "other" && (
          <div className="tab">
            <ul className="tabDescription">
              <li className="li-space">
                If your health bar reaches 0; you will lose all cards in your deck.
              </li>

              <li className="li-space">
                You can add new cards into your deck afterwards.
              </li>

              <li className="li-space">
                they'll just give you 4 strikes (your cards in hand for the
                battle will be deleted).
              </li>

              <li className="li-space">
                If for some reason you hit 0 health 10 times; you're pushing
                their patience and
              </li>

              <li className="li-space"> your account may be deleted. </li>
            </ul>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default Instructions;
