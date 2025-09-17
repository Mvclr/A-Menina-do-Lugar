import React, { useState, useEffect } from 'react';

// Palavras relacionadas ao tema do projeto
const words = ["MENINA", "LUGAR", "CULTURA", "LIVRO", "JOGO"];
const gridSize = 10;

// Função para gerar o caça-palavras
const generateGrid = () => {
  const newGrid = Array(gridSize)
    .fill(null)
    .map(() => Array(gridSize).fill(''));

  // Preencher com letras aleatórias
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      newGrid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }
  }

  // Esconder as palavras no grid (horizontal e vertical)
  words.forEach(word => {
    let placed = false;
    while (!placed) {
      const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);

      if (direction === 'horizontal' && col + word.length <= gridSize) {
        let canPlace = true;
        for (let i = 0; i < word.length; i++) {
          if (newGrid[row][col + i] !== '' && newGrid[row][col + i] !== word[i]) {
            canPlace = false;
            break;
          }
        }
        if (canPlace) {
          for (let i = 0; i < word.length; i++) {
            newGrid[row][col + i] = word[i];
          }
          placed = true;
        }
      } else if (direction === 'vertical' && row + word.length <= gridSize) {
        let canPlace = true;
        for (let i = 0; i < word.length; i++) {
          if (newGrid[row + i][col] !== '' && newGrid[row + i][col] !== word[i]) {
            canPlace = false;
            break;
          }
        }
        if (canPlace) {
          for (let i = 0; i < word.length; i++) {
            newGrid[row + i][col] = word[i];
          }
          placed = true;
        }
      }
    }
  });

  return newGrid;
};

const WordSearch = () => {
  const [grid, setGrid] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);

  useEffect(() => {
    setGrid(generateGrid());
  }, []);

  const handleMouseDown = (row, col) => {
    setIsSelecting(true);
    setSelectedLetters([{ row, col }]);
  };

  const handleMouseEnter = (row, col) => {
    if (isSelecting) {
      setSelectedLetters(prev => [...prev, { row, col }]);
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    const selectedWord = selectedLetters.map(({ row, col }) => grid[row][col]).join('');
    if (words.includes(selectedWord) && !foundWords.includes(selectedWord)) {
      setFoundWords(prev => [...prev, selectedWord]);
    }
    setSelectedLetters([]);
  };

  const isSelected = (row, col) => {
    return selectedLetters.some(l => l.row === row && l.col === col);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-10 gap-1 bg-gray-300 p-2 rounded-md">
        {grid.map((row, rowIndex) =>
          row.map((letter, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              onMouseUp={handleMouseUp}
              className={`w-10 h-10 flex items-center justify-center text-lg font-bold uppercase select-none cursor-pointer rounded-md transition-colors duration-200 ${
                isSelected(rowIndex, colIndex) ? 'bg-blue-400 text-white' : 'bg-white'
              }`}>
              {letter}
            </div>
          ))
        )}
      </div>
      <div className="mt-6 w-full">
        <h3 className="text-xl font-bold mb-3 text-center">Palavras a Encontrar:</h3>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center">
          {words.map(word => (
            <li
              key={word}
              className={`p-2 rounded-md transition-colors duration-300 ${
                foundWords.includes(word) ? 'bg-green-200 text-green-800 line-through' : 'bg-gray-100'
              }`}>
              {word}
            </li>
          ))}
        </ul>
      </div>
      {foundWords.length === words.length && (
        <div className="mt-6 text-2xl font-bold text-green-600 animate-bounce">
          Parabéns, você encontrou todas as palavras!
        </div>
      )}
    </div>
  );
};

export default WordSearch;