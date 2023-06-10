import React from 'react';
import './Game.css'

const GameOverPopup = ({ winner, playAgain }) => {
  return (
    <div className="game-over-popup">
      <div className="blur-background"></div>
      <div className="game-over-box">
        <h2>Player {winner} wins!</h2>
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  );
};

export default GameOverPopup;
