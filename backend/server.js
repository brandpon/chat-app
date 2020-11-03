const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const http = require('http');
const passport = require('passport');
const cookieParser = require('cookie-parser')

// Generate RSA keypair files if necessary
const keypair = require('./generateKeypair');
keypair.genKeyPair;

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

// Express DB API routing
const routes = require('./routes')(app, passport);
app.use('/', routes);

// SocketIO handling
// TODO: Need to authenticate SocketIO messages later

io.on('connection', (socket) => {
  console.log("test");
  require('./socketio')(socket, io);
});

// io.sockets
//   .on('connection', socketioJwt.authorize({
//     secret: PUB_KEY,
//     timeout: 15000 // 15 seconds to send the authentication message
//   }))
//   .on('authenticated', (socket) => {
//     require('./socketio')(socket, io);
//     //this socket is authenticated, we are good to handle more events from it.
//     console.log(`hello! ${socket.decoded_token.name}`);
//   });

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
