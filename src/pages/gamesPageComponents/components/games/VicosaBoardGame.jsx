import React, { useState, useEffect } from 'react';
import { useSocket } from '../../../../hooks/useSocket';

const VicosaBoardGame = () => {
  const socket = useSocket();
  const [roomId, setRoomId] = useState('');
  const [joinedRoom, setJoinedRoom] = useState(false);
  const [players, setPlayers] = useState({});
  const [diceRoll, setDiceRoll] = useState(null);
  const [playerPositions, setPlayerPositions] = useState({});
  const [currentPlayerId, setCurrentPlayerId] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [gameMessage, setGameMessage] = useState('');
  const [ranking, setRanking] = useState([]);

  const boardCoordinates = [
    { x: 52, y: 490 }, { x: 155, y: 510 }, { x: 188, y: 433 },
    { x: 111, y: 404 }, { x: 110, y: 321 }, { x: 195, y: 299 },
    { x: 276, y: 323 }, { x: 351, y: 324 }, { x: 348, y: 395 },
    { x: 305, y: 474 }, { x: 397, y: 498 }, { x: 477, y: 496 },
    { x: 542, y: 474 }, { x: 492, y: 391 }, { x: 428, y: 345 },
    { x: 472, y: 301 }, { x: 561, y: 318 }, { x: 635, y: 299 },
    { x: 695, y: 358 }, { x: 653, y: 421 }, { x: 621, y: 510 },
    { x: 726, y: 540 }, { x: 782, y: 478 }, { x: 767, y: 384 },
    { x: 865, y: 336 }, { x: 942, y: 283 }, { x: 1020, y: 324 },
    { x: 958, y: 386 }, { x: 878, y: 423 }, { x: 857, y: 499 },
    { x: 921, y: 539 }, { x: 1045, y: 466 },
  ];

  useEffect(() => {
    const handleRoomCreated = (newRoomId) => {
      setRoomId(newRoomId);
      setJoinedRoom(true);
      setIsCreator(true);
    };
    const handleJoinedRoom = (joinedRoomId) => {
      setRoomId(joinedRoomId);
      setJoinedRoom(true);
    };
    const handleUpdatePlayers = (p) => setPlayers(p);
    const handleUpdatePlayerPositions = (p) => setPlayerPositions(p);
    const handleGameStarted = () => setGameStarted(true);
    const handleTurnChanged = (id) => setCurrentPlayerId(id);
    const handleDiceRolled = ({ roll }) => setDiceRoll(roll);
    const handlePlayerMoved = ({ playerId, position }) => {
      setPlayerPositions((prev) => ({ ...prev, [playerId]: position }));
    };
    const handleGameMessage = (msg) => setGameMessage(msg);
    const handleUpdateRanking = (r) => setRanking(r);
    const handleError = (msg) => alert(msg);

    socket.on('roomCreated', handleRoomCreated);
    socket.on('joinedRoom', handleJoinedRoom);
    socket.on('updatePlayers', handleUpdatePlayers);
    socket.on('updatePlayerPositions', handleUpdatePlayerPositions);
    socket.on('updateRanking', handleUpdateRanking);
    socket.on('gameStarted', handleGameStarted);
    socket.on('turnChanged', handleTurnChanged);
    socket.on('diceRolled', handleDiceRolled);
    socket.on('playerMoved', handlePlayerMoved);
    socket.on('gameMessage', handleGameMessage);
    socket.on('error', handleError);

    return () => {
      socket.off('roomCreated', handleRoomCreated);
      socket.off('joinedRoom', handleJoinedRoom);
      socket.off('updatePlayers', handleUpdatePlayers);
      socket.off('updatePlayerPositions', handleUpdatePlayerPositions);
      socket.off('updateRanking', handleUpdateRanking);
      socket.off('gameStarted', handleGameStarted);
      socket.off('turnChanged', handleTurnChanged);
      socket.off('diceRolled', handleDiceRolled);
      socket.off('playerMoved', handlePlayerMoved);
      socket.off('gameMessage', handleGameMessage);
      socket.off('error', handleError);
    };
  }, [socket]);

  const createRoom = () => socket.emit('createRoom', { gameId: 'vicosa' });
  const joinRoom = () => socket.emit('joinRoom', roomId);
  const startGame = () => socket.emit('startGame', roomId);
  const handleRollDice = () => {
    if (gameStarted && currentPlayerId === socket.id) {
      socket.emit('diceRoll', roomId);
    }
  };

  if (!joinedRoom) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Jogo Multiplayer</h2>
        <button onClick={createRoom} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Criar Sala</button>
        <div className="flex justify-center">
          <input type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder="ID da Sala" className="border p-2 mr-2" />
          <button onClick={joinRoom} className="bg-green-500 text-white px-4 py-2 rounded">Entrar na Sala</button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-4">Jogo de Tabuleiro de Viçosa</h2>
      <p className="text-center mb-4">ID da Sala: <span className="font-bold">{roomId}</span></p>

      {!gameStarted && isCreator && (
        <div className="text-center mb-4">
          <button onClick={startGame} className="bg-green-500 text-white px-6 py-2 rounded">Começar Jogo</button>
        </div>
      )}
      
      <svg 
        viewBox="0 0 1100 825"
        className="w-full h-auto"
      >
        <image 
          href="/images/jogos/vicosa/VicosaJogoTabuleiro.png" 
          width="1100" 
          height="825" 
        />

        {Object.entries(playerPositions).map(([playerId, position]) => {
          if (position < 0) return null;
          const player = players[playerId];
          const coords = boardCoordinates[position];
          return player && coords ? (
            <circle
              key={playerId}
              cx={coords.x}
              cy={coords.y}
              r="20"
              fill={player.color}
              stroke="white"
              strokeWidth="3"
              style={{ transition: 'cx 0.5s ease, cy 0.5s ease' }}
            />
          ) : null;
        })}
      </svg>

      <div className="text-center mt-6">
        <button 
          onClick={handleRollDice}
          disabled={!gameStarted || currentPlayerId !== socket.id || ranking.includes(socket.id)}
          className="bg-aml-action text-white font-bold py-3 px-8 rounded-full text-xl hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          {currentPlayerId === socket.id ? 'Rolar o Dado' : `Aguarde a vez de ${players[currentPlayerId]?.number ? `Jogador ${players[currentPlayerId].number}` : '...'}`}
        </button>
        {diceRoll && (
          <p className="text-2xl font-bold mt-4">Última jogada: <span className="text-aml-action">{diceRoll}</span></p>
        )}
        {gameMessage && (
          <p className="text-lg mt-2 font-bold text-green-600">{gameMessage}</p>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold">Jogadores:</h3>
        <ul>
          {Object.values(players)
            .sort((a, b) => a.number - b.number)
            .map((player) => {
              const playerId = Object.keys(players).find(id => players[id] === player);
              return (
                <li key={player.number} style={{ color: player.color, fontWeight: currentPlayerId === playerId ? 'bold' : 'normal' }}>
                  {`Jogador ${player.number}`}
                </li>
              );
          })}
        </ul>
      </div>

      {ranking.length > 0 && (
        <div className="mt-6">
          <h3 className="text-2xl font-bold text-center">Ranking Final</h3>
          <ol className="list-decimal list-inside text-center text-lg">
            {ranking.map((playerId, index) => (
              <li key={playerId} style={{ color: players[playerId]?.color }}>
                {`${index + 1}º Lugar: Jogador ${players[playerId]?.number}`}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default VicosaBoardGame;
