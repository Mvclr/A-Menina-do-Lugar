import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Play, Trophy } from 'lucide-react';


const Button = ({ children, className = '', ...props }) => (
  <button {...props} className={`px-4 py-2 font-bold rounded ${className}`}>
    {children}
  </button>
);
const COLORS = [
  { id: 0, name: 'red', bg: 'bg-red-500', activeBg: 'bg-red-300', sound: 'C' },
  { id: 1, name: 'blue', bg: 'bg-blue-500', activeBg: 'bg-blue-300', sound: 'D' },
  { id: 2, name: 'green', bg: 'bg-green-500', activeBg: 'bg-green-300', sound: 'E' },
  { id: 3, name: 'yellow', bg: 'bg-yellow-500', activeBg: 'bg-yellow-300', sound: 'F' }
];

const SimonSays = ({ onBackToHome }) => {
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [activeColor, setActiveColor] = useState(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem('simonBestScore') || '0');
  });
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('Pressione Jogar para começar!');

  const playSound = useCallback((frequency) => {
    if (typeof window !== 'undefined' && window.AudioContext) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      const frequencies = { C: 261.63, D: 293.66, E: 329.63, F: 349.23 };
      oscillator.frequency.setValueAtTime(frequencies[frequency], audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    }
  }, []);

  const flashColor = useCallback((colorId, duration = 600) => {
    setActiveColor(colorId);
    playSound(COLORS[colorId].sound);
    setTimeout(() => setActiveColor(null), duration);
  }, [playSound]);

  const showSequence = useCallback(async () => {
    setIsShowingSequence(true);
    setMessage('Memorize a sequência...');
    
    for (let i = 0; i < sequence.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      flashColor(sequence[i]);
      await new Promise(resolve => setTimeout(resolve, 600));
    }
    
    setIsShowingSequence(false);
    setMessage('Agora repita a sequência!');
  }, [sequence, flashColor]);

  const addToSequence = useCallback(() => {
    const newColor = Math.floor(Math.random() * 4);
    setSequence(prev => [...prev, newColor]);
  }, []);

  const startGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    setMessage('Preparando...');
    
    // Adicionar primeira cor após um pequeno delay
    setTimeout(() => {
      const firstColor = Math.floor(Math.random() * 4);
      setSequence([firstColor]);
    }, 1000);
  };

  const resetGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setScore(0);
    setGameOver(false);
    setIsPlaying(false);
    setIsShowingSequence(false);
    setActiveColor(null);
    setMessage('Pressione Jogar para começar!');
  };

  const handleColorClick = (colorId) => {
    if (!isPlaying || isShowingSequence || gameOver) return;

    flashColor(colorId, 300);
    const newPlayerSequence = [...playerSequence, colorId];
    setPlayerSequence(newPlayerSequence);

    // Verificar se a jogada está correta
    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      // Jogada incorreta
      setGameOver(true);
      setIsPlaying(false);
      setMessage(`Game Over! Você chegou ao nível ${score + 1}`);
      
      if (score > bestScore) {
        setBestScore(score);
        localStorage.setItem('simonBestScore', score.toString());
      }
      return;
    }

    // Verificar se completou a sequência
    if (newPlayerSequence.length === sequence.length) {
      const newScore = score + 1;
      setScore(newScore);
      setPlayerSequence([]);
      setMessage(`Nível ${newScore + 1} - Prepare-se...`);
      
      // Adicionar nova cor à sequência após um delay
      setTimeout(() => {
        addToSequence();
      }, 1500);
    }
  };

  // Mostrar sequência quando ela muda
  useEffect(() => {
    if (sequence.length > 0 && isPlaying) {
      showSequence();
    }
  }, [sequence, isPlaying, showSequence]);

  const getButtonClass = (colorId) => {
    const color = COLORS[colorId];
    const baseClass = `w-24 h-24 rounded-lg border-4 border-gray-800 transition-all duration-150 transform`;
    const isActive = activeColor === colorId;
    const bgClass = isActive ? color.activeBg : color.bg;
    const scaleClass = isActive ? 'scale-95' : 'hover:scale-105';
    const shadowClass = isActive ? 'shadow-inner' : 'shadow-lg';
    
    return `${baseClass} ${bgClass} ${scaleClass} ${shadowClass} ${
      isShowingSequence || gameOver ? 'cursor-not-allowed' : 'cursor-pointer'
    }`;
  };

  return (
    <div className="text-center">
      {/* Placar */}
      <div className="flex justify-center gap-8 mb-6">
        <div className="bg-blue-100 px-6 py-3 rounded-lg">
          <div className="text-sm text-gray-600">Nível</div>
          <div className="text-2xl font-bold text-blue-600">{score}</div>
        </div>
        <div className="bg-yellow-100 px-6 py-3 rounded-lg">
          <div className="text-sm text-gray-600">Melhor</div>
          <div className="text-2xl font-bold text-yellow-600">{bestScore}</div>
        </div>
      </div>

      {/* Status do jogo */}
      <div className="mb-8 h-12 flex items-center justify-center">
        <div className="text-xl font-medium">
          {gameOver ? (
            <span className="text-red-600">💀 {message}</span>
          ) : isShowingSequence ? (
            <span className="text-blue-600">👀 {message}</span>
          ) : isPlaying ? (
            <span className="text-green-600">🎯 {message}</span>
          ) : (
            <span className="text-gray-600">🎮 {message}</span>
          )}
        </div>
      </div>

      {/* Painel de cores */}
      <div className="mb-8">
        <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
          {COLORS.map((color) => (
            <button
              key={color.id}
              onClick={() => handleColorClick(color.id)}
              className={getButtonClass(color.id)}
              disabled={isShowingSequence || gameOver || !isPlaying}
            >
              <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
                {color.id + 1}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Indicador de progresso */}
      {isPlaying && sequence.length > 0 && (
        <div className="mb-6">
          <div className="text-sm text-gray-600 mb-2">
            Progresso: {playerSequence.length} / {sequence.length}
          </div>
          <div className="w-48 bg-gray-200 rounded-full h-2 mx-auto">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(playerSequence.length / sequence.length) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Controles */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {!isPlaying || gameOver ? (
          <Button
            onClick={startGame}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <Play className="w-4 h-4 mr-2" />
            {gameOver ? 'Jogar Novamente' : 'Jogar'}
          </Button>
        ) : null}
        
        <Button
          onClick={resetGame}
          variant="outline"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reiniciar
        </Button>
      </div>

      {/* Sequência atual (para debug/ajuda) */}
      {isPlaying && sequence.length > 0 && (
        <div className="mb-6 p-3 bg-gray-100 rounded-lg">
          <div className="text-sm text-gray-600 mb-2">Sequência atual:</div>
          <div className="flex justify-center gap-2">
            {sequence.map((colorId, index) => (
              <div
                key={index}
                className={`w-6 h-6 rounded ${COLORS[colorId].bg} border border-gray-400 ${
                  index < playerSequence.length ? 'opacity-50' : ''
                }`}
                title={`Cor ${colorId + 1}`}
              ></div>
            ))}
          </div>
        </div>
      )}

      {/* Instruções */}
      <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
        <h4 className="font-semibold mb-2">Como jogar:</h4>
        <p>Observe a sequência de cores que pisca e depois repita clicando nos botões na mesma ordem. A cada nível, uma nova cor é adicionada à sequência. Quanto mais longe você chegar, maior será sua pontuação!</p>
      </div>
    </div>
  );
};

export default SimonSays;

