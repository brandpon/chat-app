const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const http = require('http');
const uuid = require('uuid');
const timestamp = require('time-stamp');
const axios = require('axios');

require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(cors());
app.use(express.json());

// MongoDB stuff
const URI = process.env.ATLAS_URI;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully")
})

// Express routing
const userRouter = require('./routes/users');
const chatroomRouter = require('./routes/chatrooms');
app.use('/api/users', userRouter);
app.use('/api/chatrooms', chatroomRouter);

// Legacy code
const userOldRouter = require('./routes/users-old');
app.use('/api/users-old', userOldRouter);

// Number of users connected via SocketIO
var numUsers = 0;

// SocketIO handling
io.on('connection', (socket) => {
  ++numUsers;

  console.log("Number of connected clients: " + numUsers);
  console.log('Client connected from IP: ' + socket.handshake.address);

  socket.on('message', (data) => {


    console.log('Message: room ' + data.room + ' ' + data.username + ': ' + data.message);
    data.uuid = uuid.v4();
    data.timestamp = timestamp('YYYY/MM/DD:mm:ss');

    io.of('/').in(data.room).clients((error, clients) => {
      if (error) throw error;
      if (clients.includes(socket.id)){
        io.sockets.to(data.room).emit('message', data);

        // Should add the message to the DB for this room aswell
      }
    });
  });

  socket.on('joined room', (data) => {
    if (socket.room){
      console.log("User left room " + socket.room);
      socket.leave(socket.room);
    }

    socket.join(data.room);
    console.log("User joined room " + data.room);

    let test = Object.keys(io.sockets.adapter.rooms);
    console.log(test);

    // var {socketID, room} = Object.keys(io.sockets.adapter.sids[socket.id]);
    console.log('join Client currently in rooms ' + rooms);
    // socket.room = data.room;

  })

  // May be useless code
  socket.on('left room', (data) => {
    socket.leave(socket.room);
    console.log("User left room " + socket.room);
  })

  socket.on("disconnect", () => {
    --numUsers;
    console.log('Client Disconnected');
    console.log("Number of connected clients: " + numUsers);
  });

});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
