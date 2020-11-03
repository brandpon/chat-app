import React, {useState, useEffect} from 'react';
import {socket} from '../utils/socket.io'

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
      Users:
      <ul>{listUsers}</ul>
    </div>
  );
}

export default UserListComponent;
