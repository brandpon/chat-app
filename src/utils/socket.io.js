import {useEffect} from 'react';
import io from "socket.io-client";
const ENDPOINT = 'http://localhost:5000';

export var socket;

const SocketIoComponent = () => {

  useEffect(() => {
    socket = io(ENDPOINT);

  socket.on('connect', () => {
    console.log("Connected with socketio")
  });


    return () => socket.disconnect();
  }, []);

  return (null);
}

export default SocketIoComponent;
