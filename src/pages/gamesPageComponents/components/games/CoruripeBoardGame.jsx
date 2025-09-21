import React, { useState } from 'react';

const CoruripeBoardGame = () => {
  const [playerPosition, setPlayerPosition] = useState(0);
  const [diceRoll, setDiceRoll] = useState(null);

  const boardSpaces = [
    { x: 38, y: 241 },
    { x: 128, y: 275 },
    { x: 208, y: 295 },
    { x: 430, y: 294 },
    { x: 508, y: 257 },
    { x: 580, y: 291 },
    { x: 741, y: 329 },
    { x: 816, y: 262 },
    { x: 908, y: 251 },
    { x: 970, y: 301 },
    { x: 1047, y: 396 },
    { x: 946, y: 369 },
    { x: 865, y: 329 },
    { x: 703, y: 421 },
    { x: 616, y: 396 },
    { x: 501, y: 347 },
    { x: 407, y: 381 },
    { x: 313, y: 376 },
    { x: 228, y: 384 },
    { x: 73, y: 371 },
    { x: 27, y: 454 },
    { x: 136, y: 521 },
    { x: 223, y: 491 },
    { x: 310, y: 462 },
    { x: 433, y: 487 },
    { x: 521, y: 462 },
    { x: 615, y: 495 },
    { x: 723, y: 527 },
    { x: 821, y: 495 },
    { x: 896, y: 432 },
    { x: 1022, y: 469 },
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
      <h2 className="text-3xl font-bold text-center mb-4">Jogo de Tabuleiro de Coruripe</h2>
      <svg viewBox="0 0 1100 825" className="w-full h-auto">
        <image href="/images/jogos/coruripe/CoruripeJogoTabuleiro.png" width="1100" height="825" />
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

export default CoruripeBoardGame;