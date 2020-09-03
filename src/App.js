import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import NavbarComponent from "./components/navbar.component";
import MainComponent from "./components/main.component";
import ChatRoomComponent from "./components/chatroom.component";
import ChatRoomListComponent from "./components/chatroom-list.component";
import LoginComponent from './components/login.component';
import RegisterComponent from './components/register.component';
import ProtectedRoute from "./utils/protected-route";
import { AppContext } from "./utils/contexts";

// TODO: Only connect to SocketIO after logging in
function App() {

  const [isAuthenticated, userHasAuthenticated] = useState(false);

  return (

    <div>
      <Router>
        <Switch>
          <AppContext.Provider value={{isAuthenticated, userHasAuthenticated}}>

            <NavbarComponent/>

            <Route path="/" exact>
              <p><Link to='/main'>Main</Link></p>
            </Route>

            <Route path="/main"><MainComponent/></Route>
            <Route path="/chatroom-list"><ChatRoomListComponent/></Route>
            <Route path="/login"><LoginComponent/></Route>
            <Route path="/register"><RegisterComponent/></Route>
            <Route path="/chat/:room"><ChatRoomComponent/></Route>
            <ProtectedRoute path='/test' component={ChatRoomComponent}></ProtectedRoute>
          </AppContext.Provider>

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
