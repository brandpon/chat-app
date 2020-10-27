import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SocketIO, {Socket} from '../utils/socket.io'
import Cookies from 'js-cookie';

// Onload get a list of the users on the current server
// later on will need to update the userslist upon getting signals from server

function UserListComponent(props){

  // Eventually update
  const [users, setUsers] = useState([Cookies.get('name')]);
  const [listUsers, setListUsers] = useState([]);

  // Use this to get the whole list of users from server every
  useEffect(() => {

  }, []);

  useEffect(() => {
    // change the key to user.id eventually
    setListUsers(users.sort().map((User) => <li key={User}>{User}</li>));
  }, [users.join(",")]);

  //   useEffect(() => {

  //     Socket.on('message', (data) => {
  //       setMessage([data]);

  //     });
  //     setMessageList(message.map(message =>
  //     [...messageList, <div className='message-div' key={message}>{message.username}: {message.message}</div>]
  //   ));
  // }, [JSON.stringify(message)]);

  return (
    <div>
      Users:
      <button onClick={() => {setUsers([...users, Math.random()]);}}>New User</button>
      <ul>{listUsers}</ul>
    </div>
  );

}

export default UserListComponent;
