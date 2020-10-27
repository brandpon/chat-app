import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, useParams, Redirect} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import UserListComponent from './userlist.component';
import MessageListComponent from './message-list.component';
import SocketIO, {Socket} from '../utils/socket.io'
import Cookies from 'js-cookie';

import './css/chat.css';

// Need URL to reflect which chatroom you joined

function ChatComponent(props) {

  const [message_list, setMessage_list] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [username, setUsername] = useState(Cookies.get('name'));
  // const [roomID, setRoomID] = useState('TEST_ROOM_ID')

  let { room } = useParams();

  useEffect(() => {
    Socket.emit('joined room', {room: room, username: username});
  }, []);


  const submitHandler = () => {
    if (userMessage !== ''){
      console.log('User Typed: ' + userMessage);
      setMessage_list([...message_list, userMessage]);

      // Send the message to the server
      Socket.emit('message', {'username': username,'message': userMessage, 'room': room});
      setUserMessage('');
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault();
      submitHandler();
    }
  };

  return (
    <Container className='main' fluid>
      <SocketIO/>
      <Row noGutters>
        <Col className="left-Col">
          <div className="left-panel">
            <div className='extra'>
              {room}
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
