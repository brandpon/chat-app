import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {socket} from './socket.io.component';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
// import './css/login.css';

// Combining Login + Register page
// THIS FILE WILL PROBABLY BE DELETED

function AuthComponent (props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setLogin] = useState(true);

  useEffect(() => {
    setLogin(props.auth);
  }, []);

  // Perform basic validation to see if button should be disabled
  const validateForm = () => {
    return username.length > 0 && password.length > 0;
  }

  // Send request to backend, redirect page
  // async function submitHandler(event){
  //   event.preventDefault();
  //   if (isLogin){
  //     // this is a login attempt
  //   } else{
  //     // this is a registration attempt
  //   }
  // }


  return(
    <div className='Auth row align-items-center vertical-center justify-content-center'>
      <Container>
        <h1>{isLogin ? 'Login to Account' : 'Create an Account'}</h1>
        <Row>
          <Col>
            <Form>

              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                   type="text"
                   placeholder=""
                   value={username}
                   onChange={e => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder=""
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button block bsSize="large" variant="primary" type="submit" disabled={!validateForm()}>
                Submit
              </Button>

              <div>
                {isLogin ? <p>{"Don't have an account? Register"} <Link to='/register'>here</Link>.</p> :
                 <p>{"Already have an account? Login"} <Link to='/login'>here</Link>.</p>}

              </div>


            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

AuthComponent.propTypes = {
  auth: PropTypes.bool
};

export default AuthComponent;
