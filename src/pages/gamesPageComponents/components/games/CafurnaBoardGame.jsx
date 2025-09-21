import React, { useState } from 'react';

const CafurnaBoardGame = () => {
  const [playerPosition, setPlayerPosition] = useState(0);
  const [diceRoll, setDiceRoll] = useState(null);

  const boardSpaces = [
    { x: 31, y: 78 },
    { x: 116, y: 164 },
    { x: 236, y: 98 },
    { x: 435, y: 123 },
    { x: 645, y: 86 },
    { x: 898, y: 99 },
    { x: 1061, y: 228 },
    { x: 1040, y: 360 },
    { x: 742, y: 270 },
    { x: 451, y: 271 },
    { x: 232, y: 276 },
    { x: 53, y: 271 },
    { x: 148, y: 470 },
    { x: 370, y: 443 },
    { x: 467, y: 368 },
    { x: 636, y: 449 },
    { x: 798, y: 378 },
    { x: 978, y: 526 },
    { x: 1047, y: 736 },
    { x: 916, y: 709 },
    { x: 713, y: 593 },
    { x: 476, y: 503 },
    { x: 326, y: 573 },
    { x: 141, y: 591 },
    { x: 136, y: 724 },
    { x: 357, y: 701 },
    { x: 471, y: 616 },
    { x: 528, y: 751 },
    { x: 741, y: 740 },
  ];

  const handleRollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);
    setPlayerPosition((prev) => {
      const newPosition = prev + roll;
      // Garante que o jogador não passe da última casa
      return newPosition >= boardSpaces.length ? boardSpaces.length - 1 : newPosition;
    });
  };

  const playerCoords = boardSpaces.length > 0 ? boardSpaces[playerPosition] : null;

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-4">Jogo de Tabuleiro de Cafurna</h2>
      
      <svg 
        viewBox="0 0 1100 825"
        className="w-full h-auto"
      >
        <image 
          href="/images/jogos/cafurna/CafurnaJogoTabuleiro.png" 
          width="1100" 
          height="825" 
        />

        {playerCoords && (
          <circle
            cx={playerCoords.x}
            cy={playerCoords.y}
            r="20"
            fill="#FF4500"
            stroke="white"
            strokeWidth="3"
            style={{ transition: 'cx 0.5s ease, cy 0.5s ease' }}
          />
        )}
      </svg>

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
