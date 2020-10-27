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
import { AuthContext } from "./utils/contexts";
import Cookies from 'js-cookie';

// TODO: Only connect to SocketIO after logging in
function App() {

  const [isAuthenticated, userHasAuthenticated] = useState(false);


  // Probably unneeded?
  useEffect(() => {
    if (Cookies.get('loggedIn') && Cookies.get('name')){
      userHasAuthenticated(true);
    }
  }, []);

  return (

    <div>
      <Router>
      
        <Switch>
        <AuthContext.Provider value={{isAuthenticated, userHasAuthenticated}}>

            <NavbarComponent/>

            {/* Need to change this */}

            <Route exact path="/" >
              {isAuthenticated ? <MainComponent/> : <h2>Landing Page</h2>}
            </Route>

            <Route path="/main"><MainComponent/></Route>
            <ProtectedRoute path="/chatroom-list" component={ChatRoomListComponent}></ProtectedRoute>
            <Route path="/login"><LoginComponent/></Route>
            <Route path="/register"><RegisterComponent/></Route>
            <Route path="/chat/:room"><ChatRoomComponent/></Route>
            <ProtectedRoute path='/test' component={ChatRoomComponent}></ProtectedRoute>
            {/* <Route path = "*"><NoMatch/></Route> */}
          
            </AuthContext.Provider>
        </Switch>
        
        
      </Router>
    </div>
  );
}

// There is a problem with how I set up the AuthContext inside of Switch
const NoMatch = () => {
  return (
    <div> No page here</div>
  );
}



export default App;
