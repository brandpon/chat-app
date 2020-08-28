import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useAppContext } from '../utils/contexts';
import './css/login.css';

function LoginComponent() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const {userHasAuthenticated} = useAppContext();

  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Perform basica validation to see if button should be disabled
  const validateForm = () => {
    return username.length > 0 && password.length > 0;
  }

  // Send request to backend, redirect page
  async function submitHandler(event){
    event.preventDefault();

    await axios({
      method: 'post',
      url: 'http://localhost:5000/api/users/login',
      data: {
        username: username,
        password: password
      }
    })
    .then(res => {
      console.log(res.response);
      userHasAuthenticated(true);
      history.push("/");
    })
    .catch(err => {
      console.log(err.response);
      handleShow();
    });
  }


  return(
    <div className='Login row align-items-center vertical-center justify-content-center'>
      <Container>
        <h1>Login to Account</h1>
        <Row>
          <Col>
            <Form onSubmit={submitHandler}>

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

              <Button block variant="primary" type="submit" disabled={!validateForm()}>
                Submit
              </Button>

              <div>
                <p>{"Don't have an account? Register"} <Link to='/register'>here</Link>.</p>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Some error message here</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


    </div>
  );
}

export default LoginComponent;
