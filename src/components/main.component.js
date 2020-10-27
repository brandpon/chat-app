import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';

function MainComponent() {

  return (
      <div>
        <h2> You are logged in, this is the main page. </h2>
        <Router>
          <Route path="/test"></Route>
        </Router>


      </div>

  );
}



export default MainComponent;
