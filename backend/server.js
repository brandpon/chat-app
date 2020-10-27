const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const http = require('http');
const uuid = require('uuid');
const timestamp = require('time-stamp');
const axios = require('axios');
const passport = require('passport');
const cookieParser = require('cookie-parser')

require('./config/passport')(passport)
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const corsOptions = {
  //To allow requests from client
  origin: [
    "http://localhost:3000"
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// console.log("env is " + process.env.NODE_ENV);
// app.use(passport.initialize());

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

// Generate RSA keypair files if necessary
const keypair = require('./generateKeypair');
keypair.genKeyPair;

// Express DB API routing
const userRouter = require('./api/routes/users');
const chatroomRouter = require('./api/routes/chatrooms');
const userOldRouter = require('./api/routes/users-old');

const protectedRoute = passport.authenticate('jwt', {session: false});

app.use('/api/users', userRouter);
app.use('/api/chatrooms', protectedRoute, chatroomRouter);

// Change to admin route later
app.use('/api/users-old', protectedRoute, userOldRouter);

// TEST ROUTE
const testRouter = require('./api/routes/tester');
app.use('/api/tester', protectedRoute, testRouter);



// SocketIO handling
// Want to move this to a separate file soon

// Generate custom 

// Number of users connected via SocketIO
var numUsers = 0;

// Mapping of client_IDs to actual names
var connectedClients = {};

io.on('connection', (socket) => {
  ++numUsers;

  console.log("Number of connected clients: " + numUsers);
  console.log('Client connected from IP: ' + socket.handshake.address);

  socket.on('message', (data) => {

    console.log('[Message] ' + data.room + ', User ' + data.username + ': ' + data.message);
    data.uuid = uuid.v4();
    data.timestamp = timestamp('YYYY/MM/DD:mm:ss');

    io.of('/').in(data.room).clients((error, clients) => {
      if (error) throw error;
      if (clients.includes(socket.id)){
        io.sockets.to(data.room).emit('message', data);

        // TODO: Add the message to the DB for this room aswell
      }
    });
  });

  socket.on('joined room', (data) => {
    // If the client left a previous room to join this room (client can only be in one room at a time)
    if (socket.room){
      console.log("User left room " + socket.room);
      socket.leave(socket.room);
    }

    socket.join(data.room);
    console.log(socket.id);
    socket.emit('test', 'Welcome to the chatroom!');



    // Will need to verify the name via JWT/authentication later
    console.log("[Join] " + data.username + " joined room " + data.room);

    // Whenever a user joins a room, broadcast list of all clients connected to that room

    // io.of('/').in(data.room).clients((error, clients) => {
    //   if (error) throw error;
    //   if (clients.includes(socket.id)){
    //     io.sockets.to(data.room).emit('JOINED', data);

    //     // Should add the message to the DB for this room aswell
    //   }
    // });
    

    let test = Object.keys(io.sockets.adapter.rooms);
    console.log(test);
    console.log('join Client currently in rooms ' + test);

    // socket.room = data.room;

  })

  // May be useless code, function is done elsewhere?
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
