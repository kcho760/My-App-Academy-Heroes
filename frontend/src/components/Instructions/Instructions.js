import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Instructions.css';
import '../NavBar/NavBar.css'

function Instructions() {

  const [activeTab, setActiveTab] = useState("generalTab");

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  };

  return (
    <div className="modal-container">
      <div className="modal-tabs">
        
        <button className={`tab ${activeTab === "generalTab" && "active"}`}
          onClick={() => handleTabClick("generalTab")}>
            General
        </button>

        <button className={`tab ${activeTab === "gameTab" && "active"}`}
          onClick={() => handleTabClick("gameTab")}>
            Game
        </button>

        <button className={`tab ${activeTab === "other" && "active"}`}
          onClick={() => handleTabClick("other")}>
            Warnings
        </button>

        </div>
      <div className="tab-contents">
        {activeTab === "generalTab" && (
          <div className="tab">
            <h1 className= "generalHeader">**"Profile" and "Game" tabs only visible when logged in**</h1>
              <ul className="tabDescription">
                <li className="li-space">Collect cohortmates for different effects that will help you progress in the game.</li>
                Not all cohortmates are created equal though. Higher rarity have stronger effects but are less likely to be otained. To obtain them; pray to the RNG 
                gods when using "Pull a Card" on your "profile" tab which would give a new card for 100 gold.
              </ul>
          </div>
        )}
        {activeTab === "gameTab" && (
          <div className="tab">
              <ul className="tabDescription">On the "game" tab; you'd see waves of enemies on the right side of the screen. 
              
              <li className="li-space">You deal damage by answering questions on the bottom left of the screen. </li>
              
              <li className="li-space">For each correct question; you obtain a bit of gold. If you defeat a wave; you receive more gold. </li>
              
              <li className="li-space">After completing a weeks-worth of enemies; you will encounter a TA who will test your knowledge. They're just like the practice waves before but with 
              some curveballs/caveats that you won't know until the day of but if you ran through the earlier waves at least 10x in half the recommended time; you're good unless your database breaks. </li>
                
              <li className="li-space">If you make it past the TA; you obtain even more gold to spend on your gambling addiction in the shop. </li>
              </ul>
          </div>
        )}
        {activeTab === "other" && (
          <div className="tab">
              <ul className="tabDescription">
              <li className="li-space">If for any reason your health bar reaches 0; your TA will be disappointed. </li>
                
              <li className="li-space">They're understanding enough and instead of deleting you from the cohort; </li>
                
              <li className="li-space">they'll just give you 4 strikes (your cards in hand for the battle will be deleted). </li>
                
              <li className="li-space">If for some reason you hit 0 health 10 times; you're pushing their patience and </li>
                
              <li className="li-space"> your account may be deleted. </li>
              </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Instructions;