import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Form} from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import './css/navbar.css';

// Need to check if the user is logged in?
// Maybe only ever show a Sign Out button?

function NavbarComponent(props) {

  const [isLoggedIn, setLoggedIn] = useState(false);

    return (

      <Navbar className="header navbar-expand-lg navbar-light" variant="dark" bg="dark">
        <Navbar.Brand >Icon Here</Navbar.Brand>
        <Navbar.Toggle/>
          <Navbar.Collapse>
            <Nav>
                <Nav.Link className="text-white" href='/'>Home</Nav.Link>
                <Nav.Link className="text-white" href='/chatroom-list'>Chatrooms</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Nav.Link className="text-white" href='/login'>Login</Nav.Link>
          </Navbar.Collapse>
      </Navbar>

    );
  }

  export default NavbarComponent;
