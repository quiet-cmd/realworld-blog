import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { checkAuthorization } from '../../redux/user/user-action';
import Header from '../header';
import Articles from '../articles';
import FullArticle from '../full-article';
import LogUp from '../log-up/log-up';
import LogIn from '../log-in/log-in';
import Profile from '../profile/profile';
import NewArticle from '../new-article';

import './app.scss';

const App = ({ checkAuthorization }) => {
  useEffect(() => {
    checkAuthorization();
  }, []);
  return (
    <Router>
      <>
        <Header />
        <Route path={['/', '/articles']} component={Articles} exact />
        <Route path="/articles/:slug" component={FullArticle} exact />
        <Route path="/new-article" component={NewArticle} exact />
        <Route path="/articles/:slug/edit" component={NewArticle} />
        <Route path="/sign-in" component={LogIn} exact />
        <Route path="/sign-up" component={LogUp} exact />
        <Route path="/profile" component={Profile} exact />
      </>
    </Router>
  );
};

const mapDispatchToProps = (dispatch) => {
  return { checkAuthorization: () => dispatch(checkAuthorization()) };
};

export default connect(null, mapDispatchToProps)(App);
