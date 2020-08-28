import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Link} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const default_rooms = [1,2,3];

function ChatListComponent(props) {

  const [roomList,setRoomList] = useState([]);

  // Populate list with available chatrooms
  // Will want to add number of users in each room to this later on
  useEffect(() => {
    setRoomList(default_rooms.map(room_number => <Link key={room_number} to={'/chat/' + room_number}><Button>Room {room_number}</Button></Link>));
  }, []);

  return (
    <div>
      {roomList}
    </div>

  );
}



export default ChatListComponent;
