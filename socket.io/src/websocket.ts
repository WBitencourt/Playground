import { io } from './http';

interface User {
  socket_id: string;
  room: string;
}

const users: User[] = [];

io.on('connection', socket => {
  console.log(`User connected on socket ${socket.id}`);

  const joinRoom = (room: string) => {
    const userHasRoom = users.find(user => user.room === room && user.socket_id === socket.id);

    if(userHasRoom) {
      return
    }

    socket.join(room);

    console.log(`User ${socket.id} joined room ${room}`);

    users.push({ socket_id: socket.id, room });
  }

  const sendMessage = (room: string, message: string) => {
    console.log(`User ${socket.id} sent message to room ${room}: ${message}`);
    io.to(room).emit('receive_message', { message, sender: socket.id });
  };

  socket.on('join_room', (payload) => {
    const { room } = payload.data;

    joinRoom(room);
  });

  socket.on('send_message', (payload) => {
    const { room, message } = payload.data;

    joinRoom(room);

    sendMessage(room, message);
  });
});