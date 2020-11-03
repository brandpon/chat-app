import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, useParams, Redirect} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UserListComponent from './userlist.component';
import MessageListComponent from './message-list.component';
import SocketIO, {socket} from '../utils/socket.io'
import Cookies from 'js-cookie';

import './css/chat.css';

// Need URL to reflect which chatroom you joined

function ChatComponent(props) {

  const [message_list, setMessage_list] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [username, setUsername] = useState(Cookies.get('name'));
  const [isVoiceChat, setVoiceChat] = useState(false);
  // const [roomID, setRoomID] = useState('TEST_ROOM_ID')

  let { room } = useParams();

  useEffect(() => {
    socket.emit('joined room', {room: room, username: username});
  }, []);


  const submitHandler = () => {
    if (userMessage !== ''){
      console.log('User Typed: ' + userMessage);
      setMessage_list([...message_list, userMessage]);

      // Send the message to the server
      socket.emit('message', {'username': username,'message': userMessage, 'room': room});
      setUserMessage('');
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault();
      submitHandler();
    }
  };

  const toggleVoice = (event) => {
    event.preventDefault();
    setVoiceChat(!isVoiceChat);
    console.log(isVoiceChat);
  }

  return (
    <Container className='main' fluid>
      <SocketIO/>
      <Row noGutters>
        <Col className="left-Col">
          <div className="left-panel">
            <div className='extra'>
              {room}
              {isVoiceChat 
              ? <Button onClick={toggleVoice}>Leave Chat</Button> 
              : <Button onClick={toggleVoice}>Join Chat</Button>}
            </div>
          </div>
        </Col>

        <Col xl={9} xs={9} className="middle-Col">
            <MessageListComponent/>
              <Form className="message-form" onSubmit={submitHandler}>
                  <Form.Control value={userMessage} onChange={e => setUserMessage(e.target.value)}
                   className="message-box" placeholder="Send Message"  onKeyDown={e => handleKeyDown(e)}/>
              </Form>
        </Col>

        <Col className="right-Col">
          <div className="right-panel">
            <div className='userlist text-white'>
              <UserListComponent/>
            </div>
          </div>
        </Col>
      </Row>
    </Container>

  );
}



export default ChatComponent;
