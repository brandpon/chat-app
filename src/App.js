import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import NavbarComponent from "./components/navbar.component";
import MainComponent from "./components/main.component";
import ChatRoomComponent from "./components/chatroom.component";
import ChatRoomListComponent from "./components/chatroom-list.component";
import SocketIO from './utils/socket.io';
import LoginComponent from './components/login.component';
import RegisterComponent from './components/register.component';
import ProtectedRoute from "./utils/protected-route";
import { AppContext } from "./utils/contexts";

// Move the SocketIO component to after login

function App() {

  const [isAuthenticated, setAuthenticated] = useState(false);

  return (

    <div>
      <SocketIO/>
      <Router>

        <NavbarComponent/>

        <Switch>
          <Route path="/" exact>
            <p><Link to='/main'>Main</Link></p>
            <p><Link to='/chatroom-list'>Chatrooms</Link></p>
            <p><Link to='/test'>test</Link></p>
          </Route>

          <Route path="/main"><MainComponent/></Route>
          <Route path="/chatroom-list"><ChatRoomListComponent/></Route>
          <Route path="/login"><LoginComponent/></Route>
          <Route path="/register"><RegisterComponent/></Route>
          <Route path="/chat/:room"><ChatRoomComponent/></Route>
          <ProtectedRoute path='/test' component={ChatRoomComponent}></ProtectedRoute>
          <Route path ="*"><NoMatch/></Route>

        </Switch>
      </Router>
    </div>
  );
}

const NoMatch = () => {
  return (
    <div> No page here</div>
  );
}



export default App;
