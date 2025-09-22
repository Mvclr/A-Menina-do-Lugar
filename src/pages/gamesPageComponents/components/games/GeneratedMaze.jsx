import React, { useState, useEffect, useCallback } from "react";
import { RotateCcw } from "lucide-react";

const MAZE_SIZE = 25; // Increased size for more difficulty

const GeneratedMaze = () => {
  const [maze, setMaze] = useState([]);
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
  const [gameWon, setGameWon] = useState(false);
  const [moves, setMoves] = useState(0);

  const generateMaze = useCallback(() => {
    const newMaze = Array(MAZE_SIZE).fill(0).map(() => Array(MAZE_SIZE).fill(1));
    const stack = [];
    const startX = 1, startY = 1;

    newMaze[startY][startX] = 0;
    stack.push([startX, startY]);

    while (stack.length > 0) {
      const [cx, cy] = stack[stack.length - 1];
      const neighbors = [];

      // Check neighbors
      if (cy - 2 >= 0 && newMaze[cy - 2][cx] === 1) neighbors.push([0, -2]); // Up
      if (cy + 2 < MAZE_SIZE && newMaze[cy + 2][cx] === 1) neighbors.push([0, 2]); // Down
      if (cx - 2 >= 0 && newMaze[cy][cx - 2] === 1) neighbors.push([-2, 0]); // Left
      if (cx + 2 < MAZE_SIZE && newMaze[cy][cx + 2] === 1) neighbors.push([2, 0]); // Right

      if (neighbors.length > 0) {
        const [dx, dy] = neighbors[Math.floor(Math.random() * neighbors.length)];
        const nx = cx + dx;
        const ny = cy + dy;

        newMaze[ny][nx] = 0;
        newMaze[cy + dy / 2][cx + dx / 2] = 0;
        stack.push([nx, ny]);
      } else {
        stack.pop();
      }
    }

    // Set fixed start and end points
    newMaze[1][1] = 2; // Start
    newMaze[MAZE_SIZE - 2][MAZE_SIZE - 2] = 3; // End

    return newMaze;
  }, []);

  const resetGame = useCallback(() => {
    const newMaze = generateMaze();
    setMaze(newMaze);
    setPlayerPos({ x: 1, y: 1 });
    setGameWon(false);
    setMoves(0);
  }, [generateMaze]);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const movePlayer = useCallback((dx, dy) => {
    if (gameWon) return;

    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    if (
      newX >= 0 && newX < MAZE_SIZE &&
      newY >= 0 && newY < MAZE_SIZE &&
      maze[newY][newX] !== 1
    ) {
      setPlayerPos({ x: newX, y: newY });
      setMoves(prev => prev + 1);

      if (maze[newY][newX] === 3) {
        setGameWon(true);
      }
    }
  }, [playerPos, gameWon, maze]);

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
      <h2 className="text-2xl font-bold mb-4">Labirinto Aleatório</h2>
      <p className="mb-4">Encontre a saída! O labirinto muda a cada jogo.</p>

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
        className="mx-auto border-4 border-gray-700 bg-white inline-grid"
        style={{ 
          gridTemplateColumns: `repeat(${MAZE_SIZE}, 28px)`,
        }}
      >
        {maze.map((row, y) => 
          row.map((cell, x) => {
            const isPlayerPos = playerPos.x === x && playerPos.y === y;
            let cellContent = null;
            if (isPlayerPos) {
              cellContent = <img src="/images/meninas/Menina-Coruripe.png" alt="Player" className="w-full h-full" />;
            } else if (cell === 3) {
              cellContent = <img src="/images/jogos/coruripe/ChegadaLabirinto.png" alt="Exit" className="w-full h-full" />;
            }

            return (
              <div 
                key={`${x}-${y}`}
                className="w-7 h-7 flex items-center justify-center"
                style={{ backgroundColor: cell === 1 ? '#3A5940' : '#F3EAD3' }}
              >
                {cellContent}
              </div>
            );
          })
        )}
      </div>

      <div className="mt-6">
        <button onClick={resetGame} className="bg-aml-action text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center mx-auto">
          <RotateCcw className="w-4 h-4 mr-2" />
          Novo Labirinto
        </button>
      </div>
    </div>
  );
};

export default GeneratedMaze;
