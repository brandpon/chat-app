import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import { useAuthContext } from "../utils/contexts";

export default function ProtectedRoute ({component: Component, ...rest}){

  const { isAuthenticated } = useAuthContext();

  return (
    <Route {...rest} render={(props) => (
      // isAuthenticated ? <Component {...props}/> : <Redirect to='/'/>
      isAuthenticated ? <Component {...props}/> : <h2> Not logged in </h2>
    )} />
  );
}

ProtectedRoute.propTypes = {
  component: PropTypes.elementType
};
