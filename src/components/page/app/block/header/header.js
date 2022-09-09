import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { logOut } from '../../../../../redux/user/user-action';

import classes from './header.module.scss';

const Header = ({ isAuthorized, logOut, image, username }) => {
  const history = useHistory();

  const routeChange = (url) => {
    history.push(url);
  };
  if (isAuthorized) {
    return (
      <div className={classes.header}>
        <button className={classes.logo} onClick={() => routeChange('/')}>
          Realworld Blog
        </button>
        <button className={classes['green']} onClick={() => routeChange('/new-article')}>
          Create article
        </button>
        <button className={classes['profile']} onClick={() => routeChange('/profile')}>
          {username}
          <img
            src={image ? image : 'https://static.productionready.io/images/smiley-cyrus.jpg'}
            alt="avatar"
            className={classes['user-photo']}
          />
        </button>
        <button className={classes['log-out']} onClick={logOut}>
          Log Out
        </button>
      </div>
    );
  }
  return (
    <div className={classes.header}>
      <button className={classes.logo} onClick={() => routeChange('/')}>
        Realworld Blog
      </button>
      <button className={classes['sign-in']} onClick={() => routeChange('/sign-in')}>
        Sign In
      </button>
      <button className={classes['green']} onClick={() => routeChange('/sign-up')}>
        Sign Up
      </button>
    </div>
  );
};

const mapStateToProps = ({ userReducer: { isAuthorized, user } }) => {
  return {
    isAuthorized: isAuthorized,
    image: user?.image,
    username: user?.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
