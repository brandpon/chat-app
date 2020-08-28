import React from 'react';
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';

const TestComponent = ({ component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    true === true
    ? <Component {...props}/>
    : <Redirect to='login'/>
  )} />
)

export default TestComponent;
