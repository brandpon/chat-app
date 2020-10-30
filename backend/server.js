const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const http = require('http');
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
const routes = require('./routes')(app, passport);
app.use('/', routes);

// const userRouter = require('./api/routes/users');
// const chatroomRouter = require('./api/routes/chatrooms');
// const userOldRouter = require('./api/routes/users-old');

// const protectedRoute = passport.authenticate('jwt', {session: false});

// app.use('/api/users', userRouter);
// app.use('/api/chatrooms', protectedRoute, chatroomRouter);

// // Change to admin route later
// app.use('/api/users-old', protectedRoute, userOldRouter);

// // TEST ROUTE
// const testRouter = require('./api/routes/tester');
// app.use('/api/tester', protectedRoute, testRouter);

// SocketIO handling
// TODO: Need to authenticate later

io.on('connection', (socket) => {
  require('./socketio')(socket, io);
});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
