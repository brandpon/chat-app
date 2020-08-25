import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';

// Need to implement auth context!

export default function ProtectedRoute ({component: Component, ...rest}){
  return (
    <Route {...rest} render={(props) => (
      true === true
      ? <Component {...props}/>
      : <Redirect to='/'/>
    )} />
  );
}

ProtectedRoute.propTypes = {
  component: PropTypes.elementType
};
