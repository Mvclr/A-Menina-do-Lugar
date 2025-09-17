import React, { useState, useEffect } from "react";
import { RotateCcw, Shuffle, Trophy } from "lucide-react";

const Button = ({ children, className = "", ...props }) => (
  <button {...props} className={`px-4 py-2 font-bold rounded ${className}`}>
    {children}
  </button>
);
const SlidingPuzzle = () => {
  const [board, setBoard] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [bestMoves, setBestMoves] = useState(() => {
    return parseInt(localStorage.getItem("puzzleBestMoves") || "999");
  });
  const [isShuffling, setIsShuffling] = useState(false);

  const BOARD_SIZE = 4;
  const EMPTY_TILE = 16;

  // Inicializar tabuleiro resolvido
  const initializeSolvedBoard = () => {
    return Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, i) => i + 1);
  };

  // Verificar se o tabuleiro está resolvido
  const isSolved = (currentBoard) => {
    for (let i = 0; i < currentBoard.length - 1; i++) {
      if (currentBoard[i] !== i + 1) return false;
    }
    return currentBoard[currentBoard.length - 1] === EMPTY_TILE;
  };

  // Encontrar posição do tile vazio
  const findEmptyPosition = (currentBoard) => {
    const index = currentBoard.indexOf(EMPTY_TILE);
    return {
      row: Math.floor(index / BOARD_SIZE),
      col: index % BOARD_SIZE,
      index,
    };
  };

  // Verificar se um movimento é válido
  const isValidMove = (tileIndex, emptyIndex) => {
    const tileRow = Math.floor(tileIndex / BOARD_SIZE);
    const tileCol = tileIndex % BOARD_SIZE;
    const emptyRow = Math.floor(emptyIndex / BOARD_SIZE);
    const emptyCol = emptyIndex % BOARD_SIZE;

    return (
      Math.abs(tileRow - emptyRow) === 1 && tileCol === emptyCol
    ) || (
      Math.abs(tileCol - emptyCol) === 1 && tileRow === emptyRow
    );
  };

  // Embaralhar o tabuleiro
  const shuffleBoard = () => {
    setIsShuffling(true);
    let newBoard = initializeSolvedBoard();

    // Fazer 1000 movimentos aleatórios válidos para embaralhar
    for (let i = 0; i < 1000; i++) {
      const emptyPos = findEmptyPosition(newBoard);
      const possibleMoves = [];

      // Encontrar todos os movimentos válidos
      for (let j = 0; j < newBoard.length; j++) {
        if (newBoard[j] !== EMPTY_TILE && isValidMove(j, emptyPos.index)) {
          possibleMoves.push(j);
        }
      }

      if (possibleMoves.length > 0) {
        const randomMove =
          possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        // Trocar o tile com o espaço vazio
        [newBoard[randomMove], newBoard[emptyPos.index]] = [
          newBoard[emptyPos.index],
          newBoard[randomMove],
        ];
      }
    }

    setBoard(newBoard);
    setMoves(0);
    setIsComplete(false);

    setTimeout(() => setIsShuffling(false), 500);
  };

  // Mover um tile
  const moveTile = (tileIndex) => {
    if (isComplete || isShuffling) return;

    const emptyPos = findEmptyPosition(board);

    if (isValidMove(tileIndex, emptyPos.index)) {
      const newBoard = [...board];
      [newBoard[tileIndex], newBoard[emptyPos.index]] = [
        newBoard[emptyPos.index],
        newBoard[tileIndex],
      ];

      setBoard(newBoard);
      setMoves((prev) => prev + 1);

      if (isSolved(newBoard)) {
        setIsComplete(true);
        if (moves + 1 < bestMoves) {
          setBestMoves(moves + 1);
          localStorage.setItem("puzzleBestMoves", (moves + 1).toString());
        }
      }
    }
  };

  // Resetar jogo
  const resetGame = () => {
    shuffleBoard();
  };

  // Inicializar jogo
  useEffect(() => {
    shuffleBoard();
  }, []);

  const getTileClass = (tile, index) => {
    const baseClass = `
      w-16 h-16 flex items-center justify-center text-lg font-bold rounded-lg
      transition-all duration-200 cursor-pointer
    `;

    if (tile === EMPTY_TILE) {
      return `${baseClass} bg-gray-100 cursor-default`;
    }

    const emptyPos = findEmptyPosition(board);
    const canMove = isValidMove(index, emptyPos.index);

    const correctPosition = tile - 1;
    const isInCorrectPosition = index === correctPosition;

    if (isInCorrectPosition) {
      return `${baseClass} bg-green-100 text-green-800 border-2 border-green-300 ${
        canMove ? "hover:bg-green-200 hover:scale-105" : ""
      }`;
    } else {
      return `${baseClass} bg-blue-100 text-blue-800 border-2 border-blue-300 ${
        canMove
          ? "hover:bg-blue-200 hover:scale-105"
          : "cursor-not-allowed opacity-75"
      }`;
    }
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
            {bestMoves === 999 ? "--" : bestMoves}
          </div>
        </div>
      </div>

      {/* Status do jogo */}
      <div className="mb-6 h-12 flex items-center justify-center">
        {isComplete ? (
          <div className="text-2xl font-bold text-green-600">
            🎉 Parabéns! Resolvido em {moves} movimentos!
          </div>
        ) : isShuffling ? (
          <div className="text-xl text-blue-600">🔄 Embaralhando...</div>
        ) : (
          <div className="text-xl text-gray-600">🧩 Organize os números de 1 a 15!</div>
        )}
      </div>

      {/* Tabuleiro */}
      <div className="inline-block p-4 bg-gray-200 rounded-lg mb-6">
        <div className="grid grid-cols-4 gap-2">
          {board.map((tile, index) => (
            <div key={index} onClick={() => moveTile(index)} className={getTileClass(tile, index)}>
              {tile !== EMPTY_TILE && tile}
            </div>
          ))}
        </div>
      </div>

      {/* Indicador de progresso */}
      <div className="mb-6">
        <div className="text-sm text-gray-600 mb-2">
          Peças corretas:{" "}
          {
            board.filter((tile, index) => tile !== EMPTY_TILE && tile - 1 === index).length
          }{" "}
          / 15
        </div>
        <div className="w-64 bg-gray-200 rounded-full h-2 mx-auto">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                (board.filter((tile, index) => tile !== EMPTY_TILE && tile - 1 === index).length / 15) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>

      {/* Controles */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <Button onClick={resetGame} className="bg-blue-500 hover:bg-blue-600 text-white" disabled={isShuffling}>
          <Shuffle className="w-4 h-4 mr-2" />
          Novo Jogo
        </Button>

        <Button onClick={shuffleBoard} variant="outline" disabled={isShuffling}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Embaralhar
        </Button>
      </div>

      {/* Dica visual */}
      <div className="mb-6 p-3 bg-gray-100 rounded-lg">
        <div className="text-sm text-gray-600 mb-2">Legenda:</div>
        <div className="flex justify-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
            <span>Posição correta</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
            <span>Posição incorreta</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-100 rounded"></div>
            <span>Espaço vazio</span>
          </div>
        </div>
      </div>

      {/* Instruções */}
      <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
        <h4 className="font-semibold mb-2">Como jogar:</h4>
        <p>
          Clique em uma peça adjacente ao espaço vazio para movê-la. O objetivo
          é organizar os números de 1 a 15 em ordem, deixando o espaço vazio no
          canto inferior direito. Peças verdes estão na posição correta!
        </p>
      </div>
    </div>
  );
};

export default SlidingPuzzle;
