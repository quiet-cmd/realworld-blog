import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ children, isAuthorized, ...rest }) => (
  <Route {...rest} render={(props) => (isAuthorized ? { ...children, props: props } : <Redirect to="/sign-in" />)} />
);

const mapStateToProps = ({ userReducer: { isAuthorized } }) => {
  return {
    isAuthorized: isAuthorized,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
