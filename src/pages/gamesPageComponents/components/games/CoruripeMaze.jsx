import React, { useState, useEffect, useCallback } from "react";
import { RotateCcw } from "lucide-react";

// 0 = path, 1 = wall, 2 = start, 3 = end
const mazeLayout = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 3, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const CoruripeMaze = () => {
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
  const [gameWon, setGameWon] = useState(false);
  const [moves, setMoves] = useState(0);

  const resetGame = () => {
    setPlayerPos({ x: 1, y: 1 });
    setGameWon(false);
    setMoves(0);
  };

  const movePlayer = useCallback((dx, dy) => {
    if (gameWon) return;

    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    if (
      newX >= 0 && newX < mazeLayout[0].length &&
      newY >= 0 && newY < mazeLayout.length &&
      mazeLayout[newY][newX] !== 1
    ) {
      setPlayerPos({ x: newX, y: newY });
      setMoves(prev => prev + 1);

      if (mazeLayout[newY][newX] === 3) {
        setGameWon(true);
      }
    }
  }, [playerPos, gameWon]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();
      switch (e.key) {
        case "ArrowUp": movePlayer(0, -1); break;
        case "ArrowDown": movePlayer(0, 1); break;
        case "ArrowLeft": movePlayer(-1, 0); break;
        case "ArrowRight": movePlayer(1, 0); break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [movePlayer]);

  return (
    <div className="text-center p-4 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Labirinto de Coruripe</h2>
      <p className="mb-4">Ajude Dona Traíra a chegar na igreja!</p>

      <div className="flex justify-center gap-8 mb-4">
        <div className="bg-blue-100 px-6 py-3 rounded-lg">
          <div className="text-sm text-gray-600">Movimentos</div>
          <div className="text-2xl font-bold text-blue-600">{moves}</div>
        </div>
      </div>

      {gameWon && (
        <div className="text-2xl font-bold text-green-600 mb-4">
          🎉 Parabéns! Você conseguiu!
        </div>
      )}

      <div 
        className="relative mx-auto"
        style={{ 
          width: "100%", 
          maxWidth: "800px", // Adjust as needed
          aspectRatio: "1.33" // Adjust to match image aspect ratio
        }}
      >
        <img 
          src="/images/jogos/coruripe/CoruripeLabirinto.png" 
          alt="Labirinto de Coruripe"
          className="w-full h-full"
        />

        <div
          className="absolute"
          style={{
            left: `${(playerPos.x / mazeLayout[0].length) * 100}%`,
            top: `${(playerPos.y / mazeLayout.length) * 100}%`,
            width: `${100 / mazeLayout[0].length}%`,
            height: `${100 / mazeLayout.length}%`,
            transition: "left 0.2s, top 0.2s",
          }}
        >
          <img 
            src="/images/meninas/Menina-Coruripe.png"
            alt="Dona Traíra"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="mt-6">
        <button onClick={resetGame} className="bg-aml-action text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center mx-auto">
          <RotateCcw className="w-4 h-4 mr-2" />
          Recomeçar
        </button>
      </div>
    </div>
  );
};

export default CoruripeMaze;