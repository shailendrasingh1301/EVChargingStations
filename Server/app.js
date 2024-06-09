import express from 'express';
import {Server} from 'socket.io';
import {createServer} from 'http';
import cors from 'cors';

const port = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

let connectedUsers = [];
let userGroups = {}; // To hold group information

io.on('connection', socket => {
  console.log('User Connected', socket.id);

  // Check if the user is already connected
  if (!connectedUsers.includes(socket.id)) {
    connectedUsers.push(socket.id);
  }

  io.emit('users-list', {connectedUsers, userGroups});

  socket.on('message', ({message, room}) => {
    socket.to(room).emit('receive-message', {message, room});
  });

  socket.on('join-room', room => {
    socket.join(room);

    // Update userGroups
    if (!userGroups[room]) {
      userGroups[room] = [];
    }

    // Add user to group if not already present
    if (!userGroups[room].includes(socket.id)) {
      userGroups[room].push(socket.id);
    }

    io.emit('users-list', {connectedUsers, userGroups});
    console.log(`User joined room ${room}`, userGroups);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
    connectedUsers = connectedUsers.filter(id => id !== socket.id);

    // Remove socket.id from all groups
    for (const group in userGroups) {
      userGroups[group] = userGroups[group].filter(id => id !== socket.id);
    }

    io.emit('users-list', {connectedUsers, userGroups});
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
