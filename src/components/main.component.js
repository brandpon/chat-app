import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';

function MainComponent() {

  return (
      <div>
        The contents of this page will replace the index page eventually.
        <Router>
          <Route path="/test">rf</Route>
        </Router>


      </div>

  );
}



export default MainComponent;
