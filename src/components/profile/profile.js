import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { EmailInput, PasswordInput, UrlInput, TextInput } from '../form/form';
import * as action from '../../redux/user/user-action';

import classes from './profile.module.scss';

const Profile = ({ email, username, updateUser }) => {
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useHistory();
  const submit = async (data) => {
    for (let key in data) {
      if (data[key] === '') delete data[key];
    }
    const res = await updateUser(data);
    if (res) history.push('/');
    setError(true);
  };

  const opt = { required: false };

  return (
    <form className={classes.profile} onSubmit={handleSubmit((data) => submit(data))}>
      <legend>Edit Profile</legend>
      <TextInput register={register} errors={errors} name={'username'} label={'Username'} defaultValue={username} />
      <EmailInput register={register} errors={errors} name={'email'} label={'Email address'} defaultValue={email} />
      <PasswordInput register={register} errors={errors} name={'password'} label={'New password'} opt={opt} />
      <UrlInput register={register} errors={errors} name={'image'} label={'Avatar image (url)'} opt={opt} />
      <button type="submit">Save</button>
      {error && <strong>user already exists</strong>}
    </form>
  );
};

const mapStateToProps = ({ userReducer: { authorized, user } }) => {
  return {
    authorized: authorized,
    email: user?.email,
    username: user?.username,
  };
};

export default connect(mapStateToProps, action)(Profile);
