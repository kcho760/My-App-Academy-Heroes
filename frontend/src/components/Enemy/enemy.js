import React, { useEffect, useState } from 'react';
import './enemy.css';
import explosion from "./assets/explosion.gif"

const Enemy = ({ enemy, showExplosion }) => {
  const [isDefeated, setIsDefeated] = useState(false);
  const [shouldAnimateOut, setShouldAnimateOut] = useState(false);
  const [hideImages, sethideImages] = useState(false);

  useEffect(() => {
    if (enemy.health <= 0) {
      setIsDefeated(true);
      setTimeout(() => {
        setIsDefeated(false);
        setShouldAnimateOut(true);
        setTimeout(() => {
          setShouldAnimateOut(false);
        }, 1000); // Adjust the duration as needed
      }, 1000); // Adjust the duration as needed
    }
  }, [enemy.health]);

  useEffect(() => {
    sethideImages(enemy.name === 'Kin the Conqueror');
    console.log(hideImages)
  }, [enemy.name]);

  return (
    <div className={`enemy-container ${isDefeated ? 'defeated' : ''} ${shouldAnimateOut ? 'animate-out' : ''}`}>
      <div className='enemy-images'>
          <>
            <div className='enemy'>
              {!hideImages && <img className='enemy-image' id='enemy-image-1' src={enemy.imageUrl} alt="Enemy" />}
              {showExplosion && <img className='explosion' id='explosion' src={explosion} alt="Enemy" />}
            </div>
            <div className='enemy'>
              {!hideImages && <img className='enemy-image' id='enemy-image-1' src={enemy.imageUrl} alt="Enemy" />}
              {showExplosion && <img className='explosion' id='explosion' src={explosion} alt="Enemy" />}
            </div>
            <div className='enemy'>
              {!hideImages && <img className='enemy-image' id='enemy-image-1' src={enemy.imageUrl} alt="Enemy" />}
              {showExplosion && <img className='explosion' id='explosion' src={explosion} alt="Enemy" />}
            </div>
            <div className='enemy'>
              {hideImages && <img className='enemy-image' id='boss' src={enemy.imageUrl} alt="Enemy" />}
              {showExplosion && <img className='explosion' id='explosion' src={explosion} alt="Enemy" />}
            </div>
          </>
      </div>
      <div className="enemy-health-bar-container-enemy-info">
        <h2 className='enemy-name'>{enemy.name}</h2>
        <span>HP: {enemy.health}</span>
        <div className="health-bar-wrapper">
          <div className="health-bar outter">
            <div
              className="health-bar inner"
              style={{
                width: `calc(${
                  enemy.health / enemy.defaultHealth > 1 ? 1 : enemy.health / enemy.defaultHealth
                } * 100%)`,
                backgroundImage: enemy.health <= 50 ? "linear-gradient(to right, #ff6e6e 0%, #ff4444 10%, #ff0000 40%, #ff0000 60%, #ff4444 90%, #ff6e6e 100%)" : ""
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );  
};

export default Enemy;
