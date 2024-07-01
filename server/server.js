import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const port = 3001;

app.use(cors());
app.use(express.json());

let messages = [];

app.post('/messages', (req, res) => {
  const { message, user } = req.body;
  const newMessage = { user, message, timestamp: new Date() };
  messages.push(newMessage);
  io.emit('message', newMessage);
  res.status(200).send(newMessage);
});

app.post('/webhook', (req, res) => {
  console.log('Received webhook:', req.body);
  const newMessage = { user: 'mock-api', message: req.body.message, timestamp: new Date() };
  messages.push(newMessage);
  io.emit('message', newMessage);
  res.status(200).send('Webhook message emitted');
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.emit('init', messages);

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
