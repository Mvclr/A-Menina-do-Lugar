import React, { useState } from 'react';

const VicosaBoardGame = () => {
  const [playerPosition, setPlayerPosition] = useState(0);
  const [diceRoll, setDiceRoll] = useState(null);

  const boardSpaces = [
    { x: 52, y: 490 },
    { x: 155, y: 510 },
    { x: 188, y: 433 },
    { x: 111, y: 404 },
    { x: 110, y: 321 },
    { x: 195, y: 299 },
    { x: 276, y: 323 },
    { x: 351, y: 324 },
    { x: 348, y: 395 },
    { x: 305, y: 474 },
    { x: 397, y: 498 },
    { x: 477, y: 496 },
    { x: 542, y: 474 },
    { x: 492, y: 391 },
    { x: 428, y: 345 },
    { x: 472, y: 301 },
    { x: 561, y: 318 },
    { x: 635, y: 299 },
    { x: 695, y: 358 },
    { x: 653, y: 421 },
    { x: 621, y: 510 },
    { x: 726, y: 540 },
    { x: 782, y: 478 },
    { x: 767, y: 384 },
    { x: 865, y: 336 },
    { x: 942, y: 283 },
    { x: 1020, y: 324 },
    { x: 958, y: 386 },
    { x: 878, y: 423 },
    { x: 857, y: 499 },
    { x: 921, y: 539 },
    { x: 1045, y: 466 },
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
      <h2 className="text-3xl font-bold text-center mb-4">Jogo de Tabuleiro de Viçosa</h2>
      <svg viewBox="0 0 1100 825" className="w-full h-auto">
        <image href="/images/jogos/vicosa/VicosaJogoTabuleiro.png" width="1100" height="825" />
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

export default VicosaBoardGame;