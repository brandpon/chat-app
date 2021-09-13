const uuid = require('uuid');
const timestamp = require('time-stamp');

// Mappings:
// Socketid to username
var clientMapping = {};
// Room to array of usernames
var roomMapping = {}

module.exports = function(socket, io){

  console.log();
  console.log('Client connected from IP: ' + socket.handshake.address);

  socket.on('message', (data) => {

    console.log('[Message] ' + data.room + ', User ' + data.username + ': ' + data.message);
    data.uuid = uuid.v4();
    data.timestamp = timestamp('YYYY/MM/DD:mm:ss');


    // Gets all clients in the room
    io.of('/').in(data.room).clients((error, clients) => {
      if (error){
        console.log("Error getting all clients in room");
      } 
      if (clients.includes(socket.id)){
        io.sockets.to(data.room).emit('message', data);

        // TODO: Add the message to the DB for this room
      }
    });
  });

  socket.on('joined room', (data) => {
    // If the client left a previous room to join this room (client can only be in one room at a time)
    // TODO: This might be unnecessary
    // if (socket.room){

    //   if (socket.id in clientMapping){
    //     delete clientMapping[socket.id];
    //   }
    //   console.log(socket.room);
    //   console.log(roomMapping);

    //   const index = roomMapping[socket.room].indexOf(socket.id);
    //   if (index > -1){
    //     roomMapping[data.room].splice(index, 1);
    //   }

    //   // roomMapping[data.room].splice(index, 1);
    //   socket.leave(socket.room);

    //   // TODO: Send leaving room message to clients in previous room
      
    //   console.log("User left room " + socket.room);
    //   console.log(clientMapping);
    //   console.log(roomMapping);
    // }


    // Mapping of socketid to username
    clientMapping[socket.id] = data.username;

    // Mapping of room to socketid
    if (data.room in roomMapping){
      roomMapping[data.room].push(socket.id);
    } else {
      roomMapping[data.room] = [socket.id];
    }

    // console.log(clientMapping);
    // console.log(roomMapping);

    // TODO: Verify the name via JWT later
    console.log("[Joined Room] " + data.username + " joined room " + data.room);

    socket.join(data.room);

    // Broadcast list of all clients in the room
    io.of('/').in(data.room).clients((error, clients) => {
      if (error){
        console.log("Error broadcasting to all clients");
      }
      // console.log(clients);
      const users = [];
      clients.forEach(client => users.push(clientMapping[client]));
      io.sockets.to(data.room).emit('userlist', users);
      // console.log(users);
    });

    console.log("Number of connected clients: " + Object.keys(clientMapping).length);

  })

  socket.on("disconnecting", () => {

    console.log("User is leaving room");

    //  This is to prevent crashing when a user disconnects after the server has restarted
    if (!(socket.id in clientMapping)){
      return;
    }

    // console.log(clientMapping);
    // console.log(roomMapping);
    
    if (socket.id in clientMapping){
      delete clientMapping[socket.id];
    }

    // Get the room the user was previously in
    let socketRooms = Object.values(socket.rooms);
    socketRooms.splice(socketRooms.indexOf(socket.id), 1);
    const socketRoom = socketRooms.join();

    const index = roomMapping[socketRoom].indexOf(socket.id);
    if (index > -1){
      roomMapping[socketRoom].splice(index, 1);
    }
    
    socket.leave(socketRoom);
    
    console.log("User left room " + socketRoom);
    // console.log(clientMapping);
    // console.log(roomMapping);

    io.of('/').in(socketRoom).clients((error, clients) => {
      if (error){
        console.log("Error announcing client left room");
      }
      console.log(clients);
      const users = [];
      clients.forEach(client => users.push(clientMapping[client]));
      io.sockets.to(socketRoom).emit('userlist', users);
      // console.log(users);
    });

    console.log('Client Disconnected');
    console.log("Number of connected clients: " + Object.keys(clientMapping).length);

    // TODO: Send leaving room message to clients in previous room

  });

}