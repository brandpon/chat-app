import React, {useState, useEffect} from 'react';
import {Socket} from '../utils/socket.io'

// Onload get a list of the users on the current server
// later on will need to update the userslist upon getting signals from server

function UserListComponent(props){

  // Eventually update
  const [users, setUsers] = useState([]);
  const [listUsers, setListUsers] = useState([]);

  // Use this to get the whole list of users from server whenever a user joins/leaves the room
  useEffect(() => {
    Socket.on('userlist', (data) => {
      setUsers(data);
      // console.log(data);
    });
  }, []);

  useEffect(() => {
    // TODO: change the key to user.id eventually?
    setListUsers(users.sort().map((User) => <li key={User}>{User}</li>));
  }, [users.join(",")]);

  return (
    <div>
      Users:
      <ul>{listUsers}</ul>
    </div>
  );
}

export default UserListComponent;
