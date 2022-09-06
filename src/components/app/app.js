import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Result } from 'antd';

import { checkAuthorization } from '../../redux/user/user-action';
import Header from '../header';
import Articles from '../articles';
import FullArticle from '../full-article';
import LogUp from '../log-up/log-up';
import LogIn from '../log-in/log-in';
import Profile from '../profile/profile';
import NewArticle from '../new-article';
import PrivateRoute from '../private-route/private-route';

import './app.scss';

const App = ({ checkAuthorization }) => {
  useEffect(() => {
    checkAuthorization();
  }, []);
  return (
    <Router>
      <>
        <Header />
        <Switch>
          <Route path={['/', '/articles']} component={Articles} exact />
          <Route path="/articles/:slug" component={FullArticle} exact />
          <PrivateRoute path="/articles/:slug/edit" exact>
            <NewArticle />
          </PrivateRoute>
          <PrivateRoute path="/new-article" exact>
            <NewArticle />
          </PrivateRoute>
          <PrivateRoute path="/profile" exact>
            <Profile />
          </PrivateRoute>
          <Route path="/sign-in" component={LogIn} exact />
          <Route path="/sign-up" component={LogUp} exact />
          <Route>
            <Result status="404" title="404" subTitle="Sorry, the page you visited does not exist." />
          </Route>
        </Switch>
      </>
    </Router>
  );
};

const mapDispatchToProps = (dispatch) => {
  return { checkAuthorization: () => dispatch(checkAuthorization()) };
};

export default connect(null, mapDispatchToProps)(App);
