import React, { useState } from 'react';

const MuquemBoardGame = () => {
  const [playerPosition, setPlayerPosition] = useState(0);
  const [diceRoll, setDiceRoll] = useState(null);

  const boardSpaces = [
    { x: 61, y: 273 },
    { x: 205, y: 299 },
    { x: 330, y: 311 },
    { x: 432, y: 279 },
    { x: 546, y: 291 },
    { x: 655, y: 334 },
    { x: 747, y: 278 },
    { x: 872, y: 299 },
    { x: 1038, y: 258 },
    { x: 1073, y: 340 },
    { x: 1008, y: 424 },
    { x: 916, y: 373 },
    { x: 803, y: 341 },
    { x: 715, y: 378 },
    { x: 553, y: 361 },
    { x: 445, y: 349 },
    { x: 358, y: 414 },
    { x: 207, y: 386 },
    { x: 116, y: 348 },
    { x: 32, y: 409 },
    { x: 38, y: 508 },
    { x: 95, y: 576 },
    { x: 213, y: 464 },
    { x: 245, y: 574 },
    { x: 342, y: 515 },
    { x: 438, y: 448 },
    { x: 515, y: 461 },
    { x: 510, y: 568 },
    { x: 596, y: 524 },
    { x: 717, y: 465 },
    { x: 696, y: 574 },
    { x: 790, y: 546 },
    { x: 813, y: 464 },
    { x: 988, y: 464 },
    { x: 1073, y: 498 },
    { x: 951, y: 579 },
  ];

  const handleRollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);
    setPlayerPosition((prev) => {
      const newPosition = prev + roll;
      return newPosition >= boardSpaces.length ? boardSpaces.length - 1 : newPosition;
    });
  };

  const playerCoords = boardSpaces.length > 0 ? boardSpaces[playerPosition] : null;

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-4">Jogo de Tabuleiro de Muquém</h2>
      <svg viewBox="0 0 1100 825" className="w-full h-auto">
        <image href="/images/jogos/muquem/MuquemJogoTabuleiro.png" width="1100" height="825" />
        {playerCoords && (
          <circle cx={playerCoords.x} cy={playerCoords.y} r="20" fill="#FF4500" stroke="white" strokeWidth="3" style={{ transition: 'cx 0.5s ease, cy 0.5s ease' }} />
        )}
      </svg>
      <div className="text-center mt-6">
        <button onClick={handleRollDice} className="bg-aml-action text-white font-bold py-3 px-8 rounded-full text-xl hover:bg-red-700 transition-colors">
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