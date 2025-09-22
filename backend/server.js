const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Adjust this to your frontend's URL
    methods: ["GET", "POST"]
  }
});

const rooms = {};

const gameBoards = {
  cafurna: {
    spaces: [
        { rule: null }, { rule: null },
        { rule: { action: 'wait', amount: 1, text: 'Cafurna está em casa, Tinoco chegou, pulou em cima da mesa para comer banana e bagunçou tudo! Por conta da bagunça, FIQUE 1 RODADA SEM JOGAR.' } },
        { rule: null },
        { rule: { action: 'move', amount: 2, text: 'Lua ficou encantada quando soube que Cafurna tinha o mesmo nome da Mata em que estavam, e que esse nome significa caverna profunda e escura. Por isso, AVANCE 2 CASAS!' } },
        { rule: null }, { rule: null },
        { rule: { action: 'wait', amount: 1, text: 'Elas chegaram à escola em que Cafurna estudava, sentaram e ficaram a observar a Jaqueira, um símbolo muito importante de resistência para seu povo. FIQUE 1 RODADA SEM JOGAR!' } },
        { rule: null },
        { rule: { action: 'move', amount: 1, text: 'Lua está encantada com a beleza da mata, com o verde ao seu redor e os pássaros cantando. AVANCE 1 CASA!' } },
        { rule: null },
        { rule: { action: 'wait', amount: 1, text: 'Cafurna e Lua chegaram no açude. Foram brincar e depois pescaram um peixe grande, mas se atrasaram para voltar. FIQUE 1 RODADA SEM JOGAR.' } },
        { rule: null }, { rule: null },
        { rule: { action: 'move', amount: -1, text: 'Tinoco todo enxerido e arteiro que é, pula na cabeça de Lua, assustando ela. VOLTE 1 CASA!' } },
        { rule: null },
        { rule: { action: 'move', amount: 3, text: 'Elas foram para a casa da avó de Cafurna. Brincaram de panelada, foram almoçar o peixe que haviam pescado e conversaram bastante. O tempo passou muito rápido. AVANCE 3 CASAS!' } },
        { rule: null }, { rule: null },
        { rule: { action: 'roll_again', text: 'A avó de Cafurna é artesã. Ela retirou um colar de uma caixa mágica e presenteou Lua, para que ela jamais esqueça o que aprendeu por aqui. Já que Lua ganhou um presentão lindo, é hora de você ganhar também: JOGUE NOVAMENTE!' } },
        { rule: null },
        { rule: { action: 'move', amount: -1, text: 'Vixe! Chegou a hora de lavar os pratos. VOLTE 1 CASA!' } },
        { rule: null },
        { rule: { action: 'move_to_end', text: 'Um assovio é escutado pelas meninas, é hora de ir para a oca dançar o toré. AVANCE PARA O TORÉ!' } },
        { rule: null }, { rule: null }, { rule: null }, { rule: null }, { rule: null },
    ]
  },
  coruripe: {
    spaces: [
        { rule: null }, { rule: null }, { rule: { action: 'wait', amount: 1, text: 'A escadaria da Igreja da Matriz é tão linda que você se distraiu enquanto a observava. Fique 1 rodada sem jogar.' } },
        { rule: null }, { rule: { action: 'move', amount: 3, text: 'Você comprou um chapéu para se proteger do sol e pode andar mais rápido. Avance 3 casas.' } }, { rule: null },
        { rule: null }, { rule: null }, { rule: { action: 'conditional_move', threshold: 4, text: 'Você chegou na feira, mas o leite de coco está caro. Negocie com o feirante e na próxima rodada: só avance se tirar um número menor que 4.' } },
        { rule: null }, { rule: null }, { rule: null },
        { rule: { action: 'wait', amount: 1, text: 'A mestra Maria do Padeiro está cantando uma música de baiana. Fique 1 rodada sem jogar para ouvir.' } }, { rule: null },
        { rule: { action: 'wait', amount: 1, text: 'A alça da sacola rompeu e as compras caíram no chão. Junte os ingredientes e fique 1 rodada sem jogar.' } }, { rule: null },
        { rule: null }, { rule: { action: 'move', amount: 2, text: 'Que sorte!!! Você encontrou as artesãs de Ouricuri e elas consertaram a alça da sacola. Avance 2 casas.' } }, { rule: null },
        { rule: null }, { rule: { action: 'wait', amount: 1, text: 'Você parou para admirar a paisagem do Farol de Coruripe. Fique 1 rodada sem jogar.' } }, { rule: null },
        { rule: null }, { rule: { action: 'move', amount: 2, text: 'Você pegou carona na jangada para chegar mais rápido. Avance 2 casas.' } }, { rule: null },
        { rule: { action: 'move_to', position: 9, text: 'Você esqueceu o coco ralado!!! Volte para a feira (casa 9).' } }, { rule: null }, { rule: null },
        { rule: null }, { rule: null }, { rule: null },
    ]
  },
  muquem: {
    spaces: [
        { rule: { action: 'wait', amount: 1, text: 'Você foi convidado a tomar um café da manhã típico da nossa região! Fique 1 rodada sem jogar.' } }, { rule: null },
        { rule: null }, { rule: { action: 'move', amount: 2, text: 'Olha o boooode!! Correeee!! Avance 2 casas.' } }, { rule: { action: 'move', amount: 2, text: 'Avance 2 casas.' } },
        { rule: null }, { rule: { action: 'wait', amount: 1, text: 'Você parou para catar coquinho catolé. Fique 1 rodada sem jogar.' } }, { rule: null },
        { rule: null }, { rule: null }, { rule: { action: 'negotiate', text: 'Olha o boooode!! Caramba, você levou uma rasteira daquelas! Negocie para jogar.' } },
        { rule: null }, { rule: { action: 'move', amount: 2, text: 'Você conseguiu uma carona para chegar na casa da Dona Irinéia mais rápido! Avance 2 casas.' } }, { rule: null },
        { rule: null }, { rule: { action: 'negotiate', text: 'Você foi pedir ajuda à Dona Irinéia para moldar a panelinha de barro. Atenção para não errar o formato! Negocie para jogar.' } }, { rule: null },
        { rule: null }, { rule: { action: 'move', amount: 1, text: 'Olha o booode!! Correee!! Avance 1 casa.' } }, { rule: null },
        { rule: { action: 'wait', amount: 1, text: 'Sabiá está jogando capoeira, impossível não parar para assistir! Fique 1 rodada sem jogar.' } }, { rule: null },
        { rule: null }, { rule: { action: 'move', amount: 2, text: 'Você encontrou uma benzedeira no caminho e foi curado do mau olhado, ganhou muita saúde e energia! Avance 2 casas.' } }, { rule: null },
        { rule: null }, { rule: null }, { rule: { action: 'negotiate', text: 'Olha o boooode!! Caramba, você levou uma rasteira daquelas! Negocie para jogar.' } },
        { rule: null }, { rule: null }, { rule: null },
        { rule: { action: 'move_to', position: 16, text: 'Sua panelinha caiu e perdeu o formato, você precisa voltar para a casa da Dona Irinéia e a moldar novamente para colocar no forno! Volte para a casa 16.' } }, { rule: null },
        { rule: null }, { rule: null }, { rule: null },
    ]
  },
  vicosa: {
    spaces: [
        { rule: null }, { rule: null }, { rule: null },
        { rule: null }, { rule: { action: 'move', amount: 2, text: 'Você encontrou a Mestre Quitéria e o Rafael! Eles estão fazendo o chapéu do Guerreiro e cantando. Avance 2 casas.' } }, { rule: null },
        { rule: null }, { rule: { action: 'move', amount: -1, text: 'A galinha Vicentina apareceu para te atrapalhar! Volte 1 casa.' } }, { rule: null },
        { rule: { action: 'move', amount: 2, text: 'Rodrigo e Viçosa vão para a Cachoeira do Anel de carona no buggy de Eulália. Avance 2 casas.' } }, { rule: null },
        { rule: null }, { rule: { action: 'wait', amount: 1, text: 'Você chegou na cachoeira e caiu nas pedras escorregadias. Fique 1 rodada sem jogar para se recuperar.' } }, { rule: null },
        { rule: { action: 'move', amount: 2, text: 'Você chegou a Praça do Cinema, a Cavalhada está passando. Avance 2 casas.' } }, { rule: null },
        { rule: null }, { rule: { action: 'wait', amount: 1, text: 'Você chegou a casa do Seu João do quebra-queixo. Ele está dormindo e vai demorar. Fique 1 rodada sem jogar até ele acordar.' } }, { rule: null },
        { rule: { action: 'wait', amount: 1, text: 'Você avistou de longe a Serra dos Dois Irmãos. Ficou encantado com a beleza e perdeu a hora. Fique uma rodada sem jogar.' } }, { rule: null },
        { rule: null }, { rule: null }, { rule: { action: 'move', amount: 2, text: 'Você chegou na Praça da Cavalhada. Viu de longe o Mestre Bia tocando pífano. Avance 2 casas.' } },
        { rule: null }, { rule: { action: 'wait', amount: 1, text: 'Você ficou vendo o Mestre Bia tocando com a Banda de pífano e perdeu a hora de ir comer brasileira. Fique 1 rodada sem jogar.' } }, { rule: null },
        { rule: { action: 'move', amount: 3, text: 'Você pegou carona de buggy para ir comer Brasileira. Avance 3 casas.' } }, { rule: null },
        { rule: { action: 'move', amount: -3, text: 'A galinha Vicentina apareceu para te atrapalhar! Volte 3 casas.' } }, { rule: null }, { rule: null },
    ]
  }
};

io.on('connection', (socket) => {
  console.log(`A user connected: ${socket.id}`);

  socket.on('createRoom', ({ gameId }) => {
    const roomId = Math.random().toString(36).substr(2, 5);
    const playerColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    
    rooms[roomId] = {
      id: roomId,
      gameId: gameId,
      players: { [socket.id]: { color: playerColor, number: 1 } },
      playerOrder: [socket.id],
      currentPlayerIndex: 0,
      playerPositions: { [socket.id]: 0 },
      skippedTurns: {},
      finishRanking: [],
      gameStarted: false
    };

    socket.join(roomId);
    socket.emit('roomCreated', roomId);
    io.to(roomId).emit('updatePlayers', rooms[roomId].players);
    io.to(roomId).emit('updatePlayerPositions', rooms[roomId].playerPositions);
    console.log(`Room ${roomId} created by ${socket.id} for game ${gameId}`);
  });

  socket.on('joinRoom', (roomId) => {
    const room = rooms[roomId];
    if (room && !room.gameStarted) {
      socket.join(roomId);
      const playerColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      const playerNumber = room.playerOrder.length + 1;
      room.playerOrder.push(socket.id);
      room.players[socket.id] = { color: playerColor, number: playerNumber };
      room.playerPositions[socket.id] = 0;

      socket.emit('joinedRoom', roomId);
      io.to(roomId).emit('updatePlayers', room.players);
      io.to(roomId).emit('updatePlayerPositions', room.playerPositions);
      console.log(`Player ${socket.id} joined room ${roomId} as Player ${playerNumber}`);
    } else if (room && room.gameStarted) {
      socket.emit('error', 'Game has already started');
    } else {
      socket.emit('error', 'Room not found');
    }
  });

  socket.on('startGame', (roomId) => {
    const room = rooms[roomId];
    if (room && room.playerOrder[0] === socket.id) {
      room.gameStarted = true;
      const currentPlayerId = room.playerOrder[room.currentPlayerIndex];
      io.to(roomId).emit('gameStarted');
      io.to(roomId).emit('turnChanged', currentPlayerId);
      console.log(`Game started in room ${roomId}`);
    } else {
      socket.emit('error', 'Only the creator of the room can start the game.');
    }
  });

  const advanceTurn = (room) => {
    room.currentPlayerIndex = (room.currentPlayerIndex + 1) % room.playerOrder.length;
    const nextPlayerId = room.playerOrder[room.currentPlayerIndex];
    
    if (room.skippedTurns[nextPlayerId] > 0) {
        room.skippedTurns[nextPlayerId] -= 1;
        io.to(room.id).emit('gameMessage', `Jogador ${room.players[nextPlayerId].number} pulou a vez.`);
        advanceTurn(room);
    } else {
        io.to(room.id).emit('turnChanged', nextPlayerId);
    }
  }

  const checkForFinish = (room, playerId) => {
    const board = gameBoards[room.gameId];
    if (!board) return;

    const playerPosition = room.playerPositions[playerId];
    if (playerPosition === board.spaces.length - 1) {
        if (!room.finishRanking.includes(playerId)) {
            room.finishRanking.push(playerId);
            io.to(room.id).emit('updateRanking', room.finishRanking);
            if (room.finishRanking.length === 1) {
                io.to(room.id).emit('gameMessage', `Parabéns! Jogador ${room.players[playerId].number} venceu o jogo!`);
            }
        }
    }
  }

  socket.on('diceRoll', (roomId) => {
    const room = rooms[roomId];
    if (!room || !room.gameStarted) return;

    const board = gameBoards[room.gameId];
    if (!board) return;

    const currentPlayerId = room.playerOrder[room.currentPlayerIndex];
    if (socket.id !== currentPlayerId) return;
    
    if (room.finishRanking.includes(currentPlayerId)) {
        advanceTurn(room);
        return;
    }

    const roll = Math.floor(Math.random() * 6) + 1;
    io.to(roomId).emit('diceRolled', { playerId: socket.id, roll });

    let currentPosition = room.playerPositions[socket.id] || 0;
    let newPosition = Math.min(currentPosition + roll, board.spaces.length - 1);
    room.playerPositions[socket.id] = newPosition;
    io.to(roomId).emit('playerMoved', { playerId: socket.id, position: newPosition });
    checkForFinish(room, socket.id);

    const rule = board.spaces[newPosition]?.rule;
    let turnShouldAdvance = true;

    if (rule) {
        io.to(roomId).emit('gameMessage', rule.text);
        switch (rule.action) {
            case 'move':
                newPosition = Math.min(newPosition + rule.amount, board.spaces.length - 1);
                room.playerPositions[socket.id] = newPosition;
                setTimeout(() => {
                    io.to(roomId).emit('playerMoved', { playerId: socket.id, position: newPosition });
                    checkForFinish(room, socket.id);
                }, 1000);
                break;
            case 'move_to_end':
                newPosition = board.spaces.length - 1;
                room.playerPositions[socket.id] = newPosition;
                setTimeout(() => {
                    io.to(roomId).emit('playerMoved', { playerId: socket.id, position: newPosition });
                    checkForFinish(room, socket.id);
                }, 1000);
                break;
            case 'wait':
                room.skippedTurns[socket.id] = (room.skippedTurns[socket.id] || 0) + rule.amount;
                break;
            case 'roll_again':
                turnShouldAdvance = false;
                break;
        }
    }

    if (turnShouldAdvance) {
        advanceTurn(room);
    } else {
        io.to(roomId).emit('turnChanged', currentPlayerId);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    for (const roomId in rooms) {
      const room = rooms[roomId];
      if (room.players[socket.id]) {
        const playerIndex = room.playerOrder.indexOf(socket.id);
        if (playerIndex > -1) {
          room.playerOrder.splice(playerIndex, 1);
          delete room.players[socket.id];
          delete room.playerPositions[socket.id];
          delete room.skippedTurns[socket.id];
          room.finishRanking = room.finishRanking.filter(id => id !== socket.id);

          if (room.playerOrder.length === 0) {
            delete rooms[roomId];
            console.log(`Room ${roomId} is now empty and closed.`);
            return;
          }

          room.playerOrder.forEach((playerId, index) => {
            room.players[playerId].number = index + 1;
          });

          if (room.gameStarted) {
            if (playerIndex < room.currentPlayerIndex) {
              room.currentPlayerIndex -= 1;
            }
            if (room.currentPlayerIndex >= room.playerOrder.length) {
              room.currentPlayerIndex = 0;
            }
            const nextPlayerId = room.playerOrder[room.currentPlayerIndex];
            io.to(roomId).emit('turnChanged', nextPlayerId);
          }
          io.to(roomId).emit('updatePlayers', room.players);
          io.to(roomId).emit('updatePlayerPositions', room.playerPositions);
          io.to(roomId).emit('updateRanking', room.finishRanking);
        }
      }
    }
  });
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});