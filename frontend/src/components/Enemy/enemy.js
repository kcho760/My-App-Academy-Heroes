import React from 'react';
import './enemy.css';

const Enemy = ({ enemy }) => {
    console.log(enemy.imageUrl)
  return (
    <div className='enemy-container'>
      <h2 className='enemy-name'>{enemy.name}</h2>
      <div className='enemy-images'>
        <img className='enemy-image' src={enemy.imageUrl} alt="Enemy" />
        <img className='enemy-image' id='enemy-image-2' src={enemy.imageUrl} alt="Enemy" />
        <img className='enemy-image' src={enemy.imageUrl} alt="Enemy" />
      </div>
      <p className='enemy-health'>Health: {enemy.health}</p>
    </div>
  );
};

export default Enemy;
