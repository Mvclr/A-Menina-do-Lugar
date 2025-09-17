import React, { useState, useEffect, useCallback } from "react";
import { RotateCcw, Play, Trophy } from "lucide-react";

const MAZE_SIZE = 15;
const CELL_TYPES = {
  WALL: 1,
  PATH: 0,
  PLAYER: 2,
  EXIT: 3,
  VISITED: 4,
};

const Button = ({ children, className = "", ...props }) => (
  <button {...props} className={`px-4 py-2 font-bold rounded ${className}`}>
    {children}
  </button>
);

const Maze = () => {
  const [maze, setMaze] = useState([]);
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
  const [gameWon, setGameWon] = useState(false);
  const [moves, setMoves] = useState(0);
  const [bestTime, setBestTime] = useState(() => {
    return parseInt(localStorage.getItem("mazeBestMoves") || "999");
  });
  const [visitedCells, setVisitedCells] = useState(new Set());

  // Gerar labirinto usando algoritmo de backtracking
  const generateMaze = useCallback(() => {
    const newMaze = Array(MAZE_SIZE)
      .fill()
      .map(() => Array(MAZE_SIZE).fill(CELL_TYPES.WALL));
    const visited = Array(MAZE_SIZE)
      .fill()
      .map(() => Array(MAZE_SIZE).fill(false));

    const directions = [
      { x: 0, y: -2 }, // cima
      { x: 2, y: 0 }, // direita
      { x: 0, y: 2 }, // baixo
      { x: -2, y: 0 }, // esquerda
    ];

    const isValid = (x, y) => {
      return (
        x >= 0 && x < MAZE_SIZE && y >= 0 && y < MAZE_SIZE && !visited[y][x]
      );
    };

    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const carve = (x, y) => {
      visited[y][x] = true;
      newMaze[y][x] = CELL_TYPES.PATH;

      const shuffledDirections = shuffle([...directions]);

      for (const dir of shuffledDirections) {
        const newX = x + dir.x;
        const newY = y + dir.y;

        if (isValid(newX, newY)) {
          // Criar caminho entre as células
          newMaze[y + dir.y / 2][x + dir.x / 2] = CELL_TYPES.PATH;
          carve(newX, newY);
        }
      }
    };

    // Começar do canto superior esquerdo (posição ímpar para garantir que seja um caminho)
    carve(1, 1);

    // Definir saída no canto inferior direito
    newMaze[MAZE_SIZE - 2][MAZE_SIZE - 2] = CELL_TYPES.EXIT;

    return newMaze;
  }, []);

  const resetGame = () => {
    const newMaze = generateMaze();
    setMaze(newMaze);
    setPlayerPos({ x: 1, y: 1 });
    setGameWon(false);
    setMoves(0);
    setVisitedCells(new Set(["1,1"]));
  };

  const movePlayer = useCallback(
    (direction) => {
      if (gameWon) return;

      const newPos = { ...playerPos };

      switch (direction) {
        case "up":
          newPos.y -= 1;
          break;
        case "down":
          newPos.y += 1;
          break;
        case "left":
          newPos.x -= 1;
          break;
        case "right":
          newPos.x += 1;
          break;
        default:
          return;
      }

      // Verificar se a nova posição é válida
      if (
        newPos.x >= 0 &&
        newPos.x < MAZE_SIZE &&
        newPos.y >= 0 &&
        newPos.y < MAZE_SIZE &&
        maze[newPos.y][newPos.x] !== CELL_TYPES.WALL
      ) {
        setPlayerPos(newPos);
        setMoves((prev) => prev + 1);

        // Adicionar célula visitada
        const cellKey = `${newPos.x},${newPos.y}`;
        setVisitedCells((prev) => new Set([...prev, cellKey]));

        // Verificar se chegou na saída
        if (maze[newPos.y][newPos.x] === CELL_TYPES.EXIT) {
          setGameWon(true);
          if (moves + 1 < bestTime) {
            setBestTime(moves + 1);
            localStorage.setItem("mazeBestMoves", (moves + 1).toString());
          }
        }
      }
    },
    [playerPos, maze, gameWon, moves, bestTime]
  );

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          movePlayer("up");
          break;
        case "ArrowDown":
          e.preventDefault();
          movePlayer("down");
          break;
        case "ArrowLeft":
          e.preventDefault();
          movePlayer("left");
          break;
        case "ArrowRight":
          e.preventDefault();
          movePlayer("right");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [movePlayer]);

  useEffect(() => {
    resetGame();
  }, [generateMaze]);

  const getCellContent = (x, y) => {
    if (playerPos.x === x && playerPos.y === y) {
      return "🏃";
    }
    if (maze[y] && maze[y][x] === CELL_TYPES.EXIT) {
      return "🚩";
    }
    return "";
  };

  const getCellClass = (x, y) => {
    const baseClass = "w-6 h-6 flex items-center justify-center text-xs";

    if (playerPos.x === x && playerPos.y === y) {
      return `${baseClass} bg-blue-500 text-white font-bold`;
    }

    if (maze[y] && maze[y][x] === CELL_TYPES.WALL) {
      return `${baseClass} bg-gray-800`;
    }

    if (maze[y] && maze[y][x] === CELL_TYPES.EXIT) {
      return `${baseClass} bg-green-500 text-white`;
    }

    const cellKey = `${x},${y}`;
    if (visitedCells.has(cellKey)) {
      return `${baseClass} bg-blue-100 border border-blue-200`;
    }

    return `${baseClass} bg-white border border-gray-200`;
  };

  return (
    <div className="text-center">
      {/* Placar */}
      <div className="flex justify-center gap-8 mb-6">
        <div className="bg-blue-100 px-6 py-3 rounded-lg">
          <div className="text-sm text-gray-600">Movimentos</div>
          <div className="text-2xl font-bold text-blue-600">{moves}</div>
        </div>
        <div className="bg-yellow-100 px-6 py-3 rounded-lg">
          <div className="text-sm text-gray-600">Melhor</div>
          <div className="text-2xl font-bold text-yellow-600">
            {bestTime === 999 ? "--" : bestTime}
          </div>
        </div>
      </div>

      {/* Status do jogo */}
      <div className="mb-6 h-12 flex items-center justify-center">
        {gameWon ? (
          <div className="text-2xl font-bold text-green-600">
            🎉 Parabéns! Você escapou em {moves} movimentos!
          </div>
        ) : (
          <div className="text-xl text-gray-600">🏃 Encontre a saída do labirinto!</div>
        )}
      </div>

      {/* Labirinto */}
      <div className="inline-block p-4 bg-gray-100 rounded-lg mb-6 overflow-auto max-w-full">
        <div
          className="grid gap-0 border-2 border-gray-400"
          style={{
            gridTemplateColumns: `repeat(${MAZE_SIZE}, minmax(0, 1fr))`,
            maxWidth: "450px",
            margin: "0 auto",
          }}
        >
          {maze.map((row, y) =>
            row.map((cell, x) => (
              <div key={`${x}-${y}`} className={getCellClass(x, y)}>
                {getCellContent(x, y)}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Controles */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <Button onClick={resetGame} className="bg-blue-500 hover:bg-blue-600 text-white">
          <RotateCcw className="w-4 h-4 mr-2" />
          Novo Labirinto
        </Button>
      </div>

      {/* Controles direcionais para mobile */}
      <div className="mb-6">
        <div className="text-sm text-gray-600 mb-3">Controles:</div>
        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
          <div></div>
          <Button onClick={() => movePlayer("up")} variant="outline" size="sm" disabled={gameWon}>
            ↑
          </Button>
          <div></div>
          <Button onClick={() => movePlayer("left")} variant="outline" size="sm" disabled={gameWon}>
            ←
          </Button>
          <div className="flex items-center justify-center text-sm text-gray-500">🏃</div>
          <Button onClick={() => movePlayer("right")} variant="outline" size="sm" disabled={gameWon}>
            →
          </Button>
          <div></div>
          <Button onClick={() => movePlayer("down")} variant="outline" size="sm" disabled={gameWon}>
            ↓
          </Button>
          <div></div>
        </div>
      </div>

      {/* Legenda */}
      <div className="mb-6 p-3 bg-gray-100 rounded-lg">
        <div className="text-sm text-gray-600 mb-2">Legenda:</div>
        <div className="flex justify-center gap-4 text-xs flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center text-white text-xs">🏃</div>
            <span>Você</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center text-white text-xs">🚩</div>
            <span>Saída</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-800 rounded"></div>
            <span>Parede</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
            <span>Visitado</span>
          </div>
        </div>
      </div>

      {/* Instruções */}
      <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
        <h4 className="font-semibold mb-2">Como jogar:</h4>
        <p>
          Use as setas do teclado ou os botões para mover seu personagem (🏃)
          pelo labirinto. O objetivo é chegar até a bandeira (🚩) no menor
          número de movimentos possível. As áreas azuis mostram onde você já
          passou.
        </p>
      </div>
    </div>
  );
};

export default Maze;
