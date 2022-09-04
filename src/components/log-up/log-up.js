import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import * as action from '../../redux/user/user-action';
import { CheckboxInput, TextInput, EmailInput, PasswordInput } from '../form/form';

import classes from './log-up.module.scss';

const LogUp = ({ error, logUp, userError }) => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    userError(false);
    return () => userError(false);
  }, []);
  const history = useHistory();

  const submit = async (data) => {
    const res = await logUp(data);
    if (res) history.push('/');
  };

  return (
    <form onSubmit={handleSubmit((data) => submit(data))} className={classes['log-up']}>
      <legend>Create new account</legend>
      <TextInput register={register} errors={errors} name={'username'} label={'Username'} />
      <EmailInput register={register} errors={errors} name={'email'} label={'Email address'} />
      <PasswordInput register={register} errors={errors} name={'password'} label={'Password'} />
      <PasswordInput register={register} errors={errors} name={'repeatPassword'} label={'Repeat Password'} />
      {watch('repeatPassword') !== watch('password') && getValues('repeatPassword') ? (
        <strong>password not match</strong>
      ) : null}
      <CheckboxInput
        register={register}
        errors={errors}
        name={'checkbox'}
        label={'I agree to the processing of my personal information'}
      />
      <button type="submit">Create</button>
      {error && <strong>user already exists</strong>}
      <div>
        Already have an account? <Link to="/sign-in">Sign In.</Link>
      </div>
    </form>
  );
};

const mapStateToProps = ({ userReducer: { error } }) => {
  return {
    error: error,
  };
};

export default connect(mapStateToProps, action)(LogUp);
