import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import * as action from '../../../redux/user/user-action';
import EmailInput from '../../block/email-input';
import PasswordInput from '../../block/password-input';

import classes from './log-in.module.scss';

const LogIn = ({ logIn }) => {
  const [isError, setIsError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();

  const submit = async (data) => {
    const res = await logIn(data);
    if (res) history.push('/');
    setIsError(true);
  };

  return (
    <form className={classes['log-in']} onSubmit={handleSubmit((data) => submit(data))}>
      <legend>Sign In</legend>
      <EmailInput register={register} errors={errors} name={'email'} label={'Email address'} />
      <PasswordInput register={register} errors={errors} name={'password'} label={'Password'} />
      <button type="submit">Login</button>
      {isError && <strong>User does not exist</strong>}
      <div>
        Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
      </div>
    </form>
  );
};

export default connect(null, action)(LogIn);
