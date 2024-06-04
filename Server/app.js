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

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

let connectedUsers = [];

io.on('connection', socket => {
  console.log('User Connected', socket.id);
  connectedUsers.push(socket.id);
  io.emit('users-list', connectedUsers);

  socket.on('message', ({message, to}) => {
    if (to) {
      io.to(to).emit('receive-message', {message, from: socket.id});
    } else {
      io.emit('receive-message', {message, from: socket.id});
    }
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
    connectedUsers = connectedUsers.filter(id => id !== socket.id);
    io.emit('users-list', connectedUsers);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
