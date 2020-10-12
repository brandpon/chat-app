import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Form, useHistory} from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { useAppContext } from "../utils/contexts";
import Cookies from 'js-cookie';
import './css/navbar.css';

function NavbarComponent(props) {

  const { isAuthenticated, userHasAuthenticated } = useAppContext();
  const history = useHistory();

  function handleLogout(){
    userHasAuthenticated(false);
    Cookies.remove('auth');
    Cookies.remove('name');
    history.push("/");
  }

    return (

      <Navbar className="header navbar-expand-lg navbar-light" variant="dark" bg="dark">
        <Navbar.Brand >Chat App</Navbar.Brand>
        <Navbar.Toggle/>
          <Navbar.Collapse>
            <Nav>
                <Nav.Link className="text-white" href='/'>Home</Nav.Link>
                {isAuthenticated
                  ? <Nav.Link className="text-white" href='/chatroom-list'>Chatrooms</Nav.Link>
                  : <>
                  </>
                }
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
          {isAuthenticated
            ? <Nav.Link className="text-white" onClick={handleLogout} >Logout</Nav.Link>
            : <>
            <Nav.Link className="text-white" href='/register'>Register</Nav.Link>
            <Nav.Link className="text-white" href='/login'>Login</Nav.Link>
            </>
          }
          </Navbar.Collapse>
      </Navbar>

    );
  }

  export default NavbarComponent;
