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
const protectedRoute = require('./api/routes/protectedRoute');
const userOldRouter = require('./api/routes/users-old');

const testRouter = require('./api/routes/tester');

const protectedRoute2 = require('./api/routes/protectedRoute2');
app.use('/api/users', userRouter);

// Use this middleware to protect routes
app.use(protectedRoute);
app.use(protectedRoute2);

// Change to admin routes later
app.use('/api/chatrooms', protectedRoute, chatroomRouter);
app.use('/api/users-old', protectedRoute, userOldRouter);

// REMOVE LATER, FOR TESTING PURPOSES
app.use('/api/test', protectedRoute2);
// app.use('/api/tester', protectedRoute2, testRouter);

// So this is how you use authentication? middleware?
app.use('/api/tester', testRouter);

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
let a = server.address();
server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
