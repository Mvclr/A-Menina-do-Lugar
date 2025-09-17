import React, { useState } from 'react';

const CafurnaBoardGame = () => {
  const [playerPosition, setPlayerPosition] = useState(0);
  const [diceRoll, setDiceRoll] = useState(null);

  // Placeholder for the board spaces coordinates
  // These would be the pixel coordinates (x, y) for the center of each space on the board image.
  const boardSpaces = [
    { x: 100, y: 100 }, // Space 1
    { x: 200, y: 100 }, // Space 2
    { x: 300, y: 100 }, // Space 3
    // ... and so on for all spaces
  ];

  const handleRollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);
    setPlayerPosition((prev) => {
      const newPosition = prev + roll;
      return newPosition >= boardSpaces.length ? boardSpaces.length - 1 : newPosition;
    });
  };

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-4">Jogo de Tabuleiro de Cafurna</h2>
      <div 
        className="relative bg-no-repeat bg-center bg-contain mx-auto"
        style={{ 
          backgroundImage: `url('/images/jogos/cafurna/CafurnaJogoTabuleiro.png')`,
          width: '1100px', // Adjust to your board's aspect ratio
          height: '825px' // Adjust to your board's aspect ratio
        }}
      >
        {/* Player Piece */}
        {boardSpaces.length > 0 && (
          <div 
            className="absolute w-8 h-8 bg-aml-primary rounded-full shadow-lg border-2 border-white"
            style={{ 
              left: `${boardSpaces[playerPosition].x}px`,
              top: `${boardSpaces[playerPosition].y}px`,
              transform: 'translate(-50%, -50%)'
            }}
          />
        )}
      </div>
      <div className="text-center mt-6">
        <button 
          onClick={handleRollDice}
          className="bg-aml-action text-white font-bold py-3 px-8 rounded-full text-xl hover:bg-red-700 transition-colors"
        >
          Rolar o Dado
        </button>
        {diceRoll && (
          <p className="text-2xl font-bold mt-4">Você tirou: <span className="text-aml-action">{diceRoll}</span></p>
        )}
      </div>
    </div>
  );
};

export default CafurnaBoardGame;
