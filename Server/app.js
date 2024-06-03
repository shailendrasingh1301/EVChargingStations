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
app.use(cors);

app.get('/', (req, res) => {
  res.send('Hello World');
});

io.on('connection', socket => {
  console.log('User Connected', socket.id);
  //   socket.emit('welcome', `Welcome to the server, ${socket.id}`); //this message will goes to the connected user only
  //   socket.broadcast.emit('welcome', `${socket.id} joined the server`); //this message will goes to other connected user only not itself user

  socket.on('message', data => {
    console.log(data);
    socket.broadcast.emit('receive-message', data);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
