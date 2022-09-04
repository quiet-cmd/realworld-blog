import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import * as action from '../../redux/user/user-action';
import { EmailInput, PasswordInput } from '../form/form';

import classes from './log-in.module.scss';

const LogIn = ({ error, logIn, userError }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();

  useEffect(() => {
    userError(false);
    return () => userError(false);
  }, []);

  const submit = async (data) => {
    const res = await logIn(data);
    if (res) history.push('/');
  };

  return (
    <form className={classes['log-in']} onSubmit={handleSubmit((data) => submit(data))}>
      <legend>Sign In</legend>
      <EmailInput register={register} errors={errors} name={'email'} label={'Email address'} />
      <PasswordInput register={register} errors={errors} name={'password'} label={'Password'} />
      <button type="submit">Login</button>
      {error && <strong>User does not exist</strong>}
      <div>
        Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
      </div>
    </form>
  );
};

const mapStateToProps = ({ userReducer: { error } }) => {
  return {
    error: error,
  };
};

export default connect(mapStateToProps, action)(LogIn);
