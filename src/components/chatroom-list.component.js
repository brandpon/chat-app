import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import './css/chatroom-list.css';

function ChatListComponent() {

  const [roomList, setRoomList] = useState([]);

  function CustomToggle({ children, eventKey, room }) {
    return (
      <Card.Header onClick={useAccordionToggle(eventKey)}>
        {children}
        <Button className="float-right" href={room}>Join</Button>
      </Card.Header>
    );
  }

  async function onLoad(){

    await axios({
      method: 'get',
      url: 'http://localhost:5000/api/chatrooms/',
      withCredentials: true,
      credentials: "include",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(res => {
      // console.log(res.data);
      setRoomList(res.data.map((room, idx) =>
        <React.Fragment key={room._id}>
        <Card>
          <Card.Header>
          <CustomToggle room={'/chat/' + room.roomname} eventKey={idx+1}>
            {room.roomname}
          </CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey={idx+1}>
            <Card.Body>
              Description: {room.description} 
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        </React.Fragment>
      ));
    })
    .catch(err => {
      console.log(err.response);
    });
  }

  // Get chatroom (list) info from server
  // Might want to make this update on timer?
  useEffect(() => {
    onLoad();
  }, []);

  return (
    <Container>
      <h2> Join a Chatroom </h2>
      <Accordion>
      {roomList}
        {/* <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Click me!
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Hello! I'm the body</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            Click me!
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card> */}
      </Accordion>
    </Container>


  );
}



export default ChatListComponent;
