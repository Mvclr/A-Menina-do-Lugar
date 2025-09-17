import React, { useState } from 'react';

const MuquemBoardGame = () => {
  const [playerPosition, setPlayerPosition] = useState(0);
  const [diceRoll, setDiceRoll] = useState(null);

  // Placeholder for the board spaces coordinates
  const boardSpaces = [
    { x: 100, y: 100 }, // Space 1
    // ... add coordinates for Muquem board
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
      <h2 className="text-3xl font-bold text-center mb-4">Jogo de Tabuleiro de Muquém</h2>
      <div 
        className="relative bg-no-repeat bg-center bg-contain mx-auto"
        style={{ 
          backgroundImage: `url('/images/jogos/muquem/MuquemJogoTabuleiro.png')`,
          width: '1100px', 
          height: '825px' 
        }}
      >
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

export default MuquemBoardGame;
