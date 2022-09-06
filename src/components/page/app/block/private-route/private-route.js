import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ children, authorized, ...rest }) => (
  <Route {...rest} render={(props) => (authorized ? { ...children, props: props } : <Redirect to="/sign-in" />)} />
);

const mapStateToProps = ({ userReducer: { authorized } }) => {
  return {
    authorized: authorized,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
