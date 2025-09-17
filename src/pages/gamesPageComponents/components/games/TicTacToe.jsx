import React, { useState, useEffect } from "react";
import { RotateCcw, Trophy } from "lucide-react";

const Button = ({ children, className = "", ...props }) => (
  <button {...props} className={`px-4 py-2 font-bold rounded ${className}`}>
    {children}
  </button>
);
const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // linhas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // colunas
    [0, 4, 8],
    [2, 4, 6], // diagonais
  ];

  const checkWinner = (squares) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const isBoardFull = (squares) => {
    return squares.every((square) => square !== null);
  };

  const minimax = (squares, depth, isMaximizing) => {
    const winner = checkWinner(squares);

    if (winner === "O") return 10 - depth;
    if (winner === "X") return depth - 10;
    if (isBoardFull(squares)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (squares[i] === null) {
          squares[i] = "O";
          const score = minimax(squares, depth + 1, false);
          squares[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (squares[i] === null) {
          squares[i] = "X";
          const score = minimax(squares, depth + 1, true);
          squares[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const getBestMove = (squares) => {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < 9; i++) {
      if (squares[i] === null) {
        squares[i] = "O";
        const score = minimax(squares, 0, false);
        squares[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };

  const handleClick = (index) => {
    if (board[index] || gameOver || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsPlayerTurn(false);

    const playerWin = checkWinner(newBoard);
    if (playerWin) {
      setWinner("Jogador");
      setGameOver(true);
      setPlayerScore((prev) => prev + 1);
      return;
    }

    if (isBoardFull(newBoard)) {
      setWinner("Empate");
      setGameOver(true);
      return;
    }
  };

  useEffect(() => {
    if (!isPlayerTurn && !gameOver) {
      const timer = setTimeout(() => {
        const bestMove = getBestMove(board);
        if (bestMove !== null) {
          const newBoard = [...board];
          newBoard[bestMove] = "O";
          setBoard(newBoard);

          const computerWin = checkWinner(newBoard);
          if (computerWin) {
            setWinner("Computador");
            setGameOver(true);
            setComputerScore((prev) => prev + 1);
          } else if (isBoardFull(newBoard)) {
            setWinner("Empate");
            setGameOver(true);
          } else {
            setIsPlayerTurn(true);
          }
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, board, gameOver]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
    setGameOver(false);
  };

  const resetScores = () => {
    setPlayerScore(0);
    setComputerScore(0);
    resetGame();
  };

  return (
    <div className="text-center">
      {/* Placar */}
      <div className="flex justify-center gap-8 mb-8">
        <div className="bg-blue-100 px-6 py-3 rounded-lg">
          <div className="text-sm text-gray-600">Jogador (X)</div>
          <div className="text-2xl font-bold text-blue-600">{playerScore}</div>
        </div>
        <div className="bg-red-100 px-6 py-3 rounded-lg">
          <div className="text-sm text-gray-600">Computador (O)</div>
          <div className="text-2xl font-bold text-red-600">{computerScore}</div>
        </div>
      </div>

      {/* Status do jogo */}
      <div className="mb-6 h-12 flex items-center justify-center">
        {gameOver ? (
          <div className="text-2xl font-bold">
            {winner === "Empate" ? (
              <span className="text-yellow-600">🤝 Empate!</span>
            ) : winner === "Jogador" ? (
              <span className="text-green-600">🎉 Você ganhou!</span>
            ) : (
              <span className="text-red-600">🤖 Computador ganhou!</span>
            )}
          </div>
        ) : (
          <div className="text-xl">
            {isPlayerTurn ? (
              <span className="text-blue-600">🎯 Sua vez!</span>
            ) : (
              <span className="text-red-600">🤖 Computador pensando...</span>
            )}
          </div>
        )}
      </div>

      {/* Tabuleiro */}
      <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto mb-8">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`
              w-20 h-20 text-3xl font-bold border-2 rounded-lg transition-all duration-200
              ${
                cell === "X"
                  ? "bg-blue-100 text-blue-600 border-blue-300"
                  : cell === "O"
                  ? "bg-red-100 text-red-600 border-red-300"
                  : "bg-gray-50 border-gray-300 hover:bg-gray-100"
              }
              ${!cell && !gameOver && isPlayerTurn ? "hover:scale-105 cursor-pointer" : ""}
              ${!cell && (!isPlayerTurn || gameOver) ? "cursor-not-allowed opacity-50" : ""}
            `}
            disabled={cell !== null || gameOver || !isPlayerTurn}
          >
            {cell}
          </button>
        ))}
      </div>

      {/* Botões */}
      <div className="flex flex-wrap justify-center gap-4">
        <Button onClick={resetGame} className="bg-blue-500 hover:bg-blue-600 text-white">
          <RotateCcw className="w-4 h-4 mr-2" />
          Nova Partida
        </Button>
        <Button onClick={resetScores} variant="outline">
          <Trophy className="w-4 h-4 mr-2" />
          Zerar Placar
        </Button>
      </div>

      {/* Instruções */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
        <h4 className="font-semibold mb-2">Como jogar:</h4>
        <p>
          Clique em uma casa vazia para fazer sua jogada. O objetivo é fazer uma
          linha de 3 símbolos iguais (horizontal, vertical ou diagonal). Você
          joga com X e o computador com O.
        </p>
      </div>
    </div>
  );
};

export default TicTacToe;
