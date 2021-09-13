import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import './css/chatroom-list.css';

function ChatListComponent() {

  const [roomList, setRoomList] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

    // Send request to backend, redirect page
    async function createChatroom(event){
      event.preventDefault();
  
      await axios({
        method: 'post',
        url: 'http://localhost:5000/api/chatrooms/add/',
        data: {
          roomname: "test",
          description: "test"
        }
      })
      .then(res => {
        console.log('Response: ' + res);
      })
      .catch(err => {
        console.log(err.response.data);
        handleShow();
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
      <Button className="float-right" onClick={createChatroom} >Create new room</Button>
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



      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Invalid username or password</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>

    


  );
}



export default ChatListComponent;
