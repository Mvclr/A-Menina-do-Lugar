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

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('createRoom', () => {
    const roomId = Math.random().toString(36).substr(2, 5);
    rooms[roomId] = {
      players: {},
      playerOrder: [],
      gameState: {} // Add initial game state here
    };
    socket.join(roomId);
    socket.emit('roomCreated', roomId);
    console.log(`Room ${roomId} created`);
  });

  socket.on('joinRoom', (roomId) => {
    if (rooms[roomId]) {
      socket.join(roomId);
      const playerColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      rooms[roomId].playerOrder.push(socket.id);
      const playerNumber = rooms[roomId].playerOrder.indexOf(socket.id) + 1;
      rooms[roomId].players[socket.id] = { color: playerColor, number: playerNumber };
      socket.emit('joinedRoom', roomId);
      io.to(roomId).emit('updatePlayers', rooms[roomId].players);
      console.log(`Player ${socket.id} joined room ${roomId} as Player ${playerNumber}`);
    } else {
      socket.emit('error', 'Room not found');
    }
  });

  socket.on('diceRoll', (roomId, roll) => {
    io.to(roomId).emit('diceRolled', roll);
  });

  socket.on('movePlayer', (roomId, playerPosition) => {
    io.to(roomId).emit('playerMoved', socket.id, playerPosition);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    for (const roomId in rooms) {
      if (rooms[roomId].players[socket.id]) {
        delete rooms[roomId].players[socket.id];
        const playerIndex = rooms[roomId].playerOrder.indexOf(socket.id);
        if (playerIndex > -1) {
          rooms[roomId].playerOrder.splice(playerIndex, 1);
        }
        io.to(roomId).emit('updatePlayers', rooms[roomId].players);
      }
    }
  });
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});
