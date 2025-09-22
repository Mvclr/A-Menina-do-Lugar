import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw } from 'lucide-react';

const JigsawPuzzle = ({ imageUrl, gridSize, imageWidth, imageHeight }) => {
  const [pieces, setPieces] = useState([]);
  const [solved, setSolved] = useState(false);

  const pieceWidth = imageWidth / gridSize;
  const pieceHeight = imageHeight / gridSize;

  const shufflePieces = useCallback((piecesToShuffle) => {
    const shuffled = [...piecesToShuffle];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  const createPieces = useCallback(() => {
    const newPieces = [];
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        newPieces.push({
          id: y * gridSize + x,
          correctX: x * pieceWidth,
          correctY: y * pieceHeight,
        });
      }
    }
    setPieces(shufflePieces(newPieces));
    setSolved(false);
  }, [gridSize, pieceWidth, pieceHeight, shufflePieces]);

  useEffect(() => {
    createPieces();
  }, [createPieces]);

  const handleDragStart = (e, pieceId) => {
    e.dataTransfer.setData('pieceId', pieceId);
  };

  const handleDrop = (e, targetIndex) => {
    const pieceId = parseInt(e.dataTransfer.getData('pieceId'), 10);
    const draggedPieceIndex = pieces.findIndex(p => p.id === pieceId);
    const targetPiece = pieces[targetIndex];

    const newPieces = [...pieces];
    const draggedPiece = newPieces[draggedPieceIndex];
    
    // Swap the pieces
    newPieces[draggedPieceIndex] = targetPiece;
    newPieces[targetIndex] = draggedPiece;

    setPieces(newPieces);
  };

  const checkSolution = useCallback(() => {
    for (let i = 0; i < pieces.length; i++) {
      if (pieces[i].id !== i) {
        return false;
      }
    }
    return true;
  }, [pieces]);

  useEffect(() => {
    if (pieces.length > 0 && checkSolution()) {
      setSolved(true);
    }
  }, [pieces, checkSolution]);

  const renderPiece = (piece, index) => (
    <div
      key={piece.id}
      draggable={!solved}
      onDragStart={(e) => handleDragStart(e, piece.id)}
      onDrop={(e) => handleDrop(e, index)}
      onDragOver={(e) => e.preventDefault()}
      className={`cursor-move border-2 ${solved ? 'border-green-500' : 'border-dashed border-gray-400'}`}
      style={{
        width: pieceWidth,
        height: pieceHeight,
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: `-${piece.correctX}px -${piece.correctY}px`,
        backgroundSize: `${imageWidth}px ${imageHeight}px`,
        opacity: solved ? 0.8 : 1,
      }}
    />
  );

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Quebra-Cabeça</h2>
      {solved && <p className="text-green-500 font-bold text-xl mb-4">Parabéns, você conseguiu!</p>}
      
      <div className="mb-4">
        <button onClick={createPieces} className="bg-aml-action text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center mx-auto">
          <RotateCcw className="w-4 h-4 mr-2" />
          Embaralhar
        </button>
      </div>

      <div 
        className="grid gap-1 mx-auto border-4 border-gray-700"
        style={{ 
          gridTemplateColumns: `repeat(${gridSize}, ${pieceWidth}px)`,
          width: imageWidth + (gridSize * 2) // Adjust for gaps and borders
        }}
      >
        {pieces.map((piece, index) => renderPiece(piece, index))}
      </div>
    </div>
  );
};

export default JigsawPuzzle;