import React from 'react';

function GameOver({ title, onRestart }) {
  return (
    <div className="container">
      <h3>{title}</h3>
      <button onClick={onRestart}>Start New Game</button>
    </div>
  );
}

export default GameOver;