import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Instructions.css';
import '../NavBar/NavBar.css'

function Instructions() {

  const [instructionTab, setInstructionTab] = useState("generalTab");

  const handleTabClick = (tab) => {
    setInstructionTab(tab)
  };

  return (
    <div className="instructions-container">
      <div className="modal-tabs">
        
        <button className={`tab ${instructionTab === "generalTab" && "instructionTab"}`}
          onClick={() => handleTabClick("generalTab")}>
            General
        </button>

        <button className={`tab ${instructionTab === "gameTab" && "instructionTab"}`}
          onClick={() => handleTabClick("gameTab")}>
            Game
        </button>

        <button className={`tab ${instructionTab === "other" && "instructionTab"}`}
          onClick={() => handleTabClick("other")}>
            Warnings
        </button>

        </div>
      <div className="tab-contents">
        {instructionTab === "generalTab" && (
          <div className="tab">
            <h1 className= "generalHeader">**"Profile" and "Game" tabs only visible when logged in**</h1>
              <ul className="tabDescription">
                <li className="li-space">Collect cohortmates for different effects that will help you progress in the game.</li>
                <li className="li-space">Not all cohortmates are created equal though. Higher rarity have stronger effects </li> 
                <li className="li-space">but are less likely to be obtained. To obtain them; pray to the RNG gods when using </li>
                <li className="li-space"> "Pull a Card" on your "profile" tab which would give a new card for 10 gold.</li>
              </ul>
          </div>
        )}
        {instructionTab === "gameTab" && (
          <div className="tab">
              <ul className="tabDescription">
              <li className="li-space">On the "game" tab; you'd see waves of enemies on the right side of the screen. </li>
              
              <li className="li-space">You deal damage by answering questions on the bottom left of the screen. </li>
              
              <li className="li-space">For each correct question; you obtain a bit of gold. If you defeat a wave; you </li>
              
              <li className="li-space">receive more gold. After completing a weeks-worth of enemies; you will encounter </li>
      
              <li className="li-space">a TA who will test your knowledge. They're just like the practice waves before but </li>
      
              <li className="li-space">with some curveballs/caveats that you won't know until the day of but if you ran </li> 
             
              <li className="li-space">through the earlier waves at least 10x in half the recommended time; you're good </li> 

              <li className="li-space">unless your database breaks. If you make it past the TA; you obtain even more </li> 
              
              <li className="li-space"> gold to spend on your gambling addiction in the shop. </li>
              </ul>
          </div>
        )}
        {instructionTab === "other" && (
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