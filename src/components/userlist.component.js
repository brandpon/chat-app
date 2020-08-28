import React, {useState, useEffect} from 'react';

// Onload get a list of the users on the current server
// later on will need to update the userslist upon getting signals from server

function UserListComponent(props){

  const [users, setUsers] = useState(['Test User']);
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    // change the key to user.id eventually
    setListUsers(users.sort().map((User) => <li key={User}>{User}</li>));
  }, [users.join(",")]);

  return (
    <div>
      <button onClick={() => {setUsers([...users, Math.random()]);}}>New User</button>
      <ul>{listUsers}</ul>
    </div>
  );

}

export default UserListComponent;
