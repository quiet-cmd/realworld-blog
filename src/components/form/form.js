import React from 'react';

export const TextInput = ({ register, name, opt = {}, label, errors, defaultValue }) => {
  const username = {
    required: true,
    minLength: { value: 3, message: 'Min length is 3' },
    maxLength: { value: 20, message: 'Max length is 20' },
    pattern: {
      value: /^\S+$/,
      message: 'Field must not be empty',
    },
  };
  return (
    <label>
      {label}
      <input {...register(name, { ...username, ...opt })} placeholder={label} value={defaultValue} />
      <strong>{errors[name]?.message}</strong>
    </label>
  );
};

export const EmailInput = ({ register, name, opt = {}, label, errors, defaultValue }) => {
  const email = {
    required: true,
    pattern: {
      value: /\S+@\S+\.\S+$/,
      message: 'Entered value does not match email format',
    },
  };
  return (
    <label>
      {label}
      <input {...register(name, { ...email, ...opt })} placeholder={label} defaultValue={defaultValue} type="email" />
      <strong>{errors[name]?.message}</strong>
    </label>
  );
};

export const PasswordInput = ({ register, name, opt = {}, label, errors, defaultValue }) => {
  const password = {
    required: true,
    minLength: { value: 6, message: 'Min length is 6' },
    maxLength: { value: 40, message: 'Max length is 40' },
    pattern: {
      value: /^\S+$/,
      message: 'Password must not be empty',
    },
  };
  return (
    <label>
      {label}
      <input
        {...register(name, { ...password, ...opt })}
        placeholder={label}
        defaultValue={defaultValue}
        type="password"
      />
      <strong>{errors[name]?.message}</strong>
    </label>
  );
};

export const UrlInput = ({ register, name, opt = {}, label, errors, defaultValue }) => {
  const url = {
    require: true,
    pattern: {
      value: /[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/,
      message: 'Entered urk does not match url format',
    },
  };
  return (
    <label>
      {label}
      <input {...register(name, { ...url, ...opt })} placeholder={label} defaultValue={defaultValue} />
      <strong>{errors[name]?.message}</strong>
    </label>
  );
};

export const CheckboxInput = ({ register, name, opt = {}, label, errors, defaultValue }) => {
  const checkbox = {
    required: { value: true, message: 'Very important checkbox' },
  };
  return (
    <label>
      <input
        {...register(name, { ...checkbox, ...opt })}
        placeholder={label}
        defaultValue={defaultValue}
        type="checkbox"
      />
      {label}
      <strong>{errors[name]?.message}</strong>
    </label>
  );
};
