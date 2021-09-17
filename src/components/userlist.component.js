import React, {useState, useEffect} from 'react';
import {socket} from '../utils/socket.io';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

function UserListComponent(props){

  // Eventually update
  const [users, setUsers] = useState([]);
  const [listUsers, setListUsers] = useState([]);

  // Get the whole list of users from server whenever a user joins/leaves the room
  useEffect(() => {
    socket.on('userlist', (data) => {
      setUsers(data);
      // console.log(data);
    });
  }, []);

  useEffect(() => {
    setListUsers(users.sort().map((User) => <li key={User}>{User}</li>));
  }, [users.join(",")]);

  return (
    <div>
      <Container fluid>
        Users:
        <ListGroup>{listUsers}</ListGroup>
      </Container>
    </div>
  );
}

export default UserListComponent;
