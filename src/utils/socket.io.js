import {useEffect} from 'react';
import io from "socket.io-client";
const ENDPOINT = 'http://localhost:5000';

export var Socket;

const SocketIoComponent = () => {

  useEffect(() => {
    Socket = io(ENDPOINT);
    return () => Socket.disconnect();
  });

  return (null);
}

export default SocketIoComponent;
