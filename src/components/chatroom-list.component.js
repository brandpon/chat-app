import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Link} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ChatListComponent(props) {

  return (
    <div>

      <Link to='/chat/1'>
        <Button>Room 1</Button>
      </Link>
      <Link to='/chat/2'>
        <Button>Room 2</Button>
      </Link>
      <Link to='/chat/3'>
        <Button>Room 3</Button>
      </Link>


    </div>

  );
}



export default ChatListComponent;
