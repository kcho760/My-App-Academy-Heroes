import React from 'react';
import './enemy.css';

const Enemy = ({ enemy }) => {
    // console.log(enemy.imageUrl)
  return (
    <div className='enemy-container'>
      <div className='enemy-images'>
        <img className='enemy-image' id='enemy-image-1' src={enemy.imageUrl} alt="Enemy" />
        <img className='enemy-image' id='enemy-image-2' src={enemy.imageUrl} alt="Enemy" />
        <img className='enemy-image' id='enemy-image-3' src={enemy.imageUrl} alt="Enemy" />
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
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Enemy;